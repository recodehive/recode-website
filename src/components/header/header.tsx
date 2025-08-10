import React from "react";
import "./header.css";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import ParticlesComponent from "../particle";
import FloatingContributors from "../FloatingContributors";

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
        className="gradient__text"
      >
        <ParticlesComponent />
        Level Up Skills with <br /> Recode Hive
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
        Recode Hive helps you get started with open-source contributions. We’ve built an
        inclusive community with people from around the world. Join us to earn while
        learning — everything made simpler and more practical.
      </motion.p>

      <div className="chh__header-content__input">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
          type="button"
        >
          <Link to="/get-started/" className="chh__header-content__input--link">
            Get Started
          </Link>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          type="button"
        >
          <Link to="/courses" className="chh__header-content__input--link">
            Courses
          </Link>
        </motion.button>
      </div>
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
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        width: '100%'
      }}
    >
      {/* Render the FloatingContributors component as the header toaster */}
      <div style={{
        position: 'relative',
        zIndex: 1
      }}>
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
