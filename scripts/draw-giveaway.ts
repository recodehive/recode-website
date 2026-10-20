// Draws the giveaway winners. Run after the giveaway ends:
//   node scripts/draw-giveaway.ts entrants.json [seed]
//
// entrants.json is a list of { "login": "octocat", "entries": 12, "disqualified": false }.
// Staff (see src/data/giveaway.ts) and disqualified accounts are removed, then winners are picked at
// random without repeats, weighted by entries. The seed is printed so the draw can be reproduced.
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { GIVEAWAY } from '../src/data/giveaway.ts';

interface Entrant {
  login: string;
  entries: number;
  disqualified?: boolean;
}

const [file, seedArg] = process.argv.slice(2);
if (!file) {
  console.error('Usage: node scripts/draw-giveaway.ts entrants.json [seed]');
  process.exit(1);
}

const seed = seedArg ?? randomBytes(8).toString('hex');

// Small seeded generator (mulberry32 over a hash of the seed text).
function rngFrom(text: string): () => number {
  let h = 1779033703;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const staff = new Set(GIVEAWAY.staff.map((s) => s.toLowerCase()));
const all = JSON.parse(readFileSync(file, 'utf8')) as Entrant[];
const pool = all.filter((e) => e.entries > 0 && !e.disqualified && !staff.has(e.login.toLowerCase()));
console.log(`Entrants: ${all.length}, eligible: ${pool.length}, winners to draw: ${GIVEAWAY.winners}`);
console.log(`Seed: ${seed}`);

const rand = rngFrom(seed);
const winners: Entrant[] = [];
const left = [...pool];
while (winners.length < GIVEAWAY.winners && left.length > 0) {
  const total = left.reduce((s, e) => s + e.entries, 0);
  let pick = rand() * total;
  const i = left.findIndex((e) => (pick -= e.entries) < 0);
  winners.push(left.splice(i === -1 ? left.length - 1 : i, 1)[0]);
}
winners.forEach((w, n) => console.log(`${n + 1}. @${w.login} (${w.entries} entries)`));
