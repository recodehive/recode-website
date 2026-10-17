import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

type Props = {
  avatarSrc?: string;
  kicker?: string;
  bookingUrl?: string;
  blogUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

const STACK = ["SQL", "Power BI", "Azure", "Spark", "Python", "dbt", "Jira"];

export default function FounderSection({
  avatarSrc = "/img/memoji.png",
  kicker = "A Data Engineer who",
  bookingUrl = "https://topmate.io/sanjaykv",
  blogUrl = "/blogs",
  portfolioUrl = "https://www.sanjaykv.com/",
  githubUrl = "https://github.com/sanjay-kv",
  linkedinUrl = "https://www.linkedin.com/in/sanjay-k-v/",
}: Props) {
  const avatar = useBaseUrl(avatarSrc);
  return (
    <section className={styles.section} aria-labelledby="founder-heading">
      <div className="rh-container">
        <div className={styles.card}>
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.halo} aria-hidden="true" />

          <div className={styles.inner}>
            <div className={styles.intro}>
              <div className={styles.avatarRing}>
                <img
                  src={avatar}
                  alt="Memoji of Sanjay Viswanathan looking over a laptop"
                  className={styles.avatar}
                />
              </div>

              <div className={styles.text}>
                <p className={styles.path}>~/about/founder</p>
                <p className={styles.hello}>
                  Hello! I am{" "}
                  <span className={styles.blue}>Sanjay Viswanathan</span>
                </p>
                <div className={styles.headGroup}>
                  <p className={styles.kicker}>{kicker}</p>
                  <h2 id="founder-heading" className={styles.headline}>
                    Judges a book by its{" "}
                    <span className={styles.cover}>
                      cover
                      <svg
                        className={styles.ellipse}
                        viewBox="0 0 240 90"
                        preserveAspectRatio="none"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M30 20 C90 2, 210 6, 230 38 C246 70, 150 88, 80 84 C20 80, 0 58, 14 36 C24 22, 52 14, 70 12" />
                      </svg>
                    </span>
                    ...
                  </h2>
                </div>
                <p className={styles.sub}>
                  Because if the cover does not impress you, what else can?
                </p>
                <div className={styles.actions}>
                  <a
                    className={styles.btnBlue}
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a 1:1 <span aria-hidden="true">→</span>
                  </a>
                  <Link className={styles.btnGhost} to={blogUrl}>
                    Read my blog
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.term}>
              <div className={styles.termBar}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.termTitle}>sanjay@recodehive: ~</span>
              </div>
              <div className={styles.termBody}>
                <div>
                  <span className={styles.prompt}>$</span>{" "}
                  <span className={styles.cmd}>whoami</span>
                  <br />
                  <span className={styles.out}>
                    Sanjay, founder of recode hive
                  </span>
                </div>
                <div>
                  <span className={styles.prompt}>$</span>{" "}
                  <span className={styles.cmd}>focus --now</span>
                  <br />
                  <span className={styles.out}>
                    Business analysis, program delivery, data
                  </span>
                </div>
                <div className={styles.stackBlock}>
                  <div>
                    <span className={styles.prompt}>$</span>{" "}
                    <span className={styles.cmd}>stack --top</span>
                  </div>
                  <ul className={styles.chips} aria-label="Top skills">
                    {STACK.map((s) => (
                      <li key={s} className={styles.chip}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className={styles.prompt}>$</span>{" "}
                  <span className={styles.cmd}>links</span>
                  <br />
                  <a
                    className={styles.link}
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sanjaykv.com
                  </a>
                  <span className={styles.sep}> · </span>
                  <a
                    className={styles.link}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <span className={styles.sep}> · </span>
                  <a
                    className={styles.link}
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
