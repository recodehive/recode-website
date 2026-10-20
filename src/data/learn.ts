// Source of truth for the Learn section. Edit courses, lessons and videos here.
// A lesson is published when it has at least one video AND a written MDX notes file in /learn that
// is long enough and free of "TODO: write original content" (see plugins/learn-words).
// Everything else is a draft: listed but not clickable, noindex, and left out of the sitemap.

export type Video = { id: string; label?: string };

export type Lesson = {
  slug: string;
  title: string;
  /** YouTube videos. The first one is the main embed, the rest show under it as more videos. */
  videos?: Video[];
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
  /** One long video of the whole course, linked under the module list. */
  fullCourseVideoId?: string;
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
    fullCourseVideoId: 'bFHwtm6FQ4c',
    modules: [
      {
        title: 'Git basics',
        lessons: [
          {
            slug: 'what-is-git-and-github',
            title: 'What Git and GitHub are',
            videos: [{ id: 'GrTV59Y84S8' }, { id: 'SLdOYby72LQ', label: 'Understanding GitHub as a dev product' }],
            summary: 'How Git tracks changes, what GitHub adds on top, and the words you will meet in every tutorial.',
            commands: ['git --version'],
            resources: [{ label: 'Full written guide: Introduction of GitHub', url: '/docs/GitHub/intro-github' }],
          },
          {
            slug: 'first-repository',
            title: 'Create your first repository on GitHub',
            videos: [{ id: 'XWjx-RjmhRM' }],
            summary: 'Create a repository on GitHub, add a README and save your first commit.',
            resources: [
              { label: 'Written guide: create a repo in the browser', url: '/docs/GitHub/GitHub-basics/create-github-repo' },
              { label: 'Written guide: create a repo from the command line', url: '/docs/GitHub/GitHub-basics/github-repo-command-line' },
            ],
          },
          {
            slug: 'create-repo-command-line',
            title: 'Create a repository from the command line',
            videos: [{ id: 'DO38CZcw5pg' }],
            summary: 'Create a new repository on GitHub from your terminal and push your first files to it.',
          },
        ],
      },
      {
        title: 'Contributing to open source',
        lessons: [
          {
            slug: 'fork-clone-sync',
            title: 'Fork, clone and sync a project',
            videos: [{ id: 'QlTrHXmr-JI' }],
            summary: 'Copy a project with a fork, work on it locally and keep your copy up to date with the original.',
          },
          {
            slug: 'first-recode-hive-pr',
            title: 'Your first recodehive pull request',
            videos: [{ id: 'R7NReLBCT_8' }, { id: 'Fl2L9bXSRy0', label: 'Another walkthrough of a first contribution' }],
            summary: 'Fork a practice repository, make a change in the browser and open your first pull request.',
            resources: [
              { label: 'Written guide: First Opensource Project', url: '/docs/GitHub/GitHub-basics/first-opensource-code' },
              { label: 'Practice repository', url: 'https://github.com/sanjay-kv/Open-source-Practice' },
            ],
          },
          {
            slug: 'how-open-source-works',
            title: 'How open source projects actually work',
            videos: [{ id: 'V2nvZYe_q7g' }],
            summary: 'How maintainers, contributors and issues fit together in a real open source project.',
          },
        ],
      },
      {
        title: 'Your GitHub profile',
        lessons: [
          {
            slug: 'profile-readme',
            title: 'Build your profile README',
            videos: [{ id: '3dnQ2lDNeGI' }, { id: 'ILccFNnQr9s', label: 'More ways to customize your profile' }],
            summary: 'Create the special profile repository and use it to introduce yourself.',
            resources: [{ label: 'Written guide: Fun profile customizations', url: '/docs/GitHub/Fun-Profile-Customizations/Why-Customize' }],
          },
          {
            slug: 'achievements',
            title: 'GitHub achievements and what they mean',
            videos: [
              { id: 'sbyXpflAXkQ', label: 'All achievements' },
              { id: '7uKMWBFN2jQ', label: 'Pull Shark' },
              { id: 'v2Pai1TY_Lg', label: 'Galaxy Brain' },
              { id: 'P-P3L7YzlyE', label: 'Starstruck' },
              { id: 'BNKSlT8jLQ0', label: 'Quickdraw' },
              { id: 'GnHNScuGKrg', label: 'YOLO' },
              { id: 'ZoNO_e8PjiM', label: 'Pair Extraordinaire' },
              { id: 'dcdpkD7lYDg', label: 'Public Sponsor' },
            ],
            summary: 'What the achievement badges ask for and how to earn each one honestly.',
            resources: [{ label: 'The full badge guide', url: '/badges/github-badges/' }],
          },
        ],
      },
      {
        title: 'Work faster on GitHub',
        lessons: [
          { slug: 'github-projects', title: 'Plan your work with GitHub Projects', videos: [{ id: '7BL6eInh7qo' }], summary: 'Organize issues and pull requests on a project board so you always know what comes next.' },
          { slug: 'codespaces', title: 'Code in the browser with Codespaces', videos: [{ id: 'akz9xHL1RQo' }], summary: 'Turn on Codespaces and write code in a ready made development environment in your browser.' },
          { slug: 'student-developer-pack', title: 'Get free tools with the Student Developer Pack', videos: [{ id: 'knr5gBv-c9c' }], summary: 'Apply for the GitHub Student Developer Pack and unlock the free tools that come with it.' },
          { slug: 'copilot-pair-programming', title: 'Pair program with GitHub Copilot', videos: [{ id: '4JX-SIkM3uk' }], summary: 'Use GitHub Copilot as an assistant while you code, and learn where to trust it and where to check it.' },
          { slug: 'copilot-coding-agent', title: 'Hand off tasks to the Copilot coding agent', videos: [{ id: '6AmzJDAOHJ8' }], summary: 'Assign an issue to the Copilot coding agent and review the pull request it opens for you.' },
        ],
      },
      {
        title: 'Keep your account safe',
        lessons: [
          { slug: 'security-features', title: 'GitHub security features you should turn on', videos: [{ id: 'DmYe2itxSQA' }], summary: 'The account and repository security settings worth turning on from the first day.' },
          { slug: 'recover-suspended-account', title: 'Recover a suspended GitHub account', videos: [{ id: 'TvQ1OYRJUe0' }], summary: 'What to do when GitHub suspends your account and how to ask for it back.' },
        ],
      },
      {
        title: 'GitHub Sponsors',
        lessons: [
          { slug: 'set-up-github-sponsors', title: 'Set up your GitHub Sponsors profile', videos: [{ id: 'z579SrLdk2I' }, { id: 'RSR5E1bhu5Y', label: 'Step by step guide to getting sponsored' }], summary: 'Create your GitHub Sponsors profile so people can support the open source work you do.' },
          { slug: 'sponsor-developers', title: 'Sponsor developers you depend on', videos: [{ id: 'krgKPvWNPLQ' }], summary: 'Find the developers behind the tools you use and sponsor them through GitHub.' },
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

export const videosOf = (l: Lesson): Video[] => l.videos ?? [];
export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
export const lessonKey = (course: string, lesson: string) => `${course}/${lesson}`;
export const lessonPath = (course: string, lesson: string) => `/learn/${course}/${lesson}`;
export const coursePath = (course: string) => `/learn/${course}`;
export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
