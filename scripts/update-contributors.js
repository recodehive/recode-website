// Regenerates the contributor avatar wall in README.md (between the markers).
// Usage: node scripts/update-contributors.js   (requires the GitHub CLI: gh)
// Contributors still using GitHub's default identicon avatar are left out.
const { execSync } = require('child_process');
const zlib = require('zlib');
const fs = require('fs');

const REPO = 'recodehive/recode-website';
const PER_ROW = 10;
const START = '<!-- contributors:start -->';
const END = '<!-- contributors:end -->';

// Count distinct colors in an 8-bit RGB/RGBA PNG; -1 if not such a PNG (e.g. a JPEG photo).
function countColors(buf) {
  if (buf[0] !== 0x89) return -1;
  let p = 8, w, h, bd, ct;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; }
    if (type === 'IDAT') idat.push(d);
    p += 12 + len;
  }
  if (bd !== 8 || (ct !== 2 && ct !== 6)) return -1;
  const bpp = ct === 6 ? 4 : 3, stride = w * bpp;
  const raw = zlib.inflateSync(Buffer.concat(idat)), out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const v = raw[y * (stride + 1) + 1 + x];
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y ? out[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y ? out[(y - 1) * stride + x - bpp] : 0;
      let r = v;
      if (f === 1) r += a;
      else if (f === 2) r += b;
      else if (f === 3) r += (a + b) >> 1;
      else if (f === 4) {
        const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
        r += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      out[y * stride + x] = r & 255;
    }
  }
  const colors = new Set();
  for (let i = 0; i < out.length; i += bpp) colors.add(out.readUIntBE(i, 3));
  return colors.size;
}

async function hasCustomAvatar(id) {
  const res = await fetch(`https://avatars.githubusercontent.com/u/${id}?v=4&s=48`);
  const n = countColors(Buffer.from(await res.arrayBuffer()));
  return n < 0 || n > 3; // default identicons are flat 2-color PNGs
}

(async () => {
  const out = execSync(
    `gh api "repos/${REPO}/contributors?per_page=100" --paginate --jq ".[] | select(.type==\\"User\\") | [.login,.id] | @tsv"`,
    { encoding: 'utf8', maxBuffer: 1 << 26 }
  );
  const users = out.trim().split('\n').map((l) => l.split('\t'));
  const keep = await Promise.all(users.map(([, id]) => hasCustomAvatar(id)));
  const tiles = users
    .filter((_, i) => keep[i])
    .map(([login, id]) => `<a href="https://github.com/${login}"><img src="https://avatars.githubusercontent.com/u/${id}?v=4&s=48" width="48" height="48" alt="${login}"></a>`);

  const rows = [];
  for (let i = 0; i < tiles.length; i += PER_ROW) rows.push(tiles.slice(i, i + PER_ROW).join(' '));

  const readme = fs.readFileSync('README.md', 'utf8');
  const s = readme.indexOf(START), e = readme.indexOf(END);
  if (s < 0 || e < 0) throw new Error('Contributor markers not found in README.md');
  fs.writeFileSync('README.md', readme.slice(0, s + START.length) + '\n\n' + rows.join('\n') + '\n\n' + readme.slice(e));
  console.log(`Wrote ${tiles.length} contributors (skipped ${users.length - tiles.length} with default avatars)`);
})();
