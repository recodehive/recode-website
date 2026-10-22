import React, { useEffect, useRef, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { ExternalLink, GitFork, Play, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { CheckIt, Cmd, Code, Ext, OsOnly, Stuck, Term, UserToken } from './blocks';
import { reducedMotion, useSetup } from './state';
import s from './SetupGuide.module.css';

const Kbd = ({ children }: { children: React.ReactNode }) => <kbd className={s.kbd}>{children}</kbd>;
const Tip = ({ children }: { children: React.ReactNode }) => <div className={`${s.callout} ${s.calloutBlue}`}>{children}</div>;

function Step1() {
  return (
    <>
      <p>GitHub is where the recode hive code lives. If you already have an account, mark this step done and skip ahead.</p>
      <ol className={s.list}>
        <li>Go to <Ext href="https://github.com/signup">github.com/signup</Ext>.</li>
        <li>Pick a username you are happy to show employers. It becomes part of every link you share.</li>
        <li>Verify your email address.</li>
      </ol>
      <Tip><strong>Tip</strong> Add a profile photo and a one-line bio. Maintainers are more likely to review pull requests from real-looking profiles.</Tip>
    </>
  );
}

function Step2() {
  return (
    <>
      <p>
        <Term word="Git" tip="A free tool that saves every version of your files and lets you share your changes." /> downloads the project and keeps track of your changes.
      </p>
      <OsOnly os="win">
        <ol className={s.list}>
          <li>Download Git for Windows from <Ext href="https://git-scm.com/download/win">git-scm.com/download/win</Ext> and run the installer.</li>
          <li>Keep the default options. They add Git to your terminal.</li>
        </ol>
        <p>Or, if you use winget, open PowerShell (press the Windows key, type <Code>PowerShell</Code>, press Enter) and run:</p>
        <Cmd label="PowerShell" code="winget install --id Git.Git -e" />
      </OsOnly>
      <OsOnly os="mac">
        <p>Open the Terminal app (press <Kbd>Cmd</Kbd> + <Kbd>Space</Kbd>, type <Code>Terminal</Code>, press Enter) and run:</p>
        <Cmd label="Terminal" code="xcode-select --install" />
        <p>Or, if you use Homebrew:</p>
        <Cmd label="Terminal" code="brew install git" />
      </OsOnly>
      <OsOnly os="linux">
        <p>Open your Terminal app and run:</p>
        <Cmd label="Terminal" code="sudo apt update && sudo apt install git" />
        <p>On Fedora, use <Code>sudo dnf install git</Code> instead.</p>
      </OsOnly>
      <p>Then tell Git who you are. Use the same email as your GitHub account:</p>
      <Cmd label="Terminal" code={'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"'} />
      <CheckIt cmd={['git --version']} output={['git version 2.x.x']} note="Your version numbers may be different. That is fine." />
      <Stuck
        items={[
          { problem: '"git is not recognized" or "command not found"', fix: 'Close the terminal and open a new one. If it still fails, run the installer again and keep the option that adds Git to your PATH.' },
        ]}
      />
    </>
  );
}

function Step3() {
  return (
    <>
      <p>
        <Term word="Node.js" tip="Lets your computer run JavaScript outside the browser. The recode hive website needs it to build and run." /> runs the website on your computer. You need <strong>version 20.9 or newer, up to 22</strong>. npm comes with it.
      </p>
      <OsOnly os="win">
        <p>Install Node 22 with winget:</p>
        <Cmd label="PowerShell" code="winget install OpenJS.NodeJS.22" />
        <p>Or download the version 22 installer from <Ext href="https://nodejs.org/en/download">nodejs.org</Ext> (pick v22 in the version list) and keep the default options.</p>
      </OsOnly>
      <OsOnly os={['mac', 'linux']}>
        <p>The easiest way is nvm, a small tool that installs and switches Node versions:</p>
        <Cmd label="Terminal" code="curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash" />
        <p>Close the terminal, open a new one, then run:</p>
        <Cmd label="Terminal" code="nvm install 22" />
      </OsOnly>
      <OsOnly os="mac">
        <p>Prefer an installer? Download the version 22 package for macOS from <Ext href="https://nodejs.org/en/download">nodejs.org</Ext>.</p>
      </OsOnly>
      <CheckIt cmd={['node -v', 'npm -v']} output={['v22.x.x', '10.x.x']} note="Any Node version from 20.9 to 22 works." />
      <Stuck
        items={[
          { problem: '"node" or "npm" is not recognized', fix: 'Close the terminal and open a new one so it picks up the new install.' },
          { problem: 'A warning that mentions EBADENGINE or "Unsupported engine"', fix: 'Your Node version is outside the range the project supports. Install version 22 using the command above.' },
        ]}
      />
    </>
  );
}

function Step4() {
  return (
    <>
      <p>You will read and edit files in a code editor. We suggest <strong>Visual Studio Code</strong>. It is free and works on every system.</p>
      <a className={s.btnDark} href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">
        Download VS Code <ExternalLink size={13} aria-hidden="true" />
      </a>
    </>
  );
}

const fmt = (n: number | null | undefined) => (typeof n === 'number' ? n.toLocaleString('en-US') : null);

function ForkMock() {
  const stats = usePluginData('repo-stats') as { stars?: number | null; forks?: number | null } | undefined;
  const stars = fmt(stats?.stars);
  const forks = fmt(stats?.forks);
  return (
    <div className={s.forkMock} role="img" aria-label="Illustration of the recode-website page on GitHub with the Fork button highlighted">
      <div className={s.forkMockBar}>
        <FaGithub size={17} aria-hidden="true" />
        <span className={s.repoName}><b>recodehive</b> / <b>recode-website</b></span>
        <span className={s.pill}>Public</span>
        <span className={s.ghBtns}>
          <span className={s.ghBtn}><Star size={13} aria-hidden="true" /> Star{stars && <em>{stars}</em>}</span>
          <span className={`${s.ghBtn} ${s.ghFork}`}><GitFork size={13} aria-hidden="true" /> Fork{forks && <em>{forks}</em>}</span>
        </span>
      </div>
      <div className={s.forkMockNote}>Click Fork. GitHub makes a copy under your account.</div>
    </div>
  );
}

function Step5() {
  return (
    <>
      <p>
        A <Term word="fork" tip="Your own copy of a project on GitHub. You can change it freely without touching the original." /> is your own copy of recode hive on GitHub. You change your copy, then ask us to add your changes.
      </p>
      <ol className={s.list}>
        <li>Open <Ext href="https://github.com/recodehive/recode-website">github.com/recodehive/recode-website</Ext> while signed in.</li>
        <li>Click <strong>Fork</strong> in the top right corner.</li>
        <li>Keep the name <Code>recode-website</Code> and click <strong>Create fork</strong>.</li>
      </ol>
      <ForkMock />
      <p>When it finishes, your browser shows:</p>
      <div className={s.urlPill}>github.com/<UserToken />/recode-website</div>
    </>
  );
}

function CloneHint() {
  const { username } = useSetup();
  if (username) return null;
  return <p className={s.hint}>Type your GitHub username at the top of the page and this command fills itself in.</p>;
}

function Step6() {
  return (
    <>
      <p>
        To <Term word="clone" tip="Download a copy of a GitHub project onto your computer, history included." /> means to download your fork to your computer. Open a terminal in the folder where you keep projects and run:
      </p>
      <Cmd label="Terminal" code={'git clone https://github.com/{{user}}/recode-website.git\ncd recode-website'} />
      <CloneHint />
      <Stuck
        items={[
          { problem: '"Repository not found"', fix: 'Check the spelling of your username, and make sure you finished Step 5 so the fork exists under your account.' },
          { problem: '"Destination path already exists"', fix: 'You already downloaded it. Run cd recode-website and carry on.' },
          { problem: 'GitHub asks you to sign in', fix: 'Follow the prompt in your browser. It only happens the first time.' },
        ]}
      />
    </>
  );
}

function Step7() {
  return (
    <>
      <p>From inside the <Code>recode-website</Code> folder, open VS Code:</p>
      <Cmd label="Terminal" code="code ." />
      <OsOnly os="mac">
        <p>If the command is not found, open VS Code, press <Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>, type <Code>Shell Command: Install &apos;code&apos; command in PATH</Code> and press Enter. Then open a new terminal.</p>
      </OsOnly>
      <p>Or open VS Code and use File, then Open Folder.</p>
    </>
  );
}

function Step8() {
  return (
    <>
      <p>The website uses other people&apos;s code packages. This downloads them into a <Code>node_modules</Code> folder. It takes a few minutes the first time.</p>
      <Cmd label="Terminal" code="npm install" />
      <CheckIt cmd={['npm install']} output={['added … packages in …']} note="The exact number of packages will be different. Warnings in yellow are fine. Red ERR lines are not." />
      <Stuck
        items={[
          { problem: 'An error about the Node version', fix: 'Go back to Step 3 and check your Node version.' },
          { problem: 'EACCES or other permission errors', fix: 'Never use sudo inside the project. Make sure you cloned into a folder you own, such as Documents.' },
          { problem: 'A network error', fix: 'Check your connection and run npm install again.' },
        ]}
      />
    </>
  );
}

/** A simulated terminal. The two lines are exactly what `npm run start` prints in this repo. */
function TryIt() {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = () => {
    window.clearTimeout(timer.current);
    setPhase('running');
    timer.current = window.setTimeout(() => setPhase('done'), reducedMotion() ? 0 : 1400);
  };

  return (
    <div className={s.check}>
      <div className={`${s.checkBar} ${s.tryBar}`}>
        <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
        <span className={s.checkTitle}>Try it here first</span>
        <button type="button" className={s.runBtn} onClick={run} disabled={phase === 'running'}>
          <Play size={12} aria-hidden="true" /> {phase === 'running' ? 'Running' : phase === 'done' ? 'Run again' : 'Run'}
        </button>
      </div>
      <div className={s.checkBody} aria-live="polite">
        <div className={s.checkCmd}><span className={s.prompt}>$</span> npm run start</div>
        {phase !== 'idle' && <div className={s.checkOut}>[INFO] Starting the development server...</div>}
        {phase === 'done' && (
          <div className={s.checkOut}>
            [SUCCESS] Docusaurus website is running at: <a className={s.termLink} href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">http://localhost:3000/</a>
          </div>
        )}
      </div>
      <div className={s.checkNote}>A simulation. Nothing is running on your computer until you run the command in your own terminal.</div>
    </div>
  );
}

function Step9() {
  return (
    <>
      <p>Start the local development server:</p>
      <Cmd label="Terminal" code="npm run start" />
      <TryIt />
      <p>Open <Ext href="http://localhost:3000">http://localhost:3000</Ext> in your browser. You are now running recode hive on your own computer.</p>
      <Stuck
        items={[
          { problem: '"Port 3000 is already in use"', fix: 'Press Y when asked to use a different port, or close the other program. The terminal prints the new address.' },
          { problem: 'How do I stop the server?', fix: <>Click in the terminal and press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>.</> },
          { problem: 'The page is blank or looks broken', fix: 'Wait for the terminal to say the site is running, then refresh the browser. The first start is the slowest.' },
        ]}
      />
    </>
  );
}

function Step10() {
  return (
    <>
      <p>Prove to yourself that it is really your copy:</p>
      <ol className={s.list}>
        <li>In VS Code, open <Code>docs/getting_started.md</Code>. It is the page called &quot;How to Contribute to Blogs&quot;.</li>
        <li>Change one word in the first paragraph and save with <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> (<Kbd>Cmd</Kbd> + <Kbd>S</Kbd> on a Mac).</li>
        <li>Open <Ext href="http://localhost:3000/docs/Getting-Started">localhost:3000/docs/Getting-Started</Ext>. The page reloads with your change in a second or two.</li>
      </ol>
      <Tip><strong>Do not worry about breaking anything.</strong> This is your copy. Nothing changes on recode hive until you open a pull request.</Tip>
      <p>To undo the experiment, run this in a second terminal in the same folder:</p>
      <Cmd label="Terminal" code="git checkout -- docs/getting_started.md" />
    </>
  );
}

export interface StepDef {
  n: number;
  title: string;
  time: string;
  /** Plain text for the HowTo structured data. */
  summary: string;
  body: React.ReactNode;
}

export const STEPS: StepDef[] = [
  { n: 1, title: 'Create a GitHub account', time: '2 min', summary: 'Sign up at github.com/signup, pick a username and verify your email address.', body: <Step1 /> },
  { n: 2, title: 'Install Git', time: '5 min', summary: 'Install Git for your system, then set your name and email with git config.', body: <Step2 /> },
  { n: 3, title: 'Install Node.js', time: '5 min', summary: 'Install Node.js version 20.9 to 22 and check it with node -v and npm -v.', body: <Step3 /> },
  { n: 4, title: 'Install a code editor', time: '3 min', summary: 'Download and install Visual Studio Code, a free code editor.', body: <Step4 /> },
  { n: 5, title: 'Fork the project', time: '1 min', summary: 'Open github.com/recodehive/recode-website while signed in and click Fork, then Create fork.', body: <Step5 /> },
  { n: 6, title: 'Download your fork (clone)', time: '2 min', summary: 'Run git clone with your fork address, then cd recode-website.', body: <Step6 /> },
  { n: 7, title: 'Open the project in your editor', time: '1 min', summary: 'From the recode-website folder run code . to open it in VS Code.', body: <Step7 /> },
  { n: 8, title: "Install the project's dependencies", time: '3 to 5 min', summary: 'Run npm install to download the packages the website uses.', body: <Step8 /> },
  { n: 9, title: 'Start the website', time: '1 min', summary: 'Run npm run start and open http://localhost:3000 in your browser.', body: <Step9 /> },
  { n: 10, title: 'Make a tiny change to see it work', time: '2 min', summary: 'Edit one word in a docs Markdown file, save, and watch the page reload.', body: <Step10 /> },
];
