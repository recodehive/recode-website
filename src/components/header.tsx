import React, { useEffect, useRef } from "react";
import "./header.css"; // Importing styles from external CSS file
import Link from "@docusaurus/Link"; // Importing Link component from Docusaurus
import VanillaTilt from "vanilla-tilt"; // Importing VanillaTilt for image tilt effect
import { motion } from "framer-motion"; // Importing motion components from Framer Motion
import ParticlesComponent from "./particle";// Importing custom ParticlesComponent

declare global {
  interface HTMLImageElement {
    vanillaTilt?: {
      destroy: () => void;
    };
  }
}

/**
 * Renders the header content section of the application.
 * Includes a title, description, and buttons for navigation.
 * @returns JSX element representing the header content.
 */
const HeaderContent = () => {
  return (
    <div className="chh__header-content">
      {/* Title with animated text gradient and particles effect */}
      <motion.h1
        initial={{ opacity: 0, x: -10 }} // Initial animation properties
        whileInView={{ opacity: 1, x: 0 }} // Animation while in view
        viewport={{ once: true }} // Animation triggers once
        transition={{ // Animation transition settings
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.1,
        }}
        className="gradient__text" // CSS class for gradient text
      >
        <ParticlesComponent/> {/* Render ParticlesComponent */}
        Level Up Skills with recode hive{/* Text content */}
      </motion.h1>

      {/* Description paragraph with animated entrance */}
      <motion.p
        initial={{ opacity: 0, x: -10 }} // Initial animation properties
        whileInView={{ opacity: 1, x: 0 }} // Animation while in view
        viewport={{ once: true }} // Animation triggers once
        transition={{ // Animation transition settings
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.2,
        }}
      >
        recode hive helps you get started with open-source contributions. We have built an inclusive community from people from all around the world. We ain't doing any magic, we make the learning much more simplified and practical, which traditional 
        education couldn't provide to you. Join our community to earn while learning.
      </motion.p>

      {/* Buttons for navigation */}
      <div className="chh__header-content__input">
        {/* Button with animated entrance */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} // Initial animation properties
          whileInView={{ opacity: 1, x: 0 }} // Animation while in view
          viewport={{ once: true }} // Animation triggers once
          transition={{ // Animation transition settings
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
          type="button" // Button type
        >
          {/* Link to documentation page */}
          <Link to="/docs" className="chh__header-content__input--link">
            Get Started
          </Link>
        </motion.button>

        {/* Button with animated entrance */}
        <motion.button
          initial={{ opacity: 0, x: 10 }} // Initial animation properties
          whileInView={{ opacity: 1, x: 0 }} // Animation while in view
          viewport={{ once: true }} // Animation triggers once
          transition={{ // Animation transition settings
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          type="button" // Button type
        >
          {/* Link to courses page */}
          <Link to="/courses" className="chh__header-content__input--link">
            Courses
          </Link>
        </motion.button>
      </div>
    </div>
  );
};

/**
 * Renders the header image section with tilt effect.
 * @returns JSX element representing the header image.
 */
const HeaderImage = () => {
  const imgRef = useRef<HTMLImageElement>(null); // Ref for the header image element

  useEffect(() => {
    // Initialize VanillaTilt effect on image ref
    if (imgRef.current) {
      VanillaTilt.init(imgRef.current, {
        max: 25,
        speed: 50,
        glare: true,
        "max-glare": 0.5,
      });
    }

    // Cleanup function to destroy VanillaTilt instance
    return () => {
      if (imgRef.current?.vanillaTilt) {
        imgRef.current.vanillaTilt.destroy();
      }
    };
  }, []); // Run effect only once on component mount

  return (
    // Animated wrapper for the header image
    <motion.div
        initial={{ scale: 0, x: 10 }} // Initial animation properties
        whileInView={{ scale: 0.8, x: 0 }} // Animation while in view
        viewport={{ once: true }} // Animation triggers once
        transition={{ // Animation transition settings
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.3,
        }}
        className="chh__header-image" // CSS class for header image container
      >
      {/* Actual header image element */}
      <img
        src="/img/hero-img-01.gif" // Image source
        alt="hero-img" // Alt attribute
        className="" // Additional CSS class
        data-tilt // Activate VanillaTilt effect
        ref={imgRef} // Reference for image element
      />
    </motion.div>
  );
};

/**
 * Renders the complete header component of the application.
 * @returns JSX element representing the complete header.
 */
const Header: React.FC = () => {
  return (
    <div className="chh__header--body"> {/* Container for header */}
      <div className="chh__header"> {/* Main header container */}
        <HeaderContent /> {/* Render header content section */}
        <HeaderImage /> {/* Render header image section */}
      </div>
    </div>
  );
};

export default Header;
