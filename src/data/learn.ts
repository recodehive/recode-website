// Source of truth for the Learn section. Edit courses, lessons and videos here.
// A lesson with a youtubeId and an MDX notes file in /learn is playable.
// A lesson without a youtubeId is listed as "Coming soon" and has no page.

export type Lesson = {
  slug: string;
  title: string;
  /** YouTube video ID. Leave undefined while the video does not exist. */
  youtubeId?: string;
  /** Real duration such as "12:40". Left empty until it is known; the UI hides it. */
  duration?: string;
  summary: string;
  commands?: string[];
  resources?: { label: string; url: string }[];
};

export type Module = { title: string; lessons: Lesson[] };

export type Course = {
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  description: string;
  icon: 'git' | 'api';
  modules: Module[];
};

export const NOTIFY_URL = 'https://recodehive.substack.com/subscribe';
export const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';
export const DISCUSSIONS_URL = 'https://github.com/orgs/recodehive/discussions';

export const courses: Course[] = [
  {
    slug: 'github-for-beginners',
    title: 'GitHub for Beginners',
    level: 'Beginner',
    topic: 'Version control',
    description: 'Git and GitHub from your first commit to your first merged pull request on a real open source project.',
    icon: 'git',
    modules: [
      {
        title: 'Git basics',
        lessons: [
          {
            slug: 'what-is-git-and-github',
            title: 'What Git and GitHub are',
            youtubeId: 'GrTV59Y84S8', // How to start with GitHub in 2024, Beginner's Guide
            // duration: TODO(sanjay)
            summary: 'How Git tracks changes, what GitHub adds on top, and the words you will meet in every tutorial.',
            commands: ['git --version'],
            resources: [{ label: 'Full written guide: Introduction of GitHub', url: '/docs/GitHub/intro-github' }],
          },
          {
            slug: 'install-git',
            title: 'Install Git and set your identity',
            summary: 'Install Git on Windows or Mac and tell it who you are.',
          },
          {
            slug: 'first-repository',
            title: 'Your first repository and commit',
            youtubeId: 'XWjx-RjmhRM', // How to create your first GitHub repository
            summary: 'Create a repository on GitHub, add a README and save your first commit.',
            resources: [
              { label: 'Written guide: create a repo in the browser', url: '/docs/GitHub/GitHub-basics/create-github-repo' },
              { label: 'Written guide: create a repo from the command line', url: '/docs/GitHub/GitHub-basics/github-repo-command-line' },
            ],
          },
        ],
      },
      {
        title: 'Branches and pull requests',
        lessons: [
          { slug: 'branching', title: 'Branching without fear', summary: 'Try changes safely on a branch.' },
          { slug: 'push-and-pull-request', title: 'Push and open a pull request', summary: 'Send your branch to GitHub and ask for a review.' },
          { slug: 'merge-conflicts', title: 'Resolve a merge conflict', summary: 'Fix the two sides of a conflict and finish the merge.' },
        ],
      },
      {
        title: 'Contributing to open source',
        lessons: [
          { slug: 'fork-clone-sync', title: 'Fork, clone and sync', summary: 'Copy a project, work on it locally and keep it up to date.' },
          {
            slug: 'first-recode-hive-pr',
            title: 'Your first recode hive PR',
            youtubeId: 'R7NReLBCT_8', // How to do your first opensource on GitHub
            summary: 'Fork a practice repository, make a change in the browser and open your first pull request.',
            resources: [
              { label: 'Written guide: First Opensource Project', url: '/docs/GitHub/GitHub-basics/first-opensource-code' },
              { label: 'Practice repository', url: 'https://github.com/sanjay-kv/Open-source-Practice' },
            ],
          },
        ],
      },
      {
        title: 'Your GitHub profile',
        lessons: [
          {
            slug: 'profile-readme',
            title: 'Profile README and pinned repos',
            youtubeId: '3dnQ2lDNeGI', // How to make special readme profile
            summary: 'Create the special profile repository and use it to introduce yourself.',
            resources: [{ label: 'Written guide: Fun profile customizations', url: '/docs/GitHub/Fun-Profile-Customizations/Why-Customize' }],
          },
          {
            slug: 'achievements',
            title: 'Achievements and what they mean',
            youtubeId: 'sbyXpflAXkQ', // How to Unlock GitHub Star Achievements
            summary: 'What the achievement badges ask for and how to earn them honestly.',
            resources: [{ label: 'The full badge guide', url: '/badges/github-badges/' }],
          },
        ],
      },
    ],
  },
  {
    slug: 'postman-api-testing',
    title: 'Postman API Testing',
    level: 'Beginner',
    topic: 'APIs',
    description: 'Send, organize and test API requests in Postman, then run your collection automatically in CI.',
    icon: 'api',
    // No lesson videos exist yet, so every lesson is "Coming soon" and the course is not clickable.
    modules: [
      {
        title: 'API basics',
        lessons: [
          { slug: 'how-apis-work', title: 'How APIs work', summary: 'Requests, responses and what travels between them.' },
          { slug: 'methods-and-status-codes', title: 'HTTP methods and status codes', summary: 'GET, POST, PUT and DELETE, and what the numbers mean.' },
        ],
      },
      {
        title: 'Working in Postman',
        lessons: [
          { slug: 'first-request', title: 'Your first request', summary: 'Send a request and read the response.' },
          { slug: 'environments', title: 'Environments and variables', summary: 'Reuse values across requests.' },
          { slug: 'auth', title: 'Auth: API keys and tokens', summary: 'Send credentials the right way.' },
        ],
      },
      {
        title: 'Testing and automation',
        lessons: [
          { slug: 'first-tests', title: 'Write your first tests', summary: 'Check status codes and response data.' },
          { slug: 'ci', title: 'Run collections in CI', summary: 'Run your tests on every push.' },
        ],
      },
    ],
  },
];

export const comingSoon = [
  { title: 'Open Source Contribution Path', topic: 'Version control', description: 'From reading a codebase to getting your PR reviewed and merged.' },
  { title: 'SQL for Beginners', topic: 'Databases', description: 'Query real datasets with SELECT, JOIN and GROUP BY.' },
];

export const isPlayable = (l: Lesson) => Boolean(l.youtubeId);
export const playableLessons = (c: Course) => c.modules.flatMap((m) => m.lessons).filter(isPlayable);
export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
export const courseIsLive = (c: Course) => playableLessons(c).length > 0;
export const lessonKey = (course: string, lesson: string) => `${course}/${lesson}`;
export const lessonPath = (course: string, lesson: string) => `/learn/${course}/${lesson}`;
export const coursePath = (course: string) => `/learn/${course}`;
export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
