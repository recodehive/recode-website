import React, { useEffect, useState } from "react";
import Head from "@docusaurus/Head";
import { motion, HTMLMotionProps } from "framer-motion";
import type { ReactElement } from "react";
import Layout from "@theme/Layout";
import { useColorMode } from "@docusaurus/theme-common";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// Safe hook for color mode that handles SSR
function useSafeColorMode() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let colorMode = "light";
  let isDark = false;

  if (mounted && ExecutionEnvironment.canUseDOM) {
    try {
      const {
        useColorMode: useColorModeHook,
      } = require("@docusaurus/theme-common");
      const colorModeResult = useColorModeHook();
      colorMode = colorModeResult.colorMode;
      isDark = colorMode === "dark";
    } catch (error) {
      console.warn("Failed to get color mode:", error);
    }
  }

  return { colorMode, isDark, mounted };
}
import styles from "./github-badges.module.css";

type MotionDivProps = HTMLMotionProps<"div">;
type MotionTrProps = HTMLMotionProps<"tr">;

import Link from "@docusaurus/Link";

const GithubBadgesContent = (): React.ReactElement => {
  const { colorMode, isDark, mounted } = useSafeColorMode();

  // Scroll to top button logic
  useEffect(() => {
    const scrollToTopBtn = document.getElementById("scrollToTop");
    const handleScroll = () => {
      if (!scrollToTopBtn) return;
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
      // Progress bar logic
      const progressBar = document.getElementById("progressBar");
      if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout
      title="GitHub Achievements Guide - recode hive"
      description="Complete guide to GitHub achievements and badges. Learn how to unlock and showcase your GitHub contributions with the recode hive community."
    >
      <div
        className={`${styles["github-badges-page"]} transition-colors duration-300 ${
          isDark ? "dark-bg-primary dark-text-primary" : "bg-white text-black"
        }`}
      >
        {/* Hero section */}
        <Head>
          <title>GitHub Achievements Guide - recode hive</title>
          <meta
            name="description"
            content="Complete guide to GitHub achievements and badges. Learn how to unlock and showcase your GitHub contributions with the recode hive community."
          />
          <meta
            name="keywords"
            content="GitHub, badges, achievements, recode hive, open source, contributors, programming"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        {/* Main content */} {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={styles.heroBanner}
        >
          <div className={styles.heroContent}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.logoSection}
            >
              <div className={styles.recodeLogoContainer}>
                <span className={styles.recodeText}>recode</span>
                <span className={styles.hiveText}>hive</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={styles.heroTitle}
            >
              🏆 GitHub Achievement Badges 🏆
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className={styles.heroDescription}
            >
              Unlock and showcase your GitHub achievements! Join the recode hive
              community and earn badges that highlight your contributions to the
              open source ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className={styles.badgeStats}
            >
              <div className={styles.statItem}>
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Available Badges</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5K+</div>
                <div className={styles.statLabel}>Community Members</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free Resources</div>
              </div>
            </motion.div>
          </div>

          <div className={styles.heroVisual}>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={styles.floatingBadge}
            >
              🥇
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, -3, 3, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className={styles.floatingBadge}
            >
              ⭐
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className={styles.floatingBadge}
            >
              🏅
            </motion.div>
          </div>
        </motion.div>
        {/* Achievement List Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={styles.achievementSection}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              🎯 Complete Achievement Guide
            </h2>
            <p className={styles.sectionSubtitle}>
              Master these challenges to earn exclusive GitHub badges and
              showcase your expertise
            </p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.achievementsTable}>
              <thead>
                <tr>
                  <th>Badge</th>
                  <th>Name</th>
                  <th>How to get</th>
                  <th>
                    Needed Amount
                    <br />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Starstruck */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
                      alt="Starstruck"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Starstruck</td>
                  <td>
                    Create a repository with a lot of stars.
                    <br />
                    <a
                      href="https://github.com/sanjay-kv/Open-source-Practice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sample repo
                    </a>
                    <br />
                    If you get the first 16 stars you will unlock the badge.
                    <br />
                    <a
                      href="https://youtu.be/v2Pai1TY_Lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <div className={styles.badgeLevels}>
                      <div className={styles.levelText}>
                        Levels: Default, Bronze, Silver, Gold
                      </div>
                      <div className={styles.levelImages}>
                        <img
                          src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
                          alt="Starstruck Default"
                          title="Default (16)"
                          className={styles.badgeImgSmall}
                        />
                        <img
                          src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-bronze.png"
                          alt="Starstruck Bronze"
                          title="Bronze (128)"
                          className={styles.badgeImgSmall}
                        />
                        <img
                          src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-silver.png"
                          alt="Starstruck Silver"
                          title="Silver (512)"
                          className={styles.badgeImgSmall}
                        />
                        <img
                          src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-gold.png"
                          alt="Starstruck Gold"
                          title="Gold (4096)"
                          className={styles.badgeImgSmall}
                        />
                      </div>
                      <div className={styles.neededAmount}>
                        Needed: 16, 128, 512, 4096
                      </div>
                    </div>
                  </td>
                </motion.tr>
                {/* Quickdraw */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
                      alt="Quickdraw"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Quickdraw</td>
                  <td>
                    Gitty up!
                    <br />
                    If you closed an issue / pull request within 5 minutes of
                    opening you will unlock this badge
                  </td>
                  <td>
                    <div className={styles.singleBadge}>
                      <div className={styles.levelText}>Level: Default</div>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone1.png"
                        alt="Quickdraw Default"
                        className={styles.badgeImgSmall}
                      />
                      <div className={styles.neededAmount}>Needed: 1</div>
                    </div>
                  </td>
                </motion.tr>
                {/* Pair Extraordinaire */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png"
                      alt="Pair Extraordinaire"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Pair Extraordinaire</td>
                  <td>
                    Coauthored commits on merged pull request
                    <br />
                    Requirement: VSCode IDE (bit difficult to get)
                    <br />
                    You can raise a sample PR{" "}
                    <a
                      href="https://github.com/recodehive/Opensource-practice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>{" "}
                    by adding to the existing readme file and tag{" "}
                    <b>@sanjay-kv</b>
                    <br />
                    <a
                      href="https://youtu.be/BNKSlT8jLQ0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <b>Needed:</b> 1, 10, 24, 48
                    <br />
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pair-Extraordinaire/PNG/PairExtraordinaire.png"
                        alt="Starstruck Default"
                        title="Default (16)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pair-Extraordinaire/PNG/PairExtraordinaire_Bronze.png"
                        alt="Starstruck Bronze"
                        title="Bronze (128)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pair-Extraordinaire/PNG/PairExtraordinaire_Silver.png"
                        alt="Starstruck Silver"
                        title="Silver (512)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pair-Extraordinaire/PNG/PairExtraordinaire_Gold.png"
                        alt="Starstruck Gold"
                        title="Gold (4096)"
                        className={styles.badgeImgSmall}
                      />
                    </div>
                    <b>Levels:</b> Default, Bronze, Silver, Gold
                  </td>
                </motion.tr>
                {/* Pull Shark */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png"
                      alt="Pull Shark"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Pull Shark</td>
                  <td>
                    Opened a pull request and it should be merged
                    <br />
                    You can raise a sample PR{" "}
                    <a
                      href="https://github.com/recodehive/resume-pitch"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>{" "}
                    by adding on existing readme file and tag <b>@sanjay-kv</b>
                    <br />
                    <a
                      href="https://youtu.be/7uKMWBFN2jQ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <b>Needed:</b> 2, 16, 128, 1024
                    <br />
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pull-Shark/PNG/PullShark.png"
                        alt="Starstruck Default"
                        title="Default (16)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pull-Shark/PNG/PullShark_Bronze.png"
                        alt="Starstruck Bronze"
                        title="Bronze (128)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pull-Shark/PNG/PullShark_Silver.png"
                        alt="Starstruck Silver"
                        title="Silver (512)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Pull-Shark/PNG/PullShark_Gold.png"
                        alt="Starstruck Gold"
                        title="Gold (4096)"
                        className={styles.badgeImgSmall}
                      />
                    </div>
                    <b>Levels:</b> Default, Bronze, Silver, Gold
                  </td>
                </motion.tr>
                {/* Galaxy Brain */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png"
                      alt="Galaxy Brain"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Galaxy Brain</td>
                  <td>
                    Answered a discussion and someone marked your reply as
                    answer
                    <br />
                    You can answer some of the discussions{" "}
                    <a
                      href="https://github.com/orgs/recodehive/discussions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    <br />
                    <a
                      href="https://youtu.be/v2Pai1TY_Lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <b>Needed:</b> 2, 8, 16, 32
                    <br />
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Galaxy-Brain/PNG/GalaxyBrain.png"
                        alt="Starstruck Default"
                        title="Default (16)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Galaxy-Brain/PNG/GalaxyBrain_Bronze.png"
                        alt="Starstruck Bronze"
                        title="Bronze (128)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Galaxy-Brain/PNG/GalaxyBrain_Silver.png"
                        alt="Starstruck Silver"
                        title="Silver (512)"
                        className={styles.badgeImgSmall}
                      />
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Galaxy-Brain/PNG/GalaxyBrain_Gold.png"
                        alt="Starstruck Gold"
                        title="Gold (4096)"
                        className={styles.badgeImgSmall}
                      />
                    </div>
                    <b>Levels:</b> Default, Bronze, Silver, Gold
                  </td>
                </motion.tr>
                {/* YOLO */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png"
                      alt="YOLO"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>YOLO</td>
                  <td>
                    Merged a pull request without a review
                    <br />
                    You can raise a PR{" "}
                    <a
                      href="https://github.com/recodehive/machine-learning-repos"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    <br />
                    <a
                      href="https://youtu.be/GnHNScuGKrg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <div className={styles.singleBadge}>
                      <div className={styles.levelText}>Level: Default</div>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/YOLO/PNG/YOLO_Badge.png"
                        alt="Starstruck Default"
                        title="Default (16)"
                        className={styles.badgeImgSmall}
                      />
                      <div className={styles.neededAmount}>Needed: 1</div>
                    </div>
                  </td>
                </motion.tr>
                {/* Public Sponsor */}
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <td>
                    <motion.img
                      src="https://github.githubassets.com/images/modules/profile/achievements/public-sponsor-default.png"
                      alt="Public Sponsor"
                      className={styles.badgeImgSmall}
                      whileHover={{ scale: 1.13, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </td>
                  <td>Public Sponsor</td>
                  <td>
                    GitHub Sponsors.
                    <br />
                    <a
                      href="https://github.com/sponsors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Sponsors
                    </a>
                    <br />
                    <a
                      href="https://youtu.be/dcdpkD7lYDg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch the Video Tutorial
                    </a>
                  </td>
                  <td>
                    <div className={styles.singleBadge}>
                      <div className={styles.levelText}>Level: Default</div>
                      <img
                        src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/GitHub-Sponsor/PNG/GitHubSponsorBadge.png"
                        alt="Starstruck Default"
                        title="Default (16)"
                        className={styles.badgeImgSmall}
                      />
                      <div className={styles.neededAmount}>Needed: 1</div>
                    </div>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>
        </motion.section>
        <motion.h2
          className={styles.skinHeading}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          Achievement Skin Tone{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </motion.h2>
        <p className={styles.paragraph} style={{ textAlign: "center" }}>
          Some achievements' appearance depends on your Emoji Skin Tone
          Preference.
          <br />
          You can change your preferred Skin Tone by going to
          <a
            href="https://github.com/settings/appearance"
            target="_blank"
            rel="noopener noreferrer"
          >
            appearance settings
          </a>
          .
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.skinToneTable}>
            <thead>
              <tr>
                <th>Badge</th>
                <th>Name</th>
                <th colSpan={6}>Skin Tone Versions</th>
              </tr>
              <tr>
                {/* <td></td><td></td> */}
                {/* <th>Default</th><th>Light</th><th>Medium-Light</th><th>Medium</th><th>Medium-Dark</th><th>Dark</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
                    alt="Starstruck"
                    className={styles.badgeImgSmall}
                  />
                </td>
                <td>Starstruck</td>
                <td>
                  <img
                    src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone2.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏻
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone3.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏼
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone4.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏽
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone5.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏾
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone6.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏿
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
                    alt="Quickdraw"
                    className={styles.badgeImgSmall}
                  />
                </td>
                <td>Quickdraw</td>
                <td>
                  <img
                    src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone2.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏻
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone3.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏼
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone4.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏽
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone5.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏾
                </td>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone6.png"
                    className={styles.badgeImgSmall}
                  />{" "}
                  👋🏿
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <motion.h2
          className={styles.highlightsHeading}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          ✨ Highlights Badges ✨
        </motion.h2>
        <div className={styles.tableWrapper}>
          <table className={styles.highlightsTable}>
            <thead>
              <tr>
                <th>Badge</th>
                <th>Name</th>
                <th>How to get</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>⭐</td>
                <td>Pro</td>
                <td>
                  Pay for{" "}
                  <a
                    href="https://github.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Pro
                  </a>{" "}
                  or if you are student get it free:{" "}
                  <a
                    href="https://youtu.be/knr5gBv-c9c"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </td>
              </tr>
              <tr>
                <td>📋</td>
                <td>Developer Program Member</td>
                <td>
                  Be a registered member of the{" "}
                  <a
                    href="https://github.com/developers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Developer Program
                  </a>
                </td>
              </tr>
              <tr>
                <td>🔒</td>
                <td>Security Bug Bounty Hunter</td>
                <td>
                  Helped out hunting down security vulnerabilities at{" "}
                  <a
                    href="https://bounty.github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Security
                  </a>
                </td>
              </tr>
              <tr>
                <td>🎓</td>
                <td>GitHub Campus Expert</td>
                <td>
                  Participate in the{" "}
                  <a
                    href="https://education.github.com/experts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Campus Program
                  </a>
                </td>
              </tr>
              <tr>
                <td>⚠️</td>
                <td>Security advisory credit</td>
                <td>
                  Have your security advisory submitted to the{" "}
                  <a
                    href="https://github.com/advisories"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Advisory Database
                  </a>{" "}
                  accepted
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <motion.h2
          className={styles.retiredHeading}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          ❌ Badges no longer earnable ❌
        </motion.h2>
        <div className={styles.tableWrapper}>
          <table className={styles.retiredTable}>
            <thead>
              <tr>
                <th>Badge</th>
                <th>Name</th>
                <th>How to get</th>
                <th>Needed Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Mars-2020-Contributor/PNG/Mars2020ContributorBadge.png"
                    alt="Mars 2020 Contributor"
                    className={styles.badgeImgSmall}
                  />
                </td>
                <td>Mars 2020 Contributor</td>
                <td>
                  Contributed code to a repository used in the{" "}
                  <a
                    href="https://github.com/readme/featured/nasa-ingenuity-helicopter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mars 2020 Helicopter Mission
                  </a>
                </td>
                <td>
                  <div className={styles.neededBox}>
                    <div className={styles.neededLabel}>DEFAULT</div>
                    <img
                      src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/Mars-2020-Contributor/PNG/Mars2020ContributorBadge.png"
                      alt="Mars 2020 Contributor"
                      className={styles.badgeImgSmall}
                    />
                    <div>1</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/2020-Arctic-Code-Vault-Contributor/PNG/2020ArcticCodeVaultBadge.png"
                    alt="Arctic Code Vault Contributor"
                    className={styles.badgeImgSmall}
                  />
                </td>
                <td>Arctic Code Vault Contributor</td>
                <td>
                  Contributed code to a repository in the{" "}
                  <a
                    href="https://archiveprogram.github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    2020 GitHub Archive Program
                  </a>
                </td>
                <td>
                  <div className={styles.neededBox}>
                    <div className={styles.neededLabel}>DEFAULT</div>
                    <img
                      src="https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/2020-Arctic-Code-Vault-Contributor/PNG/2020ArcticCodeVaultBadge.png"
                      alt="Arctic Code Vault Contributor"
                      className={styles.badgeImgSmall}
                    />
                    <div>1</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>{" "}
        <hr className={styles.hr} />
        <div style={{ textAlign: "center" }}>
          <h2 className={styles.subheading}>🛈 More Information 🛈</h2>
          <p className={styles.paragraph}>
            You can find more information about GitHub Badges under this{" "}
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              link
            </a>
          </p>
        </div>
        <div
          className={styles.certificationHero}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "100px",
            flexWrap: "wrap",
            borderRadius: "24px",
            padding: "32px",
            width: "100%",
            maxWidth: "100vw",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{ margin: 0 }}>Showcase your expertise with GitHub</h1>
            {/* <p style={{ fontSize: "1.2rem", margin: "16px 0", color: "#000" }}>s
          Getting GitHub certified is a strong endorsement of your skills and knowledge of the technologies and developer tools used by millions of developers worldwide.
            </p> */}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              minWidth: 220,
              borderRadius: "20px",
            }}
          >
            <img
              src="https://images.ctfassets.net/wfutmusr1t3h/6eWM76bx8skN2B4Jpvkcil/3ccdafea4229f02802abbd9fc6634a3b/Certifiedtocat_full__2_.svg?w=1280&q=75"
              alt="GitHub Certification"
              style={{
                maxHeight: "320px",
                width: "auto",
                borderRadius: "20px",
                maxWidth: "100%",
                objectFit: "contain",
                background: "#f6f8fa",
                padding: "8px",
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: "1.2rem",
                margin: "16px 0",
                color: "#000",
                textAlign: "left",
              }}
            >
              Getting GitHub certified is a strong endorsement of your skills
              and knowledge of the technologies and developer tools used by
              millions of developers worldwide.
            </p>
          </div>
        </div>
        <div className={styles.certificationCards}>
          <motion.div
            className={`${styles.certCard}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.cardContent}>
              <h2>GitHub Foundations</h2>
              <p>
                Highlight your understanding of the foundational topics and
                concepts of collaborating, contributing, and working on GitHub.
                This exam covers collaboration, GitHub products, Git basics, and
                working within GitHub repositories.
              </p>
              <a
                href="https://examregistration.github.com/waitlist/foundations"
                className={styles.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prepare for the GitHub Foundations exam
              </a>
            </div>
            <div className={styles.certBadge}>
              <img
                src="https://images.ctfassets.net/wfutmusr1t3h/1GLjOPbAzxSyIZy7Cvu2Do/4220986cedca60a0cb3eaa1ed21ca5fc/foundations-river-image__1_.png?w=1280&q=75"
                alt="GitHub Foundations Badge"
                style={{ borderRadius: "30px" }}
              />
            </div>
          </motion.div>

          <motion.div
            className={`${styles.certCard}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.certBadge}>
              <img
                src="https://images.ctfassets.net/wfutmusr1t3h/7xYtTWmQ24xRlS68Do9qiG/a785c50083a579f2530863c230198e98/actions-river-image__1_.png?w=1280&q=75"
                alt="GitHub Actions Badge"
                style={{ borderRadius: "30px" }}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>GitHub Actions</h2>
              <p>
                Certify your proficiency in automating workflows and
                accelerating development with GitHub Actions. Test your skills
                in streamlining workflows, automating tasks, and optimizing
                software pipelines, including CI/CD—all within customizable
                workflows.
              </p>
              <a
                href="https://examregistration.github.com/waitlist/actions"
                className={styles.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prepare for the GitHub Actions exam
              </a>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.certCard}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.cardContent}>
              <h2>GitHub Advanced Security</h2>
              <p>
                Highlight your code security knowledge with the GitHub Advanced
                Security certification. Validate your expertise in vulnerability
                identification, workflow security, and robust security
                implementation—elevating software integrity standards.
              </p>
              <a
                href="https://examregistration.github.com/waitlist/security"
                className={styles.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prepare for the GitHub Advanced Security exam
              </a>
            </div>
            <div className={styles.certBadge}>
              <img
                src="https://images.ctfassets.net/wfutmusr1t3h/1GLjOPbAzxSyIZy7Cvu2Do/4220986cedca60a0cb3eaa1ed21ca5fc/foundations-river-image__1_.png?w=1280&q=75"
                alt="GitHub Advanced Security Badge"
                style={{ borderRadius: "30px" }}
              />
            </div>
          </motion.div>

          <motion.div
            className={`${styles.certCard}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.certBadge}>
              <img
                src="https://images.ctfassets.net/wfutmusr1t3h/1GLjOPbAzxSyIZy7Cvu2Do/4220986cedca60a0cb3eaa1ed21ca5fc/foundations-river-image__1_.png?w=1280&q=75"
                alt="GitHub Administration Badge"
                style={{ borderRadius: "30px" }}
              />
            </div>
            <div className={styles.cardContent}>
              <h2>GitHub Administration</h2>
              <p>
                Certify your ability to optimize and manage a healthy GitHub
                environment with the GitHub Admin exam. Highlight your expertise
                in repository management, workflow optimization, and efficient
                collaboration to support successful projects on GitHub.
              </p>
              <a
                href="https://examregistration.github.com/waitlist/admin"
                className={styles.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prepare for the GitHub Administration exam
              </a>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.certCard}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={styles.cardContent}>
              <h2>GitHub Copilot</h2>
              <p>
                The GitHub Copilot certification exam evaluates your skill in
                using the AI-driven code completion tool in various programming
                languages, certifying your capability to optimize software
                development workflows efficiently.
              </p>
              <a
                href="https://examregistration.github.com/waitlist/copilot"
                className={styles.certLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coming Soon! Join the waitlist now for priority access
              </a>
            </div>
            <div className={styles.certBadge}>
              <img
                src="https://images.ctfassets.net/wfutmusr1t3h/KdVTNopvz0GZy60xzXCq0/86148a36ddf27ea1d22226f0113b8711/admin-river-image__1_.png?w=1280&q=75"
                alt="GitHub Copilot Badge"
                style={{ borderRadius: "50px" }}
              />
            </div>{" "}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const GithubBadges = (): React.ReactElement => {
  return <GithubBadgesContent />;
};

export default GithubBadges;
