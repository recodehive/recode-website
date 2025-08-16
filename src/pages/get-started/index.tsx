import React, { ReactNode, useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion, useAnimation, useInView } from "framer-motion";
import Head from "@docusaurus/Head";
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
import styles from "./styles.module.css";

// Type definitions
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface StatCardProps {
  value: string;
  label: string;
  index?: number;
}

interface LearningPathProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  index?: number;
}

// Animated component for staggered animations
const AnimatedSection = ({ children, delay = 0 }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay * 0.15,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.1,
        },
      });
    }
  }, [controls, isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      style={
        {
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
        } as React.CSSProperties
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 + delay * 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

function GetStartedHeader() {
  const { siteConfig } = useDocusaurusContext();
  // Remove unused siteConfig or use it if needed
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Code", "Build", "Deploy", "Learn"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Transform Your Career in{" "}
            <span className={styles.highlight}>Tech</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Master the art of coding with our comprehensive learning paths and
            hands-on challenges
          </motion.p>

          <motion.div
            className={styles.typingContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.typingText}>
              <span className={styles.staticText}>Start</span>
              <div className={styles.typingAnimation}>
                {texts.map((text, i) => (
                  <span
                    key={i}
                    className={`${styles.typingWord} ${
                      i === textIndex ? styles.visible : ""
                    }`}
                  >
                    {text}
                  </span>
                ))}
              </div>
              <span className={styles.staticText}>Today</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              className={`${styles.button} ${styles.buttonPrimary}`}
              to="/courses/"
            >
              Start Learning Now
              <span className={styles.buttonIcon} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              className={`${styles.button} ${styles.buttonOutline}`}
              to="/docs/GitHub/intro-github"
            >
              Explore Docs
              <span className={styles.buttonIcon} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: "Hands-on Coding Challenges",
    description:
      "Master programming through practical coding challenges with real-world applications",
    icon: "💻",
    color: "#3b82f6",
  },
  {
    title: "Real Interview Practice",
    description:
      "Prepare with questions from top tech companies like Google, Amazon, and Microsoft",
    icon: "🎯",
    color: "#8b5cf6",
  },
  {
    title: "Structured Learning Paths",
    description:
      "Follow expert-designed roadmaps for different tech stacks and skill levels",
    icon: "🛣️",
    color: "#10b981",
  },
  {
    title: "Interactive Environment",
    description:
      "Code directly in your browser with instant feedback and debugging tools",
    icon: "⚡",
    color: "#f59e0b",
  },
  {
    title: "100+ Problems",
    description:
      "Curated collection of real-world coding interview questions and solutions",
    icon: "🔢",
    color: "#ec4899",
  },
  {
    title: "Multiple Languages",
    description:
      "Support for popular programming languages including Python, JavaScript, and more",
    icon: "🌐",
    color: "#06b6d4",
  },
];

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "100+", label: "Hours of Content" },
  { value: "24/7", label: "Community Support" },
  { value: "4.9/5", label: "Average Rating" },
];

const learningPaths = [
  {
    title: "Web Development",
    description:
      "Master full-stack development with modern frameworks like React, Node.js, and databases. Build responsive, interactive web applications.",
    icon: "🖥️",
    color: "#4f46e5",
  },
  {
    title: "Data Science",
    description:
      "Learn data analysis, visualization, and machine learning with Python, Pandas, and TensorFlow. Turn data into actionable insights.",
    icon: "📊",
    color: "#8b5cf6",
  },
  {
    title: "Mobile Apps",
    description:
      "Create beautiful, performant cross-platform mobile applications using React Native and modern mobile development practices.",
    icon: "📱",
    color: "#10b981",
  },
  {
    title: "DevOps",
    description:
      "Master CI/CD, Docker, Kubernetes, and cloud deployment to build scalable, reliable infrastructure and deployment pipelines.",
    icon: "⚙️",
    color: "#f59e0b",
  },
];

function Feature({ title, description, icon, color }: FeatureProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Create a ref to apply the custom property
  const featureRef = useRef<HTMLElement>(null);

  // Apply the color as a CSS variable when the component mounts or color changes
  useEffect(() => {
    if (featureRef.current) {
      featureRef.current.style.setProperty("--feature-color", color);
    }
  }, [color]);

  const iconStyle = {
    background: `linear-gradient(135deg, ${color}10, ${color}20)`,
    color: color,
  };

  return (
    <motion.article
      ref={featureRef}
      className={styles.feature}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        boxShadow: `0 20px 40px ${color}20`,
      }}
      aria-label={title}
    >
      <div className={styles.featureIcon} style={iconStyle} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
      <motion.div
        className={styles.featureHover}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

function StatCard({ value, label, index = 0 }: StatCardProps) {
  return (
    <motion.article
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <motion.div
        className={styles.statValue}
        aria-label={value}
        initial={{ scale: 0.9 }}
        whileInView={{
          scale: 1,
          transition: {
            delay: 0.2 + index * 0.05,
            type: "spring",
            stiffness: 100,
          },
        }}
        viewport={{ once: true }}
      >
        {value}
      </motion.div>
      <div className={styles.statLabel}>{label}</div>
      <motion.div
        className={styles.statGlow}
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 0.3,
          transition: { delay: 0.3 + index * 0.1 },
        }}
        viewport={{ once: true }}
      />
    </motion.article>
  );
}

const LearningPath = ({
  title,
  description,
  icon,
  color = "#3b82f6",
  index = 0,
  isCompleted = false,
  onToggleComplete = () => {},
}: LearningPathProps) => {
  const isEven = index % 2 === 0;
  const delay = index * 0.15;
  const [isHovered, setIsHovered] = React.useState(false);

  // State for responsive position and layout
  const [layout, setLayout] = React.useState({
    isMobile: false,
    isTablet: false,
    isLargeTablet: false,
    spacing: 200,
    cardWidth: "calc(50% - 1.5rem)",
  });

  // Update position on window resize
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobileView = width < 768;
      const isTableView = width >= 768 && width < 960;
      const isLargeTableView = width >= 960 && width < 1024;

      // Calculate spacing based on viewport
      let spacing, cardWidth;
      if (isMobileView) {
        spacing = 160;
        cardWidth = "100%";
      } else if (isTableView) {
        spacing = 180;
        cardWidth = "calc(50% - 1rem)";
      } else if (isLargeTableView) {
        spacing = 200;
        cardWidth = "calc(50% - 1.25rem)";
      } else {
        spacing = 220;
        cardWidth = "calc(50% - 2rem)";
      }

      setLayout({
        isMobile: isMobileView,
        isTablet: isTableView || isLargeTableView,
        isLargeTablet: isLargeTableView,
        spacing,
        cardWidth,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [index]);

  return (
    <motion.article
      className={`${styles.pathCard} group relative overflow-hidden`}
      style={
        {
          "--card-color": color,
          "--card-color-light": `${color}20`,
          "--card-color-dark": `${color}80`,
          position: layout.isMobile ? "relative" : "absolute",
          margin: layout.isMobile ? "0 auto 1.25rem" : "0",
          maxWidth: "100%",
          width: layout.isMobile ? "100%" : layout.cardWidth,
          top: layout.isMobile ? "auto" : `${80 + index * layout.spacing}px`,
          left: layout.isMobile ? "auto" : isEven ? "50%" : "auto",
          right: layout.isMobile ? "auto" : isEven ? "auto" : "50%",
          transform: layout.isMobile
            ? "none"
            : isEven
            ? "none"
            : "translateX(50%)",
          marginLeft: layout.isMobile ? "auto" : isEven ? 0 : "auto",
          marginRight: layout.isMobile ? "auto" : isEven ? "auto" : 0,
          opacity: isCompleted ? 0.9 : 1,
          filter: isCompleted ? "saturate(0.9)" : "none",
          transition: "all 0.3s ease-in-out",
          border: `1px solid ${
            isCompleted ? `${color}40` : "rgba(255, 255, 255, 0.1)"
          }`,
          background:
            "linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))",
          boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.15)",
          transformOrigin: "center",
          zIndex: isHovered ? 10 : 1,
          ...(!layout.isMobile && {
            "@media (min-width: 960px)": {
              width: "calc(50% - 1.5rem)",
            },
            "@media (min-width: 1024px)": {
              width: "calc(50% - 2rem)",
            },
            "@media (min-width: 1280px)": {
              width: "calc(50% - 3rem)",
            },
            "@media (min-width: 1440px)": {
              width: "calc(50% - 4rem)",
            },
          }),
        } as React.CSSProperties
      }
      initial={{ opacity: 0, x: isEven ? -100 : 100, y: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
          : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 100,
          delay: delay,
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${color}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6">
          <motion.div
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl text-lg sm:text-xl md:text-2xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
              boxShadow: `0 4px 15px -5px ${color}80`,
              opacity: isCompleted ? 0.9 : 1,
            }}
            whileHover={{
              scale: 1.1,
              rotate: isCompleted ? 0 : 5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
            <span className="relative z-10">{icon}</span>
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white break-words leading-tight">
                {title}
              </h3>
              {isCompleted && (
                <div className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center whitespace-nowrap">
                  <svg
                    className="w-3 h-3 mr-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Completed</span>
                  <span className="sm:hidden">✓</span>
                </div>
              )}
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50">
              <Link
                to="/docs/GitHub/intro-github"
                className={`inline-flex items-center text-sm font-medium transition-all duration-200 ${
                  isCompleted
                    ? "text-green-400 hover:text-green-300"
                    : "text-blue-400 hover:text-blue-300"
                } group-hover:underline`}
              >
                {isCompleted ? "Continue Learning" : "Start Learning"}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${
                    isCompleted ? "text-green-400" : "text-blue-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              {/* Improved Completion Toggle */}
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleComplete();
                }}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  isCompleted
                    ? "bg-green-500 focus:ring-green-500"
                    : "bg-gray-600 hover:bg-gray-500 focus:ring-blue-500"
                }`}
                whileTap={{ scale: 0.95 }}
                aria-pressed={isCompleted}
                aria-label={
                  isCompleted ? "Mark as incomplete" : "Mark as complete"
                }
              >
                <span className="sr-only">
                  {isCompleted ? "Mark as incomplete" : "Mark as complete"}
                </span>
                <motion.span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-all duration-200 ease-in-out flex items-center justify-center ${
                    isCompleted ? "translate-x-6" : "translate-x-1"
                  }`}
                  layout
                >
                  {isCompleted && (
                    <motion.svg
                      className="w-3 h-3 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  )}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700/50"></div>

        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-10 blur transition-opacity duration-300 -z-10"></div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
      ></div>
    </motion.article>
  );
};

function GetStartedContent() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode, isDark, mounted } = useSafeColorMode();
  type CompletedPaths = Record<string, boolean>;

  const [completedPaths, setCompletedPaths] = useState<CompletedPaths>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("completedPaths");
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        console.error("Failed to parse completedPaths from localStorage", e);
        return {};
      }
    }
    return {};
  });

  // Toggle completion status for a path
  const togglePathCompletion = React.useCallback((pathTitle: string) => {
    setCompletedPaths((prev) => ({
      ...prev,
      [pathTitle]: !prev[pathTitle],
    }));
  }, []);

  // Calculate completion percentage
  const completionPercentage =
    Math.round(
      (Object.values(completedPaths).filter(Boolean).length /
        learningPaths.length) *
        100
    ) || 0;

  // Save to localStorage whenever completedPaths changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("completedPaths", JSON.stringify(completedPaths));
      } catch (e) {
        console.error("Failed to save completedPaths to localStorage", e);
      }
    }
  }, [completedPaths]);

  return (
    <Layout
      title={`Get Started | ${siteConfig?.title || "Recode Hive"}`}
      description="Start your coding journey with Recode Hive. Learn to code with our interactive platform and structured learning paths."
    >
      <Head>
        <meta name="theme-color" content="#1e40af" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GetStartedHeader />

      <main
        className={`transition-colors duration-300 ${
          isDark ? "dark-bg-primary dark-text-primary" : "bg-white text-black"
        }`}
      >
        {/* Features Section */}
        <section className={styles.features}>
          <div className="container">
            <AnimatedSection>
              <div className={styles.sectionHeader}>
                <h2>Why Choose Recode Hive?</h2>
                <p>
                  Discover the perfect learning experience tailored for your
                  coding journey
                </p>
              </div>

              <div className={styles.featuresGrid}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </AnimatedSection>

            {/* Stats Section */}
            <AnimatedSection delay={1}>
              <div className={styles.section}>
                <div className={styles.container}>
                  <motion.div
                    className={styles.statsSection}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {stats.map((stat, index) => (
                      <StatCard
                        key={index}
                        value={stat.value}
                        label={stat.label}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Learning Paths - Full Width Section */}
        <AnimatedSection delay={2}>
          <section
            className={styles.learningPaths}
            style={{
              width: "100vw",
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-full bg-gray-900 py-16">
              <div className="container mx-auto">
                <div className="text-center mb-16">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4 px-6 py-3 inline-block rounded-xl bg-blue-100 text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                      },
                    }}
                    viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
                    style={{
                      textShadow: "0 0 10px rgba(255, 213, 0, 0.5)",
                    }}
                  >
                    Start Your Journey
                  </motion.h2>
                </div>
              </div>
            </div>

            <div className="container mx-auto -mt-10 relative">
              {/* Progress Overview */}
              <motion.div
                className="mb-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-4 px-6 py-3 inline-block rounded-xl bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 shadow-md">
                      Your Learning Progress
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {completionPercentage}% Complete •{" "}
                      {Object.values(completedPaths).filter(Boolean).length} of{" "}
                      {learningPaths.length} paths started
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        left: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                      style={{
                        width: "20%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transform: "skewX(-20deg)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              <div className={styles.timelineContainer}>
                <div className={styles.timeline}>
                  {/* Animated progress indicator on the timeline */}
                  <motion.div
                    className="absolute left-0 top-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 h-0"
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(completionPercentage / 100) * 100}%`,
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <div className={styles.pathsContainer}>
                  {learningPaths.map((path, idx) => (
                    <LearningPath
                      key={path.title}
                      title={path.title}
                      description={path.description}
                      icon={path.icon}
                      color={path.color}
                      index={idx}
                      isCompleted={!!completedPaths[path.title]}
                      onToggleComplete={() => togglePathCompletion(path.title)}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="text-center mt-12 pb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  to="/courses"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-200 to-blue-300 text-gray-900 font-semibold text-lg rounded-xl hover:from-blue-300 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  style={{
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span className="relative z-10">Explore All Paths</span>
                  <svg
                    className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </Layout>
  );
}

export default function GetStarted() {
  return <GetStartedContent />;
}
