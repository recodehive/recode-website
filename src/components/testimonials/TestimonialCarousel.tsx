import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./testimonials.module.css";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  github: string; // GitHub handle, used for the profile link
}

// --- Data ---
// Order matters: the first column gets entries 1 and 3, the second column gets 2 and 4.
// An entry with an empty `text` is not shown, so placeholder copy never reaches the page.
// Add a new entry here (name, role, image, github and a real quote) to show another card.
export const testimonials: Testimonial[] = [
  {
    text: "You are constantly inspiring me to keep applying for jobs. The mentorship helped me take my resume to a 90+ ATS score and rebuild my LinkedIn profile.",
    image: "https://github.com/iitzIrFan.png",
    name: "Irfan",
    role: "Recode Hive Contributor",
    github: "iitzIrFan",
  },
  {
    text: "Pointing out that my contributions all pointed back to my personal projects was an eye opener, especially now that I want to start building in open source.",
    image: "https://github.com/codewithdhruba01.png",
    name: "Dhruba",
    role: "Recode Hive Contributor",
    github: "codewithdhruba01",
  },
];

const GOOD_FIRST_ISSUES =
  "https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22";

const visible = testimonials.filter((t) => t.text.trim() !== "");
const col1 = visible.filter((_, i) => i % 2 === 0);
const col2 = visible.filter((_, i) => i % 2 === 1);

const GithubMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

// --- Vertical scrolling column (same linear loop as before) ---
function TestimonialsColumn({
  testimonialsList,
  className,
  duration = 15,
}: {
  testimonialsList: Testimonial[];
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  const cardHeight = 216;
  const gap = 20;
  const itemHeight = cardHeight + gap;
  const cycleHeight = testimonialsList.length * itemHeight;
  const offset = itemHeight / 2;

  if (testimonialsList.length === 0) return null;

  return (
    <div className={`${styles.column} ${className || ""}`}>
      <motion.ul
        initial={{ y: reduceMotion ? 0 : -offset }}
        animate={reduceMotion ? { y: 0 } : { y: -offset - cycleHeight }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className={styles.list}
        style={{ gap: `${gap}px` }}
      >
        {(reduceMotion ? [0] : [0, 1]).map((index) => (
          <React.Fragment key={index}>
            {testimonialsList.map(({ text, image, name, role, github }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className={styles.card}
                style={{ height: `${cardHeight}px`, minHeight: `${cardHeight}px` }}
              >
                <blockquote className={styles.quoteBlock}>
                  <p className={styles.quote}>{text}</p>
                </blockquote>
                <footer className={styles.person}>
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={`Avatar of ${name}`}
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <div className={styles.personText}>
                    <cite className={styles.name}>{name}</cite>
                    <span className={styles.role}>{role}</span>
                  </div>
                  <a
                    className={styles.gh}
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on GitHub`}
                    tabIndex={index === 1 ? -1 : 0}
                  >
                    <GithubMark />
                  </a>
                </footer>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

// --- Main component ---
export function TestimonialCarousel() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={styles.header}
      >
        <motion.p custom={0} variants={revealVariants} className={styles.eyebrow}>
          ✦ TESTIMONIALS
        </motion.p>
        <motion.h2
          id="testimonials-heading"
          custom={1}
          variants={revealVariants}
          className={styles.h2}
        >
          Builders <span aria-label="love">&hearts;</span> Recode Hive
        </motion.h2>
        <motion.p custom={2} variants={revealVariants} className={styles.sub}>
          What contributors say after shipping real work with the hive.
        </motion.p>
      </motion.div>

      {/* 2-column vertical scroll */}
      <div className={styles.window}>
        <TestimonialsColumn testimonialsList={col1} duration={11} />
        <TestimonialsColumn testimonialsList={col2} className={styles.hideSm} duration={13} />
      </div>

      <div className={styles.ctaRow}>
        <div className={styles.cta}>
          <p className={styles.ctaEyebrow}>✦ YOUR STORY NEXT</p>
          <p className={styles.ctaTitle}>Ship your first PR and tell us what changed for you.</p>
          <a className={styles.ctaBtn} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
            Find a good first issue <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
