import React, {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./courses.module.css";

const GITHUB_PLAYLIST =
  "https://www.youtube.com/playlist?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63";
const POSTMAN_PLAYLIST_ID = "PLrLTYhoDFx-k62rLLajSB-jeqKwLkDrkF";
const POSTMAN_PLAYLIST = `https://www.youtube.com/watch?v=O1ahDsq8DU0&list=${POSTMAN_PLAYLIST_ID}`;
const REPO_URL = "https://github.com/recodehive/recode-website";
const FIRST_LESSON = "/docs/GitHub/intro-github";

const PAGE_TITLE = "Free Courses: GitHub and Postman";
const PAGE_DESCRIPTION =
  "Two free hands-on courses from recode hive: Git and GitHub with videos and written lessons, and the Postman API certification one task at a time.";

type Lesson = { n: string; title: string; href: string };
type Module = { title: string; lessons: Lesson[] };

const docs = (path: string) => `/docs/GitHub/${path}`;

const githubModules: Module[] = [
  {
    title: "Setup",
    lessons: [
      { n: "01", title: "Introduction of GitHub", href: FIRST_LESSON },
      {
        n: "02",
        title: "Setup GitHub Account",
        href: docs("setup-environment"),
      },
      {
        n: "03",
        title: "Setup Git on Windows",
        href: docs("setup-environment/setup-git-on-windows"),
      },
      {
        n: "04",
        title: "Setup Git on Mac and Linux",
        href: docs("setup-environment/setup-git-on-mac"),
      },
      {
        n: "05",
        title: "Git commands",
        href: docs("setup-environment/git-commands"),
      },
    ],
  },
  {
    title: "GitHub basics",
    lessons: [
      {
        n: "06",
        title: "Create GitHub Repo (GUI)",
        href: docs("GitHub-basics/create-github-repo"),
      },
      {
        n: "07",
        title: "Create Repo Via Command line",
        href: docs("GitHub-basics/github-repo-command-line"),
      },
      {
        n: "08",
        title: "How to clone repository",
        href: docs("GitHub-basics/how-to-clone-repository"),
      },
      {
        n: "09",
        title: "How to Fork a Repository",
        href: docs("GitHub-basics/how-to-fork"),
      },
      {
        n: "10",
        title: "First Opensource Project",
        href: docs("GitHub-basics/first-opensource-code"),
      },
    ],
  },
  {
    title: "Maintainer guide",
    lessons: [
      {
        n: "11",
        title: "Create Labels on GitHub",
        href: docs("Maintainer-guide/github-labels"),
      },
      {
        n: "12",
        title: "Create Milestone on GitHub",
        href: docs("Maintainer-guide/milestone"),
      },
      {
        n: "13",
        title: "How to Create GitHub Projects",
        href: docs("Maintainer-guide/github-project"),
      },
      {
        n: "14",
        title: "How to Enable Discussions",
        href: docs("Maintainer-guide/enable-dicussion"),
      },
    ],
  },
  {
    title: "Profile",
    lessons: [
      {
        n: "15",
        title: "Why customize your GitHub profile",
        href: docs("Fun-Profile-Customizations/Why-Customize"),
      },
    ],
  },
];

const postmanVideo = (id: string) =>
  `https://www.youtube.com/watch?v=${id}&list=${POSTMAN_PLAYLIST_ID}`;

const postmanModule: Module = {
  title: "Postman API certification, 9 videos",
  lessons: [
    {
      n: "01",
      title: "Getting started with Postman API certification",
      href: POSTMAN_PLAYLIST,
    },
    {
      n: "02",
      title: "Your first API request",
      href: postmanVideo("qjbL72odpPE"),
    },
    {
      n: "03",
      title: "Working with request parameters",
      href: postmanVideo("GfTTuLN4gpI"),
    },
    {
      n: "04",
      title: "Sending data with Postman",
      href: postmanVideo("KasLQclJu6c"),
    },
    {
      n: "05",
      title: "Variables in Postman",
      href: postmanVideo("mNS6jG5nRqM"),
    },
    {
      n: "06",
      title: "Halfway check and bug fix",
      href: postmanVideo("e99s27I4aXQ"),
    },
    { n: "07", title: "PATCH and DELETE", href: postmanVideo("6G4UAtnvnKo") },
    {
      n: "08",
      title: "Final test to complete the certification",
      href: postmanVideo("_kIw5xA9uis"),
    },
    {
      n: "09",
      title: "Claim your Postman certification badge",
      href: postmanVideo("SGTu5Ck01C8"),
    },
  ],
};

const stats = [
  { value: "2", label: "free courses" },
  { value: "42", label: "videos" },
  { value: "15", label: "written lessons" },
  { value: "$0", label: "to learn" },
];

const steps = [
  {
    title: "Watch",
    body: "Each topic has a video on the recode hive YouTube channel.",
  },
  {
    title: "Read",
    body: "The GitHub lessons are written step by step with screenshots, so you can follow at your own pace.",
  },
  {
    title: "Do",
    body: "Create a repository, make a commit, send an API request. You learn it by doing it.",
  },
];

const faqs = [
  {
    q: "Are the courses really free?",
    a: "Yes. The videos are on YouTube and the written lessons are on this site. You do not pay for either.",
  },
  {
    q: "Do I need experience before I start?",
    a: "No. The GitHub course starts from what GitHub is. The Postman course starts with your first API request.",
  },
  {
    q: "Where should I begin?",
    a: "Start with GitHub if you have never used Git. Otherwise, start the Postman playlist at video 1.",
  },
  {
    q: "Is there a certificate?",
    a: "The Postman playlist walks through the certification tasks and ends with claiming the badge. The GitHub course has no exam.",
  },
  {
    q: "I found a mistake in a lesson. What can I do?",
    a: "Open an issue or a pull request on the recode hive repo. Fixing lessons is a good first contribution.",
  },
];

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10m0 0L9 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        d="m5.2 9.3 2.4 2.4 5.2-5.4"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ButtonLink({
  href,
  variant = "primary",
  arrow,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "darkPrimary" | "darkSecondary";
  arrow?: boolean;
  children: ReactNode;
}) {
  const className = `${styles.btn} ${styles[variant]}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  );
  if (isExternal(href)) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={className} to={href}>
      {content}
    </Link>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }
    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateClass =
    state === "hidden"
      ? styles.revealHidden
      : state === "shown"
        ? styles.revealShown
        : "";
  return (
    <div ref={ref} className={`${stateClass} ${className}`.trim()}>
      {children}
    </div>
  );
}

function SectionHead({
  id,
  eyebrow,
  title,
  sub,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.h2}>
        {title}
      </h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
    </div>
  );
}

function Hero() {
  const gitImg = useBaseUrl("/img/courses/git-and-github.jpg");
  const postmanImg = useBaseUrl("/img/courses/postman-api-certification.jpg");
  return (
    <section className={styles.hero} aria-labelledby="courses-hero-title">
      <div className={styles.heroCopy}>
        <span className={styles.pill}>100% free · 2 courses</span>
        <h1 id="courses-hero-title" className={styles.h1}>
          Learn <span className={styles.accent}>GitHub</span> and{" "}
          <span className={styles.accent}>Postman</span>. Free.
        </h1>
        <p className={styles.lede}>
          Two hands-on courses from recode hive. Learn Git and open source with
          videos and written lessons, or work through the Postman API
          certification one task at a time.
        </p>
        <div className={styles.btnRow}>
          <a className={`${styles.btn} ${styles.primary}`} href="#courses">
            Pick a course
            <ArrowIcon />
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href="#syllabus">
            See the lessons
          </a>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <img
          className={`${styles.heroImg} ${styles.heroImgBack}`}
          src={gitImg}
          width={1280}
          height={720}
          alt="Git and GitHub course thumbnail: GitHub for complete beginners"
        />
        <img
          className={`${styles.heroImg} ${styles.heroImgFront}`}
          src={postmanImg}
          width={1280}
          height={720}
          alt="Postman API certification course thumbnail"
        />
        <span className={`${styles.floatBadge} ${styles.badgeFree}`}>Free</span>
        <span className={`${styles.floatBadge} ${styles.badgePostman}`}>
          9 videos
        </span>
        <span className={`${styles.floatBadge} ${styles.badgeGit}`}>
          33 videos
        </span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <ul className={styles.stats} aria-label="Course totals">
      {stats.map((s) => (
        <li key={s.label} className={styles.stat}>
          <span className={styles.statValue}>{s.value}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

type CourseCardProps = {
  img: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  chips: string[];
  points: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

function CourseCard(props: CourseCardProps) {
  const img = useBaseUrl(props.img);
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        <img
          src={img}
          width={1280}
          height={720}
          loading="lazy"
          alt={props.alt}
          className={styles.cardImg}
        />
        <span className={styles.tag}>{props.tag}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.h3}>{props.title}</h3>
        <p className={styles.cardText}>{props.description}</p>
        <ul className={styles.chips}>
          {props.chips.map((c) => (
            <li key={c} className={styles.chip}>
              {c}
            </li>
          ))}
        </ul>
        <ul className={styles.checklist}>
          {props.points.map((p) => (
            <li key={p}>
              <CheckIcon />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className={styles.btnRow}>
          <ButtonLink href={props.primary.href} arrow>
            {props.primary.label}
          </ButtonLink>
          <ButtonLink href={props.secondary.href} variant="secondary">
            {props.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function Courses() {
  return (
    <section
      id="courses"
      className={styles.section}
      aria-labelledby="courses-title"
    >
      <Reveal>
        <SectionHead
          id="courses-title"
          eyebrow="COURSES"
          title="Choose where to start"
          sub="Both courses are free and open to beginners. Pick one, or do them in order."
        />
        <div className={styles.cards}>
          <CourseCard
            img="/img/courses/git-and-github.jpg"
            alt="Git and GitHub course thumbnail: GitHub for complete beginners"
            tag="Beginner"
            title="Git and GitHub"
            description="Learn version control and open source from the first commit to your first pull request, with a video playlist and written lessons for every step."
            chips={["33 videos", "15 written lessons", "Free"]}
            points={[
              "Set up Git and a GitHub account on Windows, Mac or Linux",
              "Create, clone and fork repositories",
              "Make your first open source contribution",
              "Customise your profile and learn about GitHub badges",
            ]}
            primary={{ label: "Start the lessons", href: FIRST_LESSON }}
            secondary={{ label: "Watch the playlist", href: GITHUB_PLAYLIST }}
          />
          <CourseCard
            img="/img/courses/postman-api-certification.jpg"
            alt="Postman API certification course thumbnail"
            tag="Certification"
            title="Postman API certification"
            description="Follow the certification tasks step by step, from your first request to the final test and the badge, with a video for each task."
            chips={["9 videos", "8 tasks", "Free"]}
            points={[
              "Send your first API request",
              "Use request parameters and variables",
              "Send data, then PATCH and DELETE",
              "Finish the final test and claim your badge",
            ]}
            primary={{ label: "Start video 1", href: POSTMAN_PLAYLIST }}
            secondary={{ label: "Watch the playlist", href: POSTMAN_PLAYLIST }}
          />
        </div>
      </Reveal>
    </section>
  );
}

function LessonRow({ lesson }: { lesson: Lesson }) {
  const external = isExternal(lesson.href);
  const inner = (
    <>
      <span className={styles.lessonNum}>{lesson.n}</span>
      <span className={styles.lessonTitle}>{lesson.title}</span>
      <ArrowIcon />
      {external && <span className={styles.srOnly}> (opens in a new tab)</span>}
    </>
  );
  return (
    <li>
      {external ? (
        <a
          className={styles.lesson}
          href={lesson.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        <Link className={styles.lesson} to={lesson.href}>
          {inner}
        </Link>
      )}
    </li>
  );
}

function ModuleCard({ module, wide }: { module: Module; wide?: boolean }) {
  return (
    <section className={`${styles.module} ${wide ? styles.moduleWide : ""}`}>
      <h3 className={styles.moduleTitle}>{module.title}</h3>
      <ul className={styles.lessons}>
        {module.lessons.map((l) => (
          <LessonRow key={l.n} lesson={l} />
        ))}
      </ul>
    </section>
  );
}

const TABS = [
  { id: "github", label: "Git and GitHub" },
  { id: "postman", label: "Postman certification" },
] as const;

function Syllabus() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("github");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[TABS[next].id]?.focus();
  };

  return (
    <section
      id="syllabus"
      className={styles.section}
      aria-labelledby="syllabus-title"
    >
      <Reveal>
        <SectionHead
          id="syllabus-title"
          eyebrow="WHAT IS INSIDE"
          title="Every lesson, in order"
        />
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Choose a course"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              className={`${styles.tab} ${active === t.id ? styles.tabActive : ""}`}
              onClick={() => setActive(t.id)}
              onKeyDown={onKeyDown}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className={styles.modules}
        >
          {active === "github" ? (
            githubModules.map((m) => <ModuleCard key={m.title} module={m} />)
          ) : (
            <ModuleCard module={postmanModule} wide />
          )}
        </div>
      </Reveal>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-title">
      <Reveal>
        <SectionHead
          id="how-title"
          eyebrow="HOW IT WORKS"
          title="Watch, read, then do"
        />
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Reveal>
        <SectionHead id="faq-title" eyebrow="FAQ" title="Common questions" />
        <div className={styles.faq}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`}
              >
                <h3 className={styles.faqHeading}>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className={styles.faqButton}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      {isOpen ? "×" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className={styles.faqPanel}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <Reveal>
        <div className={styles.cta}>
          <div>
            <h2 id="cta-title" className={styles.ctaTitle}>
              Ready to start?
            </h2>
            <p className={styles.ctaText}>
              Open the first GitHub lesson or watch the first Postman video. No
              sign-up needed on this site.
            </p>
          </div>
          <div className={styles.btnRow}>
            <ButtonLink href={FIRST_LESSON} variant="darkPrimary" arrow>
              First GitHub lesson
            </ButtonLink>
            <ButtonLink href={REPO_URL} variant="darkSecondary">
              Star on GitHub
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function CoursesPage(): ReactNode {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Head>
        <meta property="og:title" content={`${PAGE_TITLE} | recode hive`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Head>
      <main className={styles.page}>
        <div className={styles.container}>
          <Hero />
          <Stats />
          <Courses />
          <Syllabus />
          <HowItWorks />
          <Faq />
          <ClosingCta />
        </div>
      </main>
    </Layout>
  );
}
