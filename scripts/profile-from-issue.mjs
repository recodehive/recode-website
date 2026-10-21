// Turns a "Profile update" issue form into src/data/profiles/<handle>.json.
//
// Run by .github/workflows/profile-update-pr.yml when the `profile-update` label is added.
// Inputs (environment, never interpolated into a shell): ISSUE_BODY, ISSUE_AUTHOR, ISSUE_NUMBER.
// It only fills the simple fields (headline, bio, time zone, links, declared skills). Featured
// projects, credentials and hire details are free text in the form, so they are copied into the
// PR description for a person to enter by hand. The site build sanitises the file again.
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/;

/** Splits an issue form body ("### Label" sections) into a label to value map. */
export function parseIssueForm(body) {
  const out = {};
  const parts = String(body || '').replace(/\r\n/g, '\n').split(/^### /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const label = (nl === -1 ? part : part.slice(0, nl)).trim();
    const value = (nl === -1 ? '' : part.slice(nl + 1)).trim();
    out[label] = value === '_No response_' ? '' : value;
  }
  return out;
}

const https = (v) => {
  const s = String(v || '').trim();
  return /^https:\/\/\S+$/i.test(s) ? s.slice(0, 500) : undefined;
};
const text = (v, max) => {
  const s = String(v || '').trim();
  return s ? s.slice(0, max) : undefined;
};

export function buildExtras(fields) {
  const skills = String(fields['Skills you want to declare'] || '')
    .split(/[,\n]/)
    .map((x) => x.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 30);
  const links = {
    linkedin: https(fields['LinkedIn URL']),
    website: https(fields['Website URL']),
    x: https(fields['X URL']),
  };
  const extras = {
    headline: text(fields['Headline'], 140),
    bio: text(fields['Bio'], 600),
    timezone: text(fields['Time zone'], 60),
    links: Object.values(links).some(Boolean) ? links : undefined,
    skillsDeclared: skills.length ? skills : undefined,
  };
  return Object.fromEntries(Object.entries(extras).filter(([, v]) => v !== undefined));
}

/** Decides whether the issue may change this profile. Returns { ok, handle, reason }. */
export function check(fields, author) {
  const handle = String(fields['GitHub handle'] || '').trim().replace(/^@/, '').toLowerCase();
  if (!HANDLE_RE.test(handle)) return { ok: false, reason: 'The GitHub handle in the form is not valid.' };
  if (String(author || '').toLowerCase() !== handle) {
    return { ok: false, reason: `Only @${handle} can change this profile, and this issue was opened by @${author}. An admin can review it by hand.` };
  }
  if (!/- \[x\] I am the owner of this GitHub account/i.test(String(fields['Ownership'] || ''))) {
    return { ok: false, reason: 'The ownership box is not ticked.' };
  }
  return { ok: true, handle };
}

function main() {
  const fields = parseIssueForm(process.env.ISSUE_BODY);
  const verdict = check(fields, process.env.ISSUE_AUTHOR);
  const outputs = [];
  if (!verdict.ok) {
    outputs.push('ok=false', `reason=${verdict.reason}`);
  } else {
    const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
    const dir = path.join(root, 'src', 'data', 'profiles');
    mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${verdict.handle}.json`);
    const current = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
    const merged = { ...current, ...buildExtras(fields) };
    writeFileSync(file, JSON.stringify(merged, null, 2) + '\n');

    const manual = ['Featured projects (up to 3)', 'Credentials', 'Open to work', 'Roles, engagement type, work rights, booking link, CV link']
      .filter((k) => fields[k])
      .map((k) => `**${k}**\n\n${fields[k].split('\n').map((l) => `> ${l}`).join('\n')}`);
    const notes = path.join(process.env.RUNNER_TEMP || root, 'profile-notes.md');
    writeFileSync(notes, manual.length ? `These answers are free text. Please enter them in the JSON file by hand if they look right:\n\n${manual.join('\n\n')}\n` : 'No free-text answers to enter by hand.\n');
    outputs.push('ok=true', `handle=${verdict.handle}`, `notes=${notes}`);
  }
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, outputs.join('\n') + '\n');
  else console.log(outputs.join('\n'));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
