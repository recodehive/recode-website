import React from "react";
import Link from "@docusaurus/Link";
import * as FramerMotion from "framer-motion";
import ParticlesComponent from "../particle";
import FloatingContributors from "../FloatingContributors";
import "./hero.css";

type MotionPrimitive = React.ComponentType<Record<string, unknown>>;
type MotionProxy = {
  h1: MotionPrimitive;
  p: MotionPrimitive;
  div: MotionPrimitive;
};

const motion = (FramerMotion as unknown as Record<string, unknown>)[
  "motion"
] as MotionProxy;

const HeroContent = () => {
  return (
    <div className="chh__hero-content">
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
        Level Up Skills with <br /> recode hive
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
        style={{ textAlign: "center" }}
      >
        <strong>recode hive</strong> helps you get started with open-source
        contributions. We’ve built an inclusive community with people from
        around the world. Join us to earn while learning .<br />
        <span style={{ color: "#e44d26", fontWeight: "bold" }}>
          everything made simpler and more practical.
        </span>
        <br></br>
        <br></br>
      </motion.p>

      <div className="chh__hero-content__input">
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
          style={{ flex: 1 }}
        >
          <Link
            to="/get-started/"
            className="chh__hero-content__input--button"
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
          style={{ flex: 1 }}
        >
          <Link to="/courses" className="chh__hero-content__input--button">
            Courses
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const HeroToaster = () => {
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
      className="chh__hero-image"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        width: "100%",
      }}
    >
      {/* Render the FloatingContributors component as the hero toaster */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <FloatingContributors heroEmbedded={true} />
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="chh__hero--body">
      <div className="chh__hero">
        <HeroContent />
        <HeroToaster />
      </div>
    </div>
  );
};

export default Hero;