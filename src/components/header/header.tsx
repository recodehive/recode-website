import React, { useEffect, useRef } from "react";
import "./header.css";
import Link from "@docusaurus/Link";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import ParticlesComponent from "../particle";

declare global {
  interface HTMLImageElement {
    vanillaTilt?: {
      destroy: () => void;
    };
  }
}

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

const HeaderImage = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      VanillaTilt.init(imgRef.current, {
        max: 25,
        speed: 50,
        glare: true,
        "max-glare": 0.5,
      });
    }

    return () => {
      if (imgRef.current?.vanillaTilt) {
        imgRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, x: 10 }}
      whileInView={{ scale: 0.8, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      }}
      className="chh__header-image"
    >
      <img
        src="/img/hero-img-01.gif"
        alt="Animated illustration of Recode Hive learning"
        className="float-animation"
        data-tilt
        ref={imgRef}
      />
    </motion.div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="chh__header--body">
      <div className="chh__header">
        <HeaderContent />
        <HeaderImage />
      </div>
    </div>
  );
};

export default Header;
