import React from "react";
import styles from "./styles.module.css";

type Stats = {
  stars: number;
  projects: number;
  contributors: number;
  forks: number;
};

const COLS = 24;
const ROWS = 4;
const LEVELS = [styles.lv0, styles.lv1, styles.lv2, styles.lv3, styles.lv4];
// Deterministic pattern (same on server and client, no hydration mismatch)
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const v =
    Math.abs(Math.sin((r + 3) * 12.9898 + (c + 5) * 78.233) * 43758.5453) % 1;
  return Math.min(4, Math.floor(v * 3.2 + (c / (COLS - 1)) * 1.8));
});

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const StarIcon = () => (
  <Icon>
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </Icon>
);
const ProjectIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 12h8M12 8v8" />
  </Icon>
);
const PeopleIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14.6c2.7-.2 5 1.5 5.5 4.4" />
  </Icon>
);
const ForkIcon = () => (
  <Icon>
    <circle cx="6" cy="5" r="2" />
    <circle cx="18" cy="5" r="2" />
    <circle cx="12" cy="19" r="2" />
    <path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" />
  </Icon>
);

function StatCard({
  value,
  label,
  rest,
  icon,
}: {
  value: number;
  label: string;
  rest: string;
  icon: React.ReactNode;
}) {
  return (
    <article className={`${styles.card} ${styles.stat}`}>
      <span className={styles.ico}>{icon}</span>
      <p className={styles.num}>
        {value}
        <span className={styles.up} aria-hidden="true">
          ↗
        </span>
      </p>
      <p className={styles.caption}>
        <strong>{label}</strong> {rest}
      </p>
    </article>
  );
}

export default function CommunityStats({
  stats,
  githubUrl = "https://github.com/recodehive",
}: {
  stats: Stats;
  githubUrl?: string;
}) {
  return (
    <section className={styles.section} aria-labelledby="community-heading">
      <div className="rh-container">
        <div className={styles.header}>
          <div className={styles.headText}>
            <p className={styles.eyebrow}>✦ Community</p>
            <h2 id="community-heading" className={styles.title}>
              Discover the strength of our amazing community
            </h2>
          </div>
          <span className={styles.live}>
            <span className={styles.liveDot} aria-hidden="true" />
            Live from GitHub
          </span>
        </div>

        <div className={styles.grid}>
          <StatCard
            value={stats.stars}
            label="GitHub stars"
            rest="across our repositories, a sign of community support."
            icon={<StarIcon />}
          />
          <StatCard
            value={stats.projects}
            label="Live public projects"
            rest="built through open-source collaboration."
            icon={<ProjectIcon />}
          />
          <StatCard
            value={stats.contributors}
            label="Contributors"
            rest="who made our repositories and community better."
            icon={<PeopleIcon />}
          />
          <StatCard
            value={stats.forks}
            label="Forks"
            rest="of our repositories, as the community extends and builds on our work."
            icon={<ForkIcon />}
          />

          <article className={`${styles.card} ${styles.tile}`}>
            <div className={styles.cells} aria-hidden="true">
              {CELLS.map((lv, i) => (
                <span key={i} className={`${styles.cell} ${LEVELS[lv]}`} />
              ))}
            </div>
            <div className={styles.tileBody}>
              <span className={styles.tileLink}>github.com/recodehive</span>
              <p className={styles.tileText}>
                Our developers are the core of recode hive: contributors and
                maintainers powering our growth.
              </p>
              <a
                className={styles.btn}
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore our GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
