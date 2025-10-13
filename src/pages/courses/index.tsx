import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import "./courses.css";

// Animation variants for consistent animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const techTags = [
  "AWS",
  "Apache Airflow",
  "Parquet",
  "Avro",
  "Microsoft Azure",
  "Google BigQuery",
  "CSV",
  "Databricks",
  "Azure Data Factory",
  "Docker",
  "Kafka",
  "Google Cloud",
  "GitHub",
  "Apache NiFi",
  "Snowflake",
  "Looker",
  "MAGE",
  "NumPy",
  "Pandas",
  "PostgreSQL",
  "Python",
  "Apache Spark",
  "SQL",
];

const partnerLogos = [
  "https://dummyimage.com/80x40/222/fff&text=Samsung",
  "https://dummyimage.com/80x40/333/fff&text=Oracle",
  "https://dummyimage.com/80x40/444/fff&text=Segment",
  "https://dummyimage.com/80x40/555/fff&text=Monday.com",
  "https://dummyimage.com/80x40/666/fff&text=Protonet",
];

const projects = [
  "https://dummyimage.com/200x120/222/fff&text=Project+1",
  "https://dummyimage.com/200x120/333/fff&text=Project+2",
  "https://dummyimage.com/200x120/444/fff&text=Project+3",
  "https://dummyimage.com/200x120/555/fff&text=Project+4",
  "https://dummyimage.com/200x120/555/fff&text=Project+5",
  "https://dummyimage.com/200x120/555/fff&text=Project+6",
  "https://dummyimage.com/200x120/555/fff&text=Project+7",
];

const testimonials = [
  {
    img: "https://dummyimage.com/80x80/222/fff&text=S",
    name: "Sachin",
    review:
      "Sanjay has been a great support in knowing various career paths and upcoming tech. The call was very crisp but valueable at the same time. For sure I am gonna schedule a call probably next month to give him updates. Thanks a ton Sanjay :)",
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/333/fff&text=KP",
    name: "Kumar Priyanshu",
    review:
      "I was thoroughly impressed by his clear, engaging communication and deep understanding of my issue. He listened attentively and offered valuable insights and solutions, leaving me extremely satisfied and confident in the guidance I received.",
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/444/fff&text=AV",
    name: "Aman Vohra",
    review:
      "It was an amazing session with you. And i can't thank you enough for your time and the great and valuable insights you have given me. Thank you so much🙌🏻",
    stars: 5,
  },
];

const courses = [
  {
    number: "01",
    title: "Python for Data Engineering",
    desc: "Learn to harness the power of Python for transforming and processing data at scale in our hands-on 'Python for Data Engineering' course. Build the skills needed to design robust data pipelines and optimize data workflows effectively.",
    img: "https://dummyimage.com/300x150/222/fff&text=Python+for+DE",
  },
  {
    number: "02",
    title: "SQL for Data Engineering",
    desc: "Unlock the potential of data manipulation and management with our 'SQL for Data Engineering' course. Gain proficiency in crafting and optimizing complex queries to build and maintain efficient data pipelines.",
    img: "https://dummyimage.com/300x150/333/fff&text=SQL+for+DE",
  },
  {
    number: "03",
    title: "Data Warehouse with Snowflake",
    desc: "Discover the modern approach to data warehousing using Snowflake in our course. Learn to design, implement, and manage a high-performance data warehouse for seamless analytics and insights.",
    img: "https://dummyimage.com/300x150/444/fff&text=Snowflake",
  },
  {
    number: "04",
    title: "Spark for Data Engineering",
    desc: "Learn to leverage the power of Apache Spark for efficient and scalable data engineering in our comprehensive course. Master the art of processing and transforming data to build robust pipelines and drive data-centric applications.",
    img: "https://dummyimage.com/300x150/555/fff&text=Spark+for+DE",
  },
  {
    number: "05",
    title: "Workflow Orchestration (Airflow, Mage, Prefect)",
    desc: "Explore the world of workflow orchestration with our course covering Airflow, Luigi, Mage, and Prefect. Gain expertise in seamlessly coordinating and automating complex data pipelines for enhanced efficiency and productivity.",
    img: "https://dummyimage.com/300x150/666/fff&text=Workflow+Orchestration",
  },
  {
    number: "06",
    title: "Apache Kafka for DE (Coming Soon)",
    desc: "Dive into the realm of data engineering with Apache Kafka in our course. Learn to build real-time, scalable data pipelines that enable efficient data movement and processing for diverse applications.",
    img: "https://dummyimage.com/300x150/777/fff&text=Kafka+for+DE",
  },
  {
    number: "07",
    title: "Cloud Computing AWS, GCP, Azure (Coming Soon)",
    desc: "Embark on a journey through major cloud platforms with our course on AWS, GCP, and Azure. Acquire the skills to deploy, manage, and optimize cloud-based solutions for diverse business needs.",
    img: "https://dummyimage.com/300x150/888/fff&text=Cloud+Computing",
  },
];

const projectReviews = [
  {
    img: "https://dummyimage.com/100x100/222/fff&text=AP",
    name: "Abhi Patel",
    review:
      "Excited to share the Spotify End to End ETL pipeline project using AWS and Python...",
  },
  {
    img: "https://dummyimage.com/100x100/333/fff&text=AM",
    name: "Ajosh Mungesan",
    review: "Learning & sharing my Spotify ETL project using Python & AWS...",
  },
  {
    img: "https://dummyimage.com/100x100/444/fff&text=HR",
    name: "Hariharan R",
    review:
      "Excited to share the Spotify End to End ETL pipeline project using AWS and Python...",
  },
];

const topics = [
  "ETL",
  "Data Modelling",
  "SQL",
  "Data Pipelines",
  "Cloud Data Warehousing",
  "Spark",
  "Databricks",
  "DataFrames",
  "RDDs",
  "PySpark",
  "Spark SQL",
  "MLlib",
  "Spark Streaming",
  "Cluster Management",
  "Fault Tolerance",
  "Big Data",
  "Apache Hadoop",
  "Data Ingestion",
  "Data Transformation",
  "Data Analytics",
  "Schema Design",
  "Machine Learning",
  "Snowflake",
  "Data Lake",
  "Business Intelligence",
  "Analytics",
  "OLAP",
  "Data Architecture",
  "Python",
  "Data Wrangling",
  "Pandas",
  "NumPy",
  "Data Visualisation",
  "Jupyter Notebooks",
  "Web Scraping",
  "APIs",
  "Data Cleaning",
  "Data Security",
  "Scalability",
  "Stored Procedures",
  "Triggers",
  "Views",
  "Normalization",
  "Relational Databases",
  "Data Integrity",
  "Data Consistency",
  "Query Performance",
  "Window Functions",
  "Transactions",
  "Indexing",
  "Batch Processing",
  "Real-Time Processing",
  "Data Orchestration",
  "Workflow Automation",
  "Data Quality",
  "Data Lineage",
  "Metadata Management",
  "Data Cataloging",
];

// Modified stats with numerical values for animation
const stats = [
  { label: "Youtube", value: 160, suffix: "K+" },
  { label: "LinkedIn", value: 100, suffix: "K+" },
  { label: "Twitter", value: 25, suffix: "K+" },
];

const faqs = [
  {
    q: "Who can enroll in the programs?",
    a: "Anyone interested in data engineering, from beginners to professionals.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, you will receive a certificate upon successful completion of the course.",
  },
  {
    q: "Is the course in Hindi or English?",
    a: "Courses are available in both Hindi and English.",
  },
  {
    q: "How can I contact you if I have questions?",
    a: "You can contact us via the contact form or email provided on the website.",
  },
  {
    q: "Do I need to learn anything before this course starts?",
    a: "No prior experience is required. All fundamentals will be covered.",
  },
];

function CoursesContent() {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [modal, setModal] = useState({ open: false, content: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    Youtube: 0,
    LinkedIn: 0,
    Twitter: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const projectCarouselRef = useRef(null);
  const techTagsRef = useRef(null);
  const statsRef = useRef(null);

  // Horizontal scrolling for tech tags
  useEffect(() => {
    if (techTagsRef.current) {
      const scrollInterval = setInterval(() => {
        if (techTagsRef.current) {
          const currentScroll = techTagsRef.current.scrollLeft;
          const maxScroll =
            techTagsRef.current.scrollWidth - techTagsRef.current.clientWidth;

          if (currentScroll >= maxScroll) {
            techTagsRef.current.scrollLeft = 0;
          } else {
            techTagsRef.current.scrollLeft += 1;
          }
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  // Set up automatic carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjectIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animate stats counter when visible
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);

          // Start animation for each stat
          stats.forEach((stat) => {
            const { label, value } = stat;
            let startValue = 0;
            const duration = 2000; // 2 seconds
            const increment = value / (duration / 16); // ~60fps

            const timer = setInterval(() => {
              startValue += increment;

              if (startValue >= value) {
                clearInterval(timer);
                setAnimatedStats((prev) => ({
                  ...prev,
                  [label]: value,
                }));
              } else {
                setAnimatedStats((prev) => ({
                  ...prev,
                  [label]: Math.floor(startValue),
                }));
              }
            }, 16);
          });
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [isStatsVisible]);

  const handleCourseClick = (course: any) => {
    if (course.title.includes("Coming Soon")) {
      setModal({ open: true, content: "This course is coming soon!" });
    } else {
      window.location.href = `/courses/${course.title.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  const handleAction = (type: string) => {
    setModal({
      open: true,
      content:
        type === "enroll"
          ? "Enrollment flow coming soon!"
          : "Purchase flow coming soon!",
    });
  };

  const scrollProjects = (dir: number) => {
    const newIndex = activeProjectIndex + dir;

    if (newIndex >= 0 && newIndex < projects.length) {
      setActiveProjectIndex(newIndex);
    } else if (newIndex < 0) {
      // Loop to the end if going backwards from first slide
      setActiveProjectIndex(projects.length - 1);
    } else {
      // Loop to the beginning if going forward from last slide
      setActiveProjectIndex(0);
    }
  };

  const goToProjectSlide = (index: number) => {
    setActiveProjectIndex(index);
  };

  const handleInfo = (info: string) => setModal({ open: true, content: info });

  return (
    <Layout
      title="Courses"
      description="Explore our available courses and resources."
    >
      <Head>
        <meta
          name="description"
          content="Landing page for all available courses."
        />
        <style>
          {`
            /* Hide scrollbar for carousel */
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            /* Custom animations */
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }

            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }

            .float-animation {
              animation: float 3s ease-in-out infinite;
            }

            .animate-slide {
              display: inline-block;
              white-space: nowrap;
              padding-right: 100%;
            }

            /* Fade-in animation */
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-fadeIn {
              animation: fadeIn 0.5s ease-out forwards;
            }

            /* Scale-in animation */
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }

            .animate-scaleIn {
              animation: scaleIn 0.3s ease-out forwards;
            }

            /* Slide-in animation */
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-slideInUp {
              animation: slideInUp 0.5s ease-out forwards;
            }

            /* Pulse animation */
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }

            .animate-pulse {
              animation: pulse 2s infinite;
            }
          `}
        </style>
      </Head>
      <main className="courses-page min-h-screen transition-all duration-500">
        {/* Modal */}
        {modal.open && (
          <div className="bg-opacity-60 courses-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="courses-modal courses-scale-in relative w-full max-w-md p-6 text-center md:p-8">
              <button
                className="courses-icon-button absolute top-3 right-3 text-xl transition-transform hover:scale-110 md:text-2xl"
                onClick={() => setModal({ open: false, content: "" })}
              >
                ×
              </button>
              <div className="courses-body pt-4">{modal.content}</div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <motion.section
          className="courses-hero relative overflow-hidden border-b px-4 py-16 text-center transition-all duration-500 md:py-24"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <div className="courses-container">
            <motion.h1
              className="courses-heading-1 courses-text-gradient relative z-10 mb-6 tracking-tight md:mb-8"
              variants={fadeIn}
            >
              Transform Your Career
              <br className="hidden md:block" />
              <span className="block md:inline">in Data Engineering</span>
            </motion.h1>
            <div className="flex w-full justify-center">
              <motion.p
                className="courses-text-secondary courses-body-large mb-8 max-w-2xl text-center leading-relaxed font-medium md:mb-12"
                variants={fadeIn}
              >
                Master the art of data engineering with industry-leading courses
                designed for{" "}
                <span className="courses-text-gradient font-bold">
                  modern tech careers
                </span>
                .
              </motion.p>
            </div>
            <motion.div
              className="mx-auto mb-12 flex max-w-md flex-col justify-center gap-4 sm:flex-row md:mb-16 md:max-w-none md:gap-6"
              variants={fadeIn}
            >
              <button
                className="courses-button-primary group courses-backdrop-blur relative overflow-hidden rounded-2xl border border-blue-400/20 px-8 py-3 text-base font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 md:px-10 md:py-4 md:text-lg"
                onClick={() => handleAction("enroll")}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Courses
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="courses-button-secondary group relative overflow-hidden rounded-2xl px-8 py-3 text-base font-bold shadow-2xl transition-all duration-300 hover:scale-105 md:px-10 md:py-4 md:text-lg"
                onClick={() => handleAction("curriculum")}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Curriculum
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
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
                </span>
              </button>
            </motion.div>
          </div>

          {/* Tech Tags */}
          <motion.div className="courses-container" variants={fadeIn}>
            <div
              ref={techTagsRef}
              className="courses-hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-4 whitespace-nowrap"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-2 px-4 md:px-0">
                {techTags.map((tag, idx) => (
                  <span key={idx} className="courses-topic-tag flex-shrink-0">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Partner Logos */}
            <div className="mt-8">
              <h3 className="courses-text-secondary courses-body mb-6 text-center font-medium">
                Students now available at
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {partnerLogos.map((logo, idx) => (
                  <motion.img
                    key={idx}
                    src={logo}
                    alt="Partner Logo"
                    className="h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:h-12"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Carousel */}
        <section className="courses-section relative overflow-hidden border-b px-4 py-16 transition-all duration-500 md:py-24">
          <div className="courses-bg-overlay absolute inset-0" />
          <div className="courses-container">
            <motion.h2
              className="courses-heading-2 courses-gradient-text mb-12 text-center leading-tight tracking-tight md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore over 14+ extensive projects
            </motion.h2>
            <motion.div
              className="relative z-10 mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <button
                  className="courses-nav-button absolute top-1/2 left-2 z-10 -translate-y-1/2 transform shadow-xl transition-all duration-300 hover:scale-110 md:left-0"
                  onClick={() => scrollProjects(-1)}
                >
                  &lt;
                </button>
                <div
                  ref={projectCarouselRef}
                  className="courses-hide-scrollbar mx-12 overflow-hidden md:mx-16"
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${activeProjectIndex * 100}%)`,
                    }}
                  >
                    {projects.map((img, idx) => (
                      <div
                        key={idx}
                        className="flex min-w-full justify-center px-2 md:px-4"
                        style={{ width: "100%", flexShrink: 0 }}
                      >
                        <img
                          src={img}
                          alt={`Project ${idx + 1}`}
                          className="h-auto w-full max-w-xs transform cursor-pointer rounded-xl border-2 border-gray-700/50 shadow-lg transition hover:scale-105 hover:border-blue-500/50 hover:shadow-blue-500/30 md:max-w-sm"
                          style={{ aspectRatio: "16/10" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="courses-nav-button absolute top-1/2 right-2 z-10 -translate-y-1/2 transform shadow-xl transition-all duration-300 hover:scale-110 md:right-0"
                  onClick={() => scrollProjects(1)}
                >
                  &gt;
                </button>
              </div>
              <div className="courses-carousel-indicators mt-6">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    className={`courses-carousel-indicator ${
                      idx === activeProjectIndex ? "active" : ""
                    }`}
                    onClick={() => goToProjectSlide(idx)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="courses-section relative overflow-hidden border-b px-4 py-16 transition-all duration-500 md:py-24">
          <div className="courses-bg-overlay absolute inset-0" />
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-gradient-text mb-12 text-center leading-tight tracking-tight md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Kind Words from Our Students
            </motion.h2>
            <div className="courses-grid courses-grid-3 relative z-10">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  className="courses-card group flex cursor-pointer flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleInfo(t.review)}
                >
                  <div className="relative mb-6 h-20 w-20 md:h-24 md:w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-70" />
                    <img
                      src={t.img}
                      alt={t.name}
                      className="relative z-10 h-full w-full rounded-full border-3 border-blue-400/50 object-cover shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:border-blue-400"
                    />
                  </div>
                  <h4 className="courses-heading-4 courses-text-gradient mb-4">
                    {t.name}
                  </h4>
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-lg text-yellow-400"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <p className="courses-body-small courses-text-secondary line-clamp-4 text-center leading-relaxed transition-colors duration-300">
                    {t.review}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Timeline Section */}
        <section className="courses-section border-b px-4 py-16 transition-all duration-500 md:py-24">
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-gradient-text mb-6 text-center leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Courses Available
            </motion.h2>
            <motion.h3
              className="courses-body-large courses-text-secondary mb-12 text-center md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Courses Covered In the Program
            </motion.h3>
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-0">
              {/* Left column */}
              <div className="flex flex-1 flex-col gap-6 lg:gap-8">
                {courses
                  .filter((_, i) => i % 2 === 0)
                  .map((course, idx) => (
                    <motion.div
                      key={course.number}
                      className="courses-timeline-card group flex cursor-pointer flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
                      onClick={() => handleCourseClick(course)}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-32 md:h-24 md:w-40">
                        <img
                          src={course.img}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="courses-heading-4 courses-text-gradient mb-2 line-clamp-2 md:mb-3">
                          {course.title}
                        </h3>
                        <p className="courses-body-small courses-text-secondary line-clamp-2 leading-relaxed md:line-clamp-3">
                          {course.desc}
                        </p>
                      </div>
                      <svg
                        className="courses-text-muted h-5 w-5 flex-shrink-0 transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400 md:h-6 md:w-6"
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
                    </motion.div>
                  ))}
              </div>
              {/* Timeline */}
              <div className="relative mx-6 hidden flex-col items-center lg:flex xl:mx-8">
                <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                {courses.map((course, idx) => (
                  <React.Fragment key={course.number}>
                    <motion.div
                      className="relative z-10 flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-purple-400 bg-gradient-to-br from-purple-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-purple-500/50 xl:h-16 xl:w-16 xl:text-2xl">
                        {course.number}
                      </div>
                      {idx !== courses.length - 1 && (
                        <div className="h-12 w-1 bg-transparent xl:h-16"></div>
                      )}
                    </motion.div>
                  </React.Fragment>
                ))}
                <motion.button
                  className="courses-button-primary relative z-10 mt-8 transform rounded-2xl px-8 py-3 shadow-2xl transition-all duration-300 hover:scale-110 xl:mt-12 xl:px-10 xl:py-4"
                  onClick={() => handleAction("enroll")}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                >
                  Enroll now
                </motion.button>
              </div>
              {/* Right column */}
              <div className="flex flex-1 flex-col gap-6 lg:gap-8">
                {courses
                  .filter((_, i) => i % 2 === 1)
                  .map((course, idx) => (
                    <motion.div
                      key={course.number}
                      className="courses-timeline-card group flex cursor-pointer flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
                      onClick={() => handleCourseClick(course)}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <div className="order-2 min-w-0 flex-1 sm:order-1">
                        <h3 className="courses-heading-4 courses-text-gradient mb-2 line-clamp-2 md:mb-3">
                          {course.title}
                        </h3>
                        <p className="courses-body-small courses-text-secondary line-clamp-2 leading-relaxed md:line-clamp-3">
                          {course.desc}
                        </p>
                      </div>
                      <div className="relative order-1 h-32 w-full flex-shrink-0 overflow-hidden rounded-lg sm:order-2 sm:h-20 sm:w-32 md:h-24 md:w-40">
                        <img
                          src={course.img}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <svg
                        className="courses-text-muted order-3 h-5 w-5 flex-shrink-0 transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400 md:h-6 md:w-6"
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
                    </motion.div>
                  ))}
              </div>

              {/* Mobile Enroll Button */}
              <div className="mt-8 flex justify-center lg:hidden">
                <motion.button
                  className="courses-button-primary transform rounded-2xl px-8 py-3 shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleAction("enroll")}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  Enroll now
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Reviews Section */}
        <section className="courses-stats-section border-b px-4 py-16 transition-all duration-500 md:py-20">
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-text-primary mb-8 text-center md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Project reviews from students
            </motion.h2>
            <div className="courses-grid courses-grid-3 mb-8 md:mb-12">
              {projectReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  className="courses-card group flex cursor-pointer flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleInfo(review.review)}
                >
                  <div className="relative mb-4 h-16 w-16 md:mb-6 md:h-20 md:w-20">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-70" />
                    <img
                      src={review.img}
                      alt={review.name}
                      className="relative z-10 h-full w-full rounded-full border-3 border-green-400 object-cover shadow-lg transition-all duration-300 group-hover:border-green-300"
                    />
                  </div>
                  <h4 className="courses-heading-4 courses-text-gradient mb-3 md:mb-4">
                    {review.name}
                  </h4>
                  <p className="courses-body-small courses-text-secondary line-clamp-4 text-center leading-relaxed">
                    {review.review}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Tag Cloud & Community Stats */}
        <section className="courses-section border-b px-4 py-16 transition-all duration-500 md:py-20">
          <div className="courses-container-wide">
            <motion.h3
              className="courses-heading-3 courses-text-primary mb-6 text-center md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              100+ topics taught...
            </motion.h3>
            <motion.div
              className={`mb-6 flex flex-wrap justify-center gap-2 transition-all duration-500 md:gap-3 ${showAllTopics ? "max-h-none" : "max-h-32 overflow-hidden md:max-h-40"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {(showAllTopics ? topics : topics.slice(0, 20)).map(
                (topic, idx) => (
                  <motion.span
                    key={idx}
                    className="courses-topic-tag"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {topic}
                  </motion.span>
                ),
              )}
            </motion.div>
            <motion.div
              className="mb-8 flex justify-center md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                className="courses-button-ghost transform rounded-full px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 md:px-8 md:py-3"
                onClick={() => setShowAllTopics((v) => !v)}
              >
                {showAllTopics ? "Show less" : "Show more"}
              </button>
            </motion.div>
          </div>

          {/* Community Stats */}
          <div
            ref={statsRef}
            className="courses-grid courses-grid-3 mt-8 md:mt-12"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="courses-stat-card group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <div className="courses-text-gradient mb-3 flex items-baseline justify-center text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isStatsVisible ? animatedStats[stat.label] : 0}
                    </motion.span>
                    <span className="ml-1 inline-block text-lg md:text-xl lg:text-2xl">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="courses-body-large courses-text-secondary mb-4 font-semibold transition-colors duration-300 md:mb-6">
                    {stat.label}
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-gray-200 to-gray-300">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: isStatsVisible ? "100%" : "0%" }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="courses-faq-section border-b px-4 py-16 transition-all duration-500 md:py-20">
          <div className="courses-container">
            <motion.h2
              className="courses-heading-2 courses-text-primary mb-8 text-center md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Commonly asked questions
            </motion.h2>
            <div className="mx-auto max-w-3xl">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="courses-faq-item mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <button
                    className="courses-faq-button courses-body md:courses-body-large flex w-full items-center justify-between px-4 py-4 text-left font-semibold transition-all duration-300 focus:outline-none md:px-6 md:py-6"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span
                      className="flex-shrink-0 transform text-xl transition-transform duration-300 md:text-2xl"
                      style={{
                        transform:
                          openFaq === idx ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaq === idx ? "500px" : "0",
                      opacity: openFaq === idx ? 1 : 0,
                    }}
                  >
                    <div className="courses-faq-answer courses-body px-4 py-4 leading-relaxed md:px-6 md:py-6">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default function CoursesLanding() {
  return <CoursesContent />;
}
