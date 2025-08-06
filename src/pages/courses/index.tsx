import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import { useColorMode } from '@docusaurus/theme-common';

// Animation variants for consistent animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const techTags = [
  "AWS", "Apache Airflow", "Parquet", "Avro", "Microsoft Azure", "Google BigQuery", "CSV", "Databricks", "Azure Data Factory", "Docker", "Kafka", "Google Cloud", "GitHub", "Apache NiFi", "Snowflake", "Looker", "MAGE", "NumPy", "Pandas", "PostgreSQL", "Python", "Apache Spark", "SQL"
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
    img: "https://dummyimage.com/80x80/222/fff&text=MH",
    name: "Muhammad Aziq Hamidun",
    review: "I personally want to thank Darshil for a well executed SQL outline for a beginner, especially in the field of DE. Most course out there just provide the theory and what to do but not really on how to do it with hands on practice. I really learn a lot and I am very confident to be a handy DE. Thanks once again Darchil, God bless you for having a heart to reach out and sharing your expertise to help us.",
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/333/fff&text=BD",
    name: "binayak dash",
    review: "Hi Darshil,Thank you so much for this awesome course.I have enrolled myself in various SQL courses available in the market because SQL is the core and backbone of DATA ENGINEERS.I just want to let you know that,I have not completed any SQL courses which I have enrolled except your course.I have completed this course thoroughly and with great enthusiasm.Thank you again!!!!I feel you should have added the indexing concept also as that is one optimisation technique.Hope you will answer my queries.",
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/444/fff&text=RB",
    name: "RABBANI BAJI SHAIK",
    review: "I am pleased to provide my review of an exceptional course by Darshil Parmar that serves as an excellent introduction to a data engineering career. Unlike traditional SQL learning paths, this course focuses on PostgreSQL, offering a unique and real-time experience of project work. By showcasing your practical skills, it enhances job prospects. The course not only imparts technical knowledge but also nurtures an understanding of professional data engineering. I highly recommend this course to anyone looking for innovative ways to learn SQL and kickstart their data engineering journey",
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
    review: "Excited to share the Spotify End to End ETL pipeline project using AWS and Python...",
  },
  {
    img: "https://dummyimage.com/100x100/333/fff&text=AM",
    name: "Ajosh Mungesan",
    review: "Learning & sharing my Spotify ETL project using Python & AWS...",
  },
  {
    img: "https://dummyimage.com/100x100/444/fff&text=HR",
    name: "Hariharan R",
    review: "Excited to share the Spotify End to End ETL pipeline project using AWS and Python...",
  },
];

const topics = [
  "ETL", "Data Modelling", "SQL", "Data Pipelines", "Cloud Data Warehousing", "Spark", "Databricks", "DataFrames", "RDDs", "PySpark", "Spark SQL", "MLlib", "Spark Streaming", "Cluster Management", "Fault Tolerance", "Big Data", "Apache Hadoop", "Data Ingestion", "Data Transformation", "Data Analytics", "Schema Design", "Machine Learning", "Snowflake", "Data Lake", "Business Intelligence", "Analytics", "OLAP", "Data Architecture", "Python", "Data Wrangling", "Pandas", "NumPy", "Data Visualisation", "Jupyter Notebooks", "Web Scraping", "APIs", "Data Cleaning", "Data Security", "Scalability", "Stored Procedures", "Triggers", "Views", "Normalization", "Relational Databases", "Data Integrity", "Data Consistency", "Query Performance", "Window Functions", "Transactions", "Indexing", "Batch Processing", "Real-Time Processing", "Data Orchestration", "Workflow Automation", "Data Quality", "Data Lineage", "Metadata Management", "Data Cataloging"
];

// Modified stats with numerical values for animation
const stats = [
  { label: "Youtube", value: 160, suffix: "K+" },
  { label: "LinkedIn", value: 100, suffix: "K+" },
  { label: "Twitter", value: 25, suffix: "K+" },
];

const faqs = [
  { q: "Who can enroll in the programs?", a: "Anyone interested in data engineering, from beginners to professionals." },
  { q: "Will I receive a certificate?", a: "Yes, you will receive a certificate upon successful completion of the course." },
  { q: "Is the course in Hindi or English?", a: "Courses are available in both Hindi and English." },
  { q: "How can I contact you if I have questions?", a: "You can contact us via the contact form or email provided on the website." },
  { q: "Do I need to learn anything before this course starts?", a: "No prior experience is required. All fundamentals will be covered." },
];

export default function CoursesLanding() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [modal, setModal] = useState({ open: false, content: "" });
  const [openFaq, setOpenFaq] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showStickyEnroll, setShowStickyEnroll] = useState(false);
  const [countdownValues, setCountdownValues] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [animatedStats, setAnimatedStats] = useState({
    Youtube: 0,
    LinkedIn: 0,
    Twitter: 0
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const projectCarouselRef = useRef(null);
  const techTagsRef = useRef(null);
  const statsRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    // Set the countdown date to 2 days from now
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 2);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdownValues({
        days,
        hours,
        minutes,
        seconds
      });
    };

    // Initial update
    updateCountdown();

    // Set interval to update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Horizontal scrolling for tech tags
  useEffect(() => {
    if (techTagsRef.current) {
      const scrollInterval = setInterval(() => {
        if (techTagsRef.current) {
          const currentScroll = techTagsRef.current.scrollLeft;
          const maxScroll = techTagsRef.current.scrollWidth - techTagsRef.current.clientWidth;

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

  // Check scroll position for sticky enroll button
  useEffect(() => {
    const checkScroll = () => {
      setShowStickyEnroll(window.scrollY > 500);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Set up automatic carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjectIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
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
                setAnimatedStats(prev => ({
                  ...prev,
                  [label]: value
                }));
              } else {
                setAnimatedStats(prev => ({
                  ...prev,
                  [label]: Math.floor(startValue)
                }));
              }
            }, 16);
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [isStatsVisible]);

  const handleCourseClick = (course) => {
    if (course.title.includes("Coming Soon")) {
      setModal({ open: true, content: "This course is coming soon!" });
    } else {
      window.location.href = `/courses/${course.title.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  const handleAction = (type) => {
    setModal({ open: true, content: type === "enroll" ? "Enrollment flow coming soon!" : "Purchase flow coming soon!" });
  };

  const scrollProjects = (dir) => {
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

  const goToProjectSlide = (index) => {
    setActiveProjectIndex(index);
  };

  const handleInfo = (info) => setModal({ open: true, content: info });

  return (
    <Layout title="Courses" description="Explore our available courses and resources.">
      <Head>
        <meta name="description" content="Landing page for all available courses." />
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
      <main className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#121212] text-white' : 'bg-white text-black'
      }`}>
        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fadeIn">
            <div className={`rounded-lg p-8 max-w-md w-full text-center relative animate-scaleIn ${
              isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'
            }`}>
              <button
                className={`absolute top-2 right-4 text-2xl transition-transform hover:scale-110 ${
                  isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'
                }`}
                onClick={() => setModal({ open: false, content: "" })}
              >
                ×
              </button>
              <div>{modal.content}</div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <motion.section
          className={`py-20 px-4 text-center relative overflow-hidden transition-colors duration-300 ${
            isDark
              ? 'border-b border-gray-800 bg-gradient-to-br from-blue-950 via-gray-900 to-black'
              : 'border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-gray-50'
          }`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_80%)] animate-pulse"/>
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 relative z-10 tracking-tight"
            variants={fadeIn}
          >
            Transform Your Career<br />in Data Engineering</motion.h1>
          <div className="flex justify-center items-center">
            <motion.p
              className={`text-xl md:text-2xl max-w-2xl text-center leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              variants={fadeIn}
            >
              Master the art of data engineering with industry-leading courses designed for <span className={`font-semibold ${
                isDark ? 'text-blue-300' : 'text-blue-600'
              }`}>modern tech careers</span>.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center mt-12 mb-16"
            variants={fadeIn}
          >
            <button
              className="group relative px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 border border-blue-400/30"
              onClick={() => handleAction("enroll")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Courses
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"/>
            </button>
            <button
              className="group relative px-8 py-4 overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm text-white font-bold text-lg shadow-xl border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 hover:border-purple-500/30"
              onClick={() => handleAction("curriculum")}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Curriculum
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 to-blue-700/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"/>
            </button>
          </motion.div>

          {/* Tech Tags */}
          <motion.div
            ref={techTagsRef}
            className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-4 whitespace-nowrap"
            style={{ scrollBehavior: 'smooth' }}
            variants={fadeIn}
          >
            <div className="flex gap-2">
              {techTags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800/80 hover:bg-blue-700/80 text-gray-200 border border-gray-700/50 hover:border-blue-500/50 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            className="mt-8"
            variants={fadeIn}
          >
            <h3 className={`text-lg mb-2 text-center ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Students now available at</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {partnerLogos.map((logo, idx) => (
                <motion.img
                  key={idx}
                  src={logo}
                  alt="Partner Logo"
                  className="h-12 w-auto object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Carousel */}
        <section className="py-20 px-4 border-b border-gray-800 bg-gradient-to-b from-black via-blue-950/20 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_70%)]"/>
          <motion.h2
            className="text-4xl font-bold text-center mb-12 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore over 14+ extensive projects
          </motion.h2>
          <motion.div
            className="max-w-5xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition hover:scale-110 border border-gray-700/50 hover:border-blue-500/50"
                onClick={() => scrollProjects(-1)}
              >
                &lt;
              </button>
              <div
                ref={projectCarouselRef}
                className="overflow-hidden hide-scrollbar"
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeProjectIndex * 100}%)` }}
                >
                  {projects.map((img, idx) => (
                    <div
                      key={idx}
                      className="min-w-full flex justify-center px-4"
                      style={{ width: '100%', flexShrink: 0 }}
                    >
                      <img
                        src={img}
                        alt={`Project ${idx + 1}`}
                        className="rounded-lg shadow-lg hover:shadow-blue-500/30 transition transform hover:scale-105 cursor-pointer border-2 border-gray-700/50 hover:border-blue-500/50"
                        style={{ height: "220px", width: "360px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition hover:scale-110 border border-gray-700/50 hover:border-blue-500/50"
                onClick={() => scrollProjects(1)}
              >
                &gt;
              </button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeProjectIndex ? 'bg-blue-500 scale-110 shadow-md shadow-blue-500/50' : 'bg-gray-600 hover:bg-gray-500'}`}
                  onClick={() => goToProjectSlide(idx)}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 border-b border-gray-800 bg-gradient-to-br from-gray-900 via-blue-950/10 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.1),transparent_70%)]"/>
          <motion.h2
            className="text-4xl font-bold text-center mb-12 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Kind Words from Our Students
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="group relative backdrop-blur-sm bg-gray-800/30 hover:bg-gray-800/50 p-8 rounded-xl flex flex-col items-center shadow-lg cursor-pointer border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleInfo(t.review)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"/>
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"/>
                  <img 
                    src={t.img} 
                    alt={t.name} 
                    className="relative w-full h-full rounded-full object-cover border-2 border-blue-400/50 group-hover:border-blue-400 transition-all duration-300 z-10 shadow-md shadow-blue-500/30" 
                  />
                </div>
                <h4 className="font-bold mb-3 text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{t.name}</h4>
                <div className="flex mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-lg"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm text-center line-clamp-4 group-hover:text-gray-200 transition-colors duration-300">{t.review}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Courses Timeline Section */}
        <section className="py-16 px-4 border-b border-gray-800">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Courses Available
          </motion.h2>
          <motion.h3
            className="text-xl font-semibold text-center mb-12 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Courses Covered In the Program
          </motion.h3>
          <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-8">
              {courses.filter((_, i) => i % 2 === 0).map((course, idx) => (
                <motion.div
                  key={course.number}
                  className="flex items-center gap-4 cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 group backdrop-blur-sm bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20"
                  onClick={() => handleCourseClick(course)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="relative w-40 h-24 overflow-hidden rounded-lg">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{course.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{course.desc}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
            {/* Timeline */}
            <div className="hidden md:flex flex-col items-center mx-8 relative">
              <div className="absolute top-0 bottom-0 w-1 bg-purple-800 left-1/2 -translate-x-1/2"></div>
              {courses.map((course, idx) => (
                <React.Fragment key={course.number}>
                  <motion.div
                    className="flex flex-col items-center relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 border-4 border-purple-500 text-2xl font-bold mb-2 shadow-lg shadow-purple-500/50 group-hover:border-blue-500 transition-all duration-300">
                      {course.number}
                    </div>
                    {idx !== courses.length - 1 && <div className="w-1 h-16 bg-transparent"></div>}
                  </motion.div>
                </React.Fragment>
              ))}
              <motion.button
                className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-110 relative z-10 border border-green-400/30"
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
            <div className="flex-1 flex flex-col gap-8">
              {courses.filter((_, i) => i % 2 === 1).map((course, idx) => (
                <motion.div
                  key={course.number}
                  className="flex items-center gap-4 cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 group backdrop-blur-sm bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20"
                  onClick={() => handleCourseClick(course)}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{course.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{course.desc}</p>
                  </div>
                  <div className="relative w-40 h-24 overflow-hidden rounded-lg">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Reviews Section */}
        <section className="py-16 px-4 border-b border-gray-800">
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Project reviews from students
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            {projectReviews.map((review, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg flex flex-col items-center shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleInfo(review.review)}
              >
                <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full mb-4 border-2 border-green-400" />
                <h4 className="font-bold mb-2">{review.name}</h4>
                <p className="text-gray-300 text-sm text-center">{review.review}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Topics Tag Cloud & Community Stats */}
        <section className="py-16 px-4 border-b border-gray-800">
          <motion.h3
            className="text-2xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            100+ topics taught...
          </motion.h3>
          <motion.div
            className={`flex flex-wrap justify-center gap-3 mb-4 transition-all duration-500 ${showAllTopics ? 'max-h-none' : 'max-h-40 overflow-hidden'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {(showAllTopics ? topics : topics.slice(0, 20)).map((topic, idx) => (
              <motion.span
                key={idx}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: "#4B5563" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {topic}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full transform transition hover:scale-105"
              onClick={() => setShowAllTopics((v) => !v)}
            >
              {showAllTopics ? "Show less" : "Show more"}
            </button>
          </motion.div>

          {/* Community Stats */}
          <div ref={statsRef} className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="group relative backdrop-blur-sm bg-gray-800/30 p-8 rounded-xl text-center min-w-[240px] shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"/>
                <div className="relative z-10">
                  <div className="text-4xl font-bold mb-3 flex justify-center items-baseline bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    <motion.span 
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isStatsVisible ? animatedStats[stat.label] : 0}
                    </motion.span>
                    <span className="inline-block ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                  <div className="mt-4 h-1 w-full bg-gray-700/50 rounded-full overflow-hidden">
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
        <section className="py-16 px-4 border-b border-gray-800">
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Commonly asked questions
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="mb-4 border-b border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <button
                  className="w-full text-left py-4 px-4 text-lg font-semibold flex justify-between items-center focus:outline-none hover:bg-gray-800 rounded-t-lg transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <span
                    className="transform transition-transform duration-300"
                    style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0)' }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="transition-all duration-300 overflow-hidden"
                  style={{
                    maxHeight: openFaq === idx ? '500px' : '0',
                    opacity: openFaq === idx ? 1 : 0
                  }}
                >
                  <div className="py-4 px-4 text-gray-300 text-base bg-gray-800 rounded-b-lg">
                    {faq.a}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
} 