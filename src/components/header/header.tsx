import React from "react";
import "./header.css";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import FloatingContributors from "../FloatingContributors";
import { useCommunityStatsContext } from "../../lib/statsProvider";

const HeaderStats = () => {
  const {
    githubStarCountText,
    githubContributorsCountText,
    githubForksCountText,
    githubReposCountText,
  } = useCommunityStatsContext();

  const stats = [
    { value: githubStarCountText, label: "stars" },
    { value: githubContributorsCountText, label: "contributors" },
    { value: githubForksCountText, label: "forks" },
    { value: githubReposCountText, label: "projects" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 100,
        delay: 0.4,
      }}
      className="chh__header-stats"
    >
      {stats.map((stat) => (
        <span key={stat.label} className="chh__header-stat">
          <span className="chh__header-stat__value">{stat.value}</span>{" "}
          <span className="chh__header-stat__label">{stat.label}</span>
        </span>
      ))}
    </motion.div>
  );
};

const HeaderContent = () => {
  return (
    <div className="chh__header-content">
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.1,
        }}
      >
        Level Up Skills with
        <br />
        <span className="chh__header-brand">&lt;recode hive/&gt;</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.2,
        }}
      >
        Get started with open-source contributions in an inclusive, worldwide
        community. Earn while learning simpler and more practical.
      </motion.p>

      <div className="chh__header-content__input">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
        >
          <Link
            to="/docs/"
            className="chh__header-content__input--button chh__header-content__input--primary"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
        >
          <Link
            to="/courses"
            className="chh__header-content__input--button chh__header-content__input--secondary"
          >
            Browse Courses
          </Link>
        </motion.div>
      </div>

      <HeaderStats />
    </div>
  );
};

const HeaderToaster = () => {
  return (
    <motion.div
      initial={{ scale: 0, x: 10 }}
      whileInView={{ scale: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      }}
      className="chh__header-image"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        width: "100%",
      }}
    >
      {/* Render the FloatingContributors component as the header toaster */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <FloatingContributors headerEmbedded={true} />
      </div>
    </motion.div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="chh__header--body">
      <div className="chh__header">
        <HeaderContent />
        <HeaderToaster />
      </div>
    </div>
  );
};

export default Header;
