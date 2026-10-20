import generated from './sponsors.generated.json';

// Single source of truth for the Sponsors page. Store usernames and slugs only, never full URLs.

export interface Person {
  name: string;
  role?: string;
  /** GitHub username only. */
  github?: string;
  /** Slug after linkedin.com/in/ (use "company/<slug>" for company pages). */
  linkedin?: string;
  /** X handle only. */
  x?: string;
  /** Optional override. The default is https://github.com/<github>.png?size=160 */
  avatar?: string;
  /** GitHub numeric user id. Used for the photo when the username no longer resolves. */
  avatarId?: number;
}

// GitHub shows 1 current sponsor and 81 past ones, 82 in total, at github.com/sponsors/sanjay-kv.
// TODO(sanjay): update this number when the total on GitHub changes.
export const GITHUB_SPONSOR_TOTAL = 82;
export const MONTHLY_GOAL_USD = 100;
export const SPONSOR_URL = 'https://github.com/sponsors/sanjay-kv';

// Usernames were checked against the GitHub API with each sponsor's original avatar id, so renamed
// accounts point at their current login. Deleted accounts keep only avatarId.
const MANUAL_SPONSORS: Person[] = [
  // Current sponsors first, then past sponsors.
  { name: 'Hideo', role: 'Fullstack developer', github: 'success0106' },
  { name: 'Tyros625', role: 'Open source developer', github: 'Tyros625' },
  { name: 'Rat spott', role: 'Open source developer', github: 'astra-bright' },
  { name: 'Tupui', role: 'Senior full stack', github: 'rockdev-ai' },
  { name: 'Aqua Commander', role: 'Blockchain engineer', github: 'aquacommander' },
  { name: 'Bluesora dev', role: 'Open source developer', github: 'bluesoradev' },
  { name: 'Toptal dev', role: 'Open source developer', github: 'toptaldev5' },
  { name: 'Alpha', role: 'Open source developer', github: 'Max0709202' },
  { name: 'Tenosia', role: 'Open source developer', github: 'Tenosia' },
  { name: 'Timothy Strebing', role: 'Open source developer', github: 'devfabric0711' },
  { name: 'Pragmaj Upit', role: 'Fullstack developer', github: 'Dopular' },
  { name: 'Blockchain Developer', role: 'Open source developer', github: 'zumiraku' },
  { name: 'Zephyr', role: 'Fullstack developer', github: 'Zephyr3311' },
  { name: 'Nsracer', role: 'Fullstack developer', avatarId: 59646019 },
  { name: 'phil1 px', role: 'Fullstack developer', github: 'phil1px' },
  { name: 'Yupsecous', role: 'Software engineer', github: 'Yupsecous' },
  { name: 'Logic Mason', role: 'Fullstack developer', github: 'LogicMason5' },
  { name: 'Meta core', role: 'Fullstack developer', github: 'metacore-stack' },
  { name: 'UC-techie', role: 'Python developer', avatarId: 46532433 },
  { name: 'Helious Matt', role: 'Blockchain developer', avatarId: 47945257 },
  { name: 'CodyOnGit', role: 'Fullstack developer', github: 'smile304' },
  { name: 'DevXavier', role: 'Student', github: 'DevXavierNieto' },
  // Past sponsors
  { name: 'Kriti Raj', role: 'Student at IIIT, India', github: 'kriti-raj', linkedin: 'kritirajtech', x: 'kriti___raj' },
  { name: 'Judar', role: 'Student', github: 'trongphuhappy', x: 'Judar_Clitus' },
  { name: 'Jisha TR', role: 'Student', github: 'Jisha-tr' },
  { name: 'Aryan Jaiswal', role: 'Founder @MLSA', github: 'Aryanjstar', linkedin: 'aryanjstar', x: 'Aryanjstar' },
  { name: 'The Sting', role: 'Cybersecurity', github: 'TheStingR' },
  { name: 'Kmanci', github: 'jhealerbb' },
  { name: 'Happy mdev', role: 'Software engineer', github: '0xhappydev' },
  { name: 'Ateeq ur Rehman', role: 'AI engineer', github: 'ateeq-mughal' },
  { name: 'Austin Jian', role: 'Student', github: 'austinjiann' },
  { name: 'Ayokanmi Adejola', role: 'Developer at Softlyft', github: 'Ayokanmi-Adejola', linkedin: 'ayokanmiadejola', x: 'AyoAdejola100' },
  { name: 'Matheus Farias', role: 'Student', github: 'MatheusFarias8' },
  { name: 'superdevp', role: 'Web developer', github: 'superdevp' },
  { name: 'MeeTy HA', role: 'Student', github: 'MeeTyHA' },
  { name: 'milos matovicup', role: 'Student', github: 'Procaptain1029' },
  { name: 'Tirth Patel', role: 'Student', github: 'TirthWillLearn', linkedin: 'tirth-k-patel', x: 'codewithtirth' },
  // The X link that used to be here belonged to Sumit Khanna, so it was removed.
  { name: 'Takashi Arai', role: 'Student, Ryukyu University', github: 'arataka1313', linkedin: 'takashi-arai-2b697b360' },
  { name: 'Sumit Khanna', role: 'Developer at slickspender', github: 'jjackofall', x: 'jjackofall' },
  { name: 'Prakhar Saxena', role: 'Studying at McMaster University', github: 'Luciferr5', linkedin: 'prakharsaxena5' },
  { name: 'Varghese Baby', role: 'Software developer', github: 'varghese25', linkedin: 'varghese-baby-138429175' },
  { name: 'Carlos Romero', role: 'CS student, La Salle', github: 'carlosromerorodriguez', linkedin: 'carlos-romero-rdgz' },
  { name: 'Yahya Banouk', role: 'Full-stack engineer at Expersi', github: 'yahya-banouk', x: 'Yahya_Banouk' },
  { name: 'Mike', role: 'AI consultant', github: 'MikeO-AI' },
  { name: 'Alex Choi', role: 'Legacy sponsor', github: 'alexechoi', linkedin: 'alexchoi1', x: 'alexchhk' },
  { name: 'Renato Maynard', role: 'M.Sc. in Operations Research', github: 'RenatoMaynard', linkedin: 'renatomaynardetche' },
  { name: 'Tram Khoi Nguyen', role: 'Student, Tra Vinh, Vietnam', github: 'khoinguyennn' },
  { name: 'Bobby Azad', role: 'BI developer at Agtegra', github: 'gbazad93', linkedin: 'bobby-azad-b2035b65' },
  { name: 'Sudarshan Giri', role: 'Drupal developer at Webfirst', github: 'SudarshanGiri', linkedin: 'sudarshangiri', x: 'sudarshanhang' },
  { name: 'Kashif Khan', role: 'QA engineer', github: 'KashifKhaan', linkedin: 'mr-kashif-442146214', x: 'KaxhifKhan' },
  { name: 'Alex Cerezo', role: 'Software engineer at Outlier', github: 'alexcerezo', linkedin: 'alexcerezocontreras', x: 'alexcerezx' },
  { name: 'Monojit Pal', role: "Student, St. Thomas' College", github: 'Monojit-Pal', linkedin: 'pal-monojit', x: 'Monojit__18' },
  { name: 'Chiluka Akshitha', role: 'Student at IIT Madras', github: 'AKSHITHA-CHILUKA', linkedin: 'akshitha-chiluka-b19245259', x: 'AkshithaChiluka' },
];

const MANUAL_WE_SPONSOR: Person[] = [
  { name: 'Medha', role: 'Student, Next.js developer', github: 'medss19', linkedin: 'medha-agarwal-01b33725a' },
  { name: 'Aadil Latif', role: 'Founder, TechXNinjas', github: 'iaadillatif', linkedin: 'iaadillatif' },
  { name: 'Richa Jaishwal', role: 'MERN developer', github: 'Richajaishwal0', linkedin: 'richa-jaishwal' },
  { name: 'Aditya Singh', role: 'Software developer', github: 'singh-odyssey', linkedin: 'aditya-singh-6297242a5' },
  { name: 'GSSoC24', role: 'Open source community', github: 'GSSoC24' },
  { name: 'Kanishka Panwar', role: 'MERN developer', github: 'kanishka-commits', linkedin: 'kanishka03p', x: 'kanishka03p' },
  { name: 'Suryansh Mishra', role: 'MERN developer', github: 'smirk-dev', linkedin: 'connectwithsuryanshmishra' },
  { name: 'Anuj Kulkarni', role: 'MERN developer', github: 'steam-bell-92', linkedin: 'anuj-chandrakant-kulkarni', x: 'AnujKulkarni040' },
  { name: 'Sonal Yadav', role: 'Web and app developer', github: 'sonalyadav1', linkedin: 'sonal-yadav-193471238', x: 'SonalYa944317' },
  // TODO: verify. The LinkedIn slug had a stray "h" in front, fixed to match the other entry for this person.
  { name: 'Ayokanmi Adejola', role: 'Final year student', github: 'Ayokanmi-Adejola', linkedin: 'ayokanmiadejola', x: 'AyoAdejola100' },
  { name: 'Nishant Rana', role: 'Final year student', github: 'NishantRana07', linkedin: 'nishantrana07', x: 'TechwNishant' },
  { name: 'Ankit Modanwal', role: 'Next.js and ML developer', github: 'ankitmodanwall', linkedin: 'ankit-modanwal', x: 'ankitt_ml' },
  { name: 'Irfan', role: 'Final year student', github: 'iitzIrFan', linkedin: 'irfan-shaikh-8b5b94259', x: 'iitzIrfan' },
  // The X handle that used to be here (codewithdhruba) belongs to Dhrubaraj Pati.
  { name: 'Renato Maynard', role: 'M.Sc. in Operations Research', github: 'RenatoMaynard', linkedin: 'renatomaynardetche' },
  { name: 'Dhrubaraj Pati', role: 'Student at SVU', github: 'codewithdhruba01' },
  { name: 'Carlos Romero', role: 'CS student, La Salle', github: 'carlosromerorodriguez', linkedin: 'carlos-romero-rdgz' },
  { name: 'Shivansh Saxena', role: 'Intern at Geo Softech', github: 'ShivanshPlays', linkedin: 'shivansh-saxena-288785168' },
  { name: 'Mastan Sayyad', role: 'Web developer at SWOC', github: 'MastanSayyad', linkedin: 'mastan-sayyad', x: 'mastansayyad02' },
  { name: 'recode hive', role: 'Open source community', github: 'recodehive', linkedin: 'company/recode-hive', x: 'recodehive' },
  { name: 'Anshika Tiwari', role: 'Student', github: 'anshikatiwari20', linkedin: 'anshika-tiwari-', x: 'anshikat_20' },
  { name: 'Meet Jain', role: 'Student, IIIT Jabalpur', github: 'Meetjain1', linkedin: 'meet-jain-413015265', x: 'Meetjain_100' },
  { name: 'Hemant Lohar', role: 'Student, India', github: 'Hemantlohar' },
  { name: 'Chiluka Akshitha', role: 'Student at IIT Madras', github: 'AKSHITHA-CHILUKA', linkedin: 'akshitha-chiluka-b19245259', x: 'AkshithaChiluka' },
  { name: 'Himangshu Sharma', role: 'Open source developer', github: 'HimangshuSharma01', linkedin: 'himangshusharma01' },
  { name: 'Siddheya Kulkarni', role: 'Student, open source developer', github: 'Asymtode712', linkedin: 'siddheya-kulkarni', x: 'SidKulkarni712' },
  { name: 'Prithwi Hegde', role: 'Student at JSSSSU', github: 'Prithwi32', linkedin: 'prithwi-hegde' },
  { name: 'Vansh Chaurasiya', role: 'Intern at GoComet', github: 'vansh-codes', linkedin: 'vanshchaurasiya24', x: 'VanshChaurasiy4' },
  { name: 'Hemanth Kumar', role: 'Community leader at recode hive', github: 'hemanthkumar-21', linkedin: 'hemu21', x: 'Hemu21_' },
  { name: 'Eduardo San Martin', role: 'Member of the Vue.js team', github: 'posva', x: 'posva' },
  { name: 'Md Azfar Alam', role: 'DevOps engineer', github: 'mdazfar2', linkedin: 'md-azfar-alam', x: 'azfarxx_' },
  { name: 'Ajay Dhangar', role: 'Founder at CodeHarborHub', github: 'ajay-dhangar', linkedin: 'ajay-dhangar', x: 'CodesWithAjay' },
  { name: 'Sneha Kumari', role: 'Developer at GHCL', github: 'Snehsk', linkedin: 'sneha-kumari1' },
  { name: 'Swarnendu Bhandari', role: 'Student at IIT Kharagpur', github: 'swrno', linkedin: 'swarnendu-bhandari', x: 'Swarnendu___' },
  { name: 'Alex Cerezo', role: 'Developer at Outlier', github: 'alexcerezo', linkedin: 'alexcerezocontreras', x: 'alexcerezx' },
  { name: 'Aditya Bhaumik', role: 'Student at VIT', github: 'aditya-bhaumik', linkedin: 'aditya-bhaumik-62b6b2220' },
  { name: 'Vivek Vardhan', role: 'Student at VIT', github: 'vivekvardhan2810', linkedin: 'vivek-vardhan-23682521b' },
  { name: 'Dinesh Talwadker', role: 'Co-founder at Sanity Esports', github: 'dinxsh', linkedin: 'dineshtalwadker', x: 'dineshcodes' },
  { name: 'Sanya Dureja', role: 'SDE at PayPal', github: 'sanyadureja', linkedin: 'sanya-dureja-13960122a' },
  { name: 'Razvan Stoenescu', role: 'Team lead of Quasar Framework', github: 'rstoenescu' },
  { name: 'Sarah Drasner', role: 'Director at Google', github: 'sdras', x: 'sarah_edo' },
  { name: 'Homebrew', role: 'Package manager for macOS', github: 'Homebrew' },
  { name: 'Aditya Singh Rathore', role: 'Data engineer', github: 'Adez017', linkedin: 'aditya-singh-rathore0017', x: 'Adez017' },
  { name: 'Mehfooj A', role: 'Open source contributor', github: 'tsvlgd', linkedin: 'mehfooj-a-b6aa0b243' },
  { name: 'Abhash Chakraborty', role: 'Open source contributor', github: 'Abhash-Chakraborty', linkedin: 'abhash-chakraborty-b78862247' },
];

interface GeneratedEntry {
  login: string;
  name: string;
}
interface Generated {
  sponsors: GeneratedEntry[];
  sponsoring: GeneratedEntry[];
}

/** GitHub display names can be long bios. Keep the part before a "|" and drop stray symbols. */
function displayName(e: GeneratedEntry): string {
  const first = (e.name || "").split("|")[0].replace(/^[~s]+/, "").trim();
  return first && first.length <= 40 ? first : e.login;
}

// Entries pulled from the GitHub API at build time (scripts/fetch-sponsors.mjs) are added only
// when they are not already in the manual lists above. Without a token this adds nothing.
function withGenerated(manual: Person[], extra: GeneratedEntry[]): Person[] {
  const known = new Set(manual.map((p) => p.github?.toLowerCase()).filter(Boolean));
  const added: Person[] = extra
    .filter((e) => e.login && !known.has(e.login.toLowerCase()))
    .map((e) => ({ name: displayName(e), github: e.login }));
  return [...manual, ...added];
}

const gen = generated as Generated;
export const SPONSORS: Person[] = withGenerated(MANUAL_SPONSORS, gen.sponsors ?? []);
export const WE_SPONSOR: Person[] = withGenerated(MANUAL_WE_SPONSOR, gen.sponsoring ?? []);

/** Photo sources in the order they should be tried. */
export const avatarSources = (p: Person): string[] => {
  const out: string[] = [];
  if (p.avatar) out.push(p.avatar);
  if (p.github) out.push(`https://github.com/${p.github}.png?size=160`);
  if (p.avatarId) out.push(`https://avatars.githubusercontent.com/u/${p.avatarId}?v=4&s=160`);
  return out;
};
export const avatarOf = (p: Person): string => avatarSources(p)[0] ?? '';
export const githubUrl = (p: Person): string | undefined => (p.github ? `https://github.com/${p.github}` : undefined);
export const linkedinUrl = (p: Person): string | undefined =>
  p.linkedin ? `https://www.linkedin.com/${p.linkedin.startsWith('company/') ? '' : 'in/'}${p.linkedin}` : undefined;
export const xUrl = (p: Person): string | undefined => (p.x ? `https://x.com/${p.x}` : undefined);
/** LinkedIn if present, otherwise GitHub. */
export const profileUrl = (p: Person): string | undefined => linkedinUrl(p) ?? githubUrl(p);
