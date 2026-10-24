// All new beginner copy for the "Introduction of GitHub" lesson. The existing page copy stays in the MDX file.

export const GIT_VS_GITHUB = {
  label: 'GIT VS GITHUB IN 30 SECONDS',
  git: {
    name: 'Git',
    where: 'The tool, on your computer',
    text: 'Saves every version of your project, like save points in a video game. Made a mistake? Jump back to any save point.',
  },
  github: {
    name: 'GitHub',
    where: 'The website, in the cloud',
    text: 'An online home for Git projects, like Google Drive for code. Teams share their work, review it and build it together.',
  },
  push: 'push',
  pull: 'pull',
  remember: 'Remember:',
  rememberText: 'Git is the tool. GitHub is the website that hosts Git projects.',
};

export const SCENARIO = {
  label: 'EXAMPLE SCENARIO',
  devs: '3 developers, 3 features',
  push: 'push',
  repo: 'Shared repository',
  review: 'review',
  merged: 'Merged by senior dev',
};

export const FACTS = {
  label: 'GIT AT A GLANCE',
  items: [
    { value: '2005', label: 'Year created' },
    { value: 'Linus Torvalds', label: 'Creator' },
    { value: 'Free', label: 'Open source' },
  ],
};

export const SAVE_POINTS = {
  label: 'SEE IT: EVERY COMMIT IS A SAVE POINT',
  example: 'Example',
  commits: [
    { n: 1, msg: 'Create homepage', when: 'Mon 10:02' },
    { n: 2, msg: 'Add login page', when: 'Tue 14:30' },
    { n: 3, msg: 'Fix a typo', when: 'Wed 09:15' },
    { n: 4, msg: 'Add dark mode', when: 'Now' },
  ],
  note: 'Broke something in step 4? Go back to step 3 in seconds. That is what version control gives you.',
};

export const VCS_CARDS = {
  vcs: { tag: 'VCS', title: 'Version control system', server: 'Central server', dev: 'dev' },
  dvcs: { tag: 'DVCS', title: 'Distributed version control', copy: 'dev · full copy' },
};

export const GLOSSARY = {
  title: 'Core Git terminology',
  search: 'Search a term, e.g. commit',
  searchLabel: 'Search Git terms',
  essential: 'Start with these 5',
  all: 'All 11 terms',
  empty: 'No term matches that search. Try a shorter word.',
  // The same 11 rows as the original table, in the original order. "essential" is the beginner order of the 5 to start with.
  terms: [
    { key: 'VCS', term: 'Version Control System', text: 'Tracks changes to a collection of files over time' },
    { key: 'SCM', term: 'Software Configuration Management', text: 'Another term for VCS; earlier systems like CVS and SVN used centralized servers' },
    { key: 'DVCS', term: 'Distributed Version Control System', text: 'Each developer holds a full copy of the project history locally and remotely' },
    { key: 'Working Tree', term: 'Tree', text: 'The current state of files in your active project directory', essential: 2 },
    { key: 'Repo', term: 'Repository', text: 'The top-level folder where Git stores all project history and records', essential: 1 },
    { key: 'Bare Repo', term: '', text: 'A repository without a working tree, typically used for remote backups; ends with .git' },
    { key: 'Hash', term: '160-bit SHA-1', text: 'A unique identifier generated for each commit to detect changes' },
    { key: 'Object', term: 'Git has 4 object types', text: 'Tree (directories), Blob (file contents), Commit (snapshots), Tag (named references)' },
    { key: 'Commit', term: '', text: 'A saved snapshot of changes at a point in time', essential: 3 },
    { key: 'Branch', term: 'A series of linked commits', text: 'An independent line of development; the latest commit is called HEAD', essential: 4 },
    { key: 'Remote', term: '', text: 'A reference to a Git repository hosted on another machine or server', essential: 5 },
  ] as { key: string; term: string; text: string; essential?: number }[],
};

export const WHY_NUMBERS = ['01', '02', '03', '04', '05'] as const;

export const STEPS = [
  { name: 'Clone', text: 'Download a copy of the repository to your computer.', cmd: 'git clone https://github.com/user/repo.git', plain: false },
  { name: 'Branch', text: 'Create your own line of work so main stays safe.', cmd: 'git checkout -b my-feature', plain: false },
  { name: 'Commit', text: 'Save a snapshot of your changes with a message.', cmd: 'git commit -m "Add login page"', plain: false },
  { name: 'Push', text: 'Send your commits up to GitHub.', cmd: 'git push origin my-feature', plain: false },
  { name: 'Pull request', text: 'Ask for your changes to be reviewed and merged.', cmd: 'Open a pull request on GitHub', plain: true },
];

export const CONCEPTS = [
  { icon: 'issue', name: 'Issues', text: 'A place to report bugs, request features, or track tasks' },
  { icon: 'chat', name: 'Discussions', text: 'A space for community conversations and questions' },
  { icon: 'pr', name: 'Pull Requests', text: 'A request to merge your changes into the main codebase after review' },
  { icon: 'tag', name: 'Labels', text: 'Tags used to categorize issues and pull requests (e.g. bug, enhancement)' },
  { icon: 'zap', name: 'Actions', text: 'Automation workflows that run on events like push or pull request' },
  { icon: 'fork', name: 'Forks', text: "A personal copy of someone else's repository under your own account" },
] as const;

export const VIDEO = {
  id: 'GrTV59Y84S8',
  list: 'PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63',
  title: "How to start with GitHub in 2024 | Beginner's Guide",
  card: 'GitHub tutorial playlist',
  channel: 'recode hive on YouTube',
};

export const TAKEAWAYS = {
  label: 'KEY TAKEAWAYS',
  items: [
    'Git is the tool on your computer that saves every version of your project.',
    'GitHub is the website where Git projects live online, so teams can share and review them.',
    'A commit is a save point. A branch is a safe copy to try changes on.',
    'The everyday loop: clone, branch, commit, push, pull request.',
  ],
};

export const QUIZ = {
  label: 'QUICK CHECK',
  questions: [
    {
      q: 'Where does Git run?',
      options: ['On your own computer', 'Only on the GitHub website'],
      answer: 0,
      why: 'Git runs on your computer. GitHub is the website where you share your Git projects.',
    },
    {
      q: 'What is a commit?',
      options: ["A copy of someone else's project", 'A saved snapshot of your project'],
      answer: 1,
      why: 'A commit is a save point. You can always go back to it.',
    },
    {
      q: 'You want to improve a project you cannot edit directly. What do you use?',
      options: ['A fork', 'A remote'],
      answer: 0,
      why: 'Fork it, change your copy, then open a pull request back to the original.',
    },
  ],
};

export const HEADER = {
  track: 'GitHub track',
  level: 'Beginner',
  introA: 'New to coding? Start here. In about',
  introB: 'minutes you will understand what Git and GitHub are, how they work together, and why almost every developer uses them. No coding needed.',
  here: 'You are here',
};

function strings(value: unknown, out: string[]): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

/** Words in the new beginner copy above. Added to the MDX prose word count to get the reading time. */
export const LESSON_COPY_WORDS = strings(
  [GIT_VS_GITHUB, SCENARIO, FACTS, SAVE_POINTS, VCS_CARDS, GLOSSARY.terms, STEPS, CONCEPTS, TAKEAWAYS, QUIZ, HEADER],
  [],
)
  .join(' ')
  .split(/\s+/)
  .filter(Boolean).length;
