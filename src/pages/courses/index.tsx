import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import './courses.css';

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
    img: "https://dummyimage.com/80x80/222/fff&text=S",
    name: "Sachin",
    review: "Sanjay has been a great support in knowing various career paths and upcoming tech. The call was very crisp but valueable at the same time. For sure I am gonna schedule a call probably next month to give him updates. Thanks a ton Sanjay :)",
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/333/fff&text=KP",
    name: "Kumar Priyanshu",
    review: "I was thoroughly impressed by his clear, engaging communication and deep understanding of my issue. He listened attentively and offered valuable insights and solutions, leaving me extremely satisfied and confident in the guidance I received." ,
    stars: 5,
  },
  {
    img: "https://dummyimage.com/80x80/444/fff&text=AV",
    name: "Aman Vohra",
    review: "It was an amazing session with you. And i can't thank you enough for your time and the great and valuable insights you have given me. Thank you so much🙌🏻",
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

function CoursesContent() {

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [modal, setModal] = useState({ open: false, content: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    Youtube: 0,
    LinkedIn: 0,
    Twitter: 0
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

  const handleCourseClick = (course: any) => {
    if (course.title.includes("Coming Soon")) {
      setModal({ open: true, content: "This course is coming soon!" });
    } else {
      window.location.href = `/courses/${course.title.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  const handleAction = (type: string) => {
    setModal({ open: true, content: type === "enroll" ? "Enrollment flow coming soon!" : "Purchase flow coming soon!" });
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
      <main className="courses-page min-h-screen transition-all duration-500">
        {/* Modal */}
        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 courses-fade-in p-4">
            <div className="courses-modal p-6 md:p-8 max-w-md w-full text-center relative courses-scale-in">
              <button
                className="courses-icon-button absolute top-3 right-3 text-xl md:text-2xl transition-transform hover:scale-110"
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
          className="courses-hero py-16 md:py-24 px-4 text-center relative overflow-hidden transition-all duration-500 border-b"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <div className="courses-container">
            <motion.h1
              className="courses-heading-1 courses-text-gradient mb-6 md:mb-8 relative z-10 tracking-tight"
              variants={fadeIn}
            >
              Transform Your Career<br className="hidden md:block" />
              <span className="block md:inline">in Data Engineering</span>
            </motion.h1>
            <div className="w-full flex justify-center">
              <motion.p
                className="courses-text-secondary courses-body-large max-w-2xl leading-relaxed font-medium mb-8 md:mb-12 text-center"
                variants={fadeIn}
              >
                Master the art of data engineering with industry-leading courses designed for{' '}
                <span className="font-bold courses-text-gradient">modern tech careers</span>.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 max-w-md md:max-w-none mx-auto"
              variants={fadeIn}
            >
              <button
                className="courses-button-primary group relative px-8 md:px-10 py-3 md:py-4 overflow-hidden rounded-2xl font-bold text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 border border-blue-400/20 courses-backdrop-blur"
                onClick={() => handleAction("enroll")}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Courses
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button
                className="courses-button-secondary group relative px-8 md:px-10 py-3 md:py-4 overflow-hidden rounded-2xl font-bold text-base md:text-lg shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => handleAction("curriculum")}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Curriculum
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>

          {/* Tech Tags */}
          <motion.div
            className="courses-container"
            variants={fadeIn}
          >
            <div
              ref={techTagsRef}
              className="flex overflow-x-auto courses-hide-scrollbar gap-2 mb-8 pb-4 whitespace-nowrap"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-2 px-4 md:px-0">
                {techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="courses-topic-tag flex-shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Partner Logos */}
            <div className="mt-8">
              <h3 className="courses-text-secondary courses-body text-center font-medium mb-6">Students now available at</h3>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {partnerLogos.map((logo, idx) => (
                  <motion.img
                    key={idx}
                    src={logo}
                    alt="Partner Logo"
                    className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Carousel */}
        <section className="courses-section py-16 md:py-24 px-4 relative overflow-hidden transition-all duration-500 border-b">
          <div className="courses-bg-overlay absolute inset-0"/>
          <div className="courses-container">
            <motion.h2
              className="courses-heading-2 courses-gradient-text text-center mb-12 md:mb-16 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore over 14+ extensive projects
            </motion.h2>
            <motion.div
              className="relative z-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <button
                  className="courses-nav-button absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 shadow-xl transform transition-all duration-300 hover:scale-110"
                  onClick={() => scrollProjects(-1)}
                >
                  &lt;
                </button>
                <div
                  ref={projectCarouselRef}
                  className="overflow-hidden courses-hide-scrollbar mx-12 md:mx-16"
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeProjectIndex * 100}%)` }}
                  >
                    {projects.map((img, idx) => (
                      <div
                        key={idx}
                        className="min-w-full flex justify-center px-2 md:px-4"
                        style={{ width: '100%', flexShrink: 0 }}
                      >
                        <img
                          src={img}
                          alt={`Project ${idx + 1}`}
                          className="rounded-xl shadow-lg hover:shadow-blue-500/30 transition transform hover:scale-105 cursor-pointer border-2 border-gray-700/50 hover:border-blue-500/50 w-full max-w-xs md:max-w-sm h-auto"
                          style={{ aspectRatio: '16/10' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="courses-nav-button absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 shadow-xl transform transition-all duration-300 hover:scale-110"
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
                      idx === activeProjectIndex ? 'active' : ''
                    }`}
                    onClick={() => goToProjectSlide(idx)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="courses-section py-16 md:py-24 px-4 relative overflow-hidden transition-all duration-500 border-b">
          <div className="courses-bg-overlay absolute inset-0"/>
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-gradient-text text-center mb-12 md:mb-16 tracking-tight leading-tight"
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
                  className="courses-card group cursor-pointer flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleInfo(t.review)}
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6">
                    <div className="absolute inset-0 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-blue-500 to-purple-500"/>
                    <img
                      src={t.img}
                      alt={t.name}
                      className="relative w-full h-full rounded-full object-cover border-3 transition-all duration-300 z-10 shadow-lg border-blue-400/50 group-hover:border-blue-400 shadow-blue-500/30"
                    />
                  </div>
                  <h4 className="courses-heading-4 courses-text-gradient mb-4">{t.name}</h4>
                  <div className="flex mb-4 gap-1">
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
                  <p className="courses-body-small text-center line-clamp-4 transition-colors duration-300 leading-relaxed courses-text-secondary">
                    {t.review}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Timeline Section */}
        <section className="courses-section py-16 md:py-24 px-4 transition-all duration-500 border-b">
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-gradient-text text-center mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Courses Available
            </motion.h2>
            <motion.h3
              className="courses-body-large courses-text-secondary text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Courses Covered In the Program
            </motion.h3>
            <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0">
              {/* Left column */}
              <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                {courses.filter((_, i) => i % 2 === 0).map((course, idx) => (
                  <motion.div
                    key={course.number}
                    className="courses-timeline-card flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-pointer group"
                    onClick={() => handleCourseClick(course)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="relative w-full sm:w-32 md:w-40 h-32 sm:h-20 md:h-24 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="courses-heading-4 courses-text-gradient mb-2 md:mb-3 line-clamp-2">{course.title}</h3>
                      <p className="courses-body-small courses-text-secondary line-clamp-2 md:line-clamp-3 leading-relaxed">{course.desc}</p>
                    </div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300 courses-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                ))}
              </div>
              {/* Timeline */}
              <div className="hidden lg:flex flex-col items-center mx-6 xl:mx-8 relative">
                <div className="absolute top-0 bottom-0 w-1 left-1/2 -translate-x-1/2 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                {courses.map((course, idx) => (
                  <React.Fragment key={course.number}>
                    <motion.div
                      className="flex flex-col items-center relative z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <div className="w-12 h-12 xl:w-16 xl:h-16 flex items-center justify-center rounded-full border-4 text-lg xl:text-2xl font-bold mb-2 bg-gradient-to-br from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-500/50">
                        {course.number}
                      </div>
                      {idx !== courses.length - 1 && <div className="w-1 h-12 xl:h-16 bg-transparent"></div>}
                    </motion.div>
                  </React.Fragment>
                ))}
                <motion.button
                  className="courses-button-primary mt-8 xl:mt-12 py-3 xl:py-4 px-8 xl:px-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 relative z-10"
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
              <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                {courses.filter((_, i) => i % 2 === 1).map((course, idx) => (
                  <motion.div
                    key={course.number}
                    className="courses-timeline-card flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-pointer group"
                    onClick={() => handleCourseClick(course)}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="flex-1 min-w-0 order-2 sm:order-1">
                      <h3 className="courses-heading-4 courses-text-gradient mb-2 md:mb-3 line-clamp-2">{course.title}</h3>
                      <p className="courses-body-small courses-text-secondary line-clamp-2 md:line-clamp-3 leading-relaxed">{course.desc}</p>
                    </div>
                    <div className="relative w-full sm:w-32 md:w-40 h-32 sm:h-20 md:h-24 overflow-hidden rounded-lg flex-shrink-0 order-1 sm:order-2">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </div>
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300 courses-text-muted flex-shrink-0 order-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Enroll Button */}
              <div className="lg:hidden mt-8 flex justify-center">
                <motion.button
                  className="courses-button-primary py-3 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
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
        <section className="courses-stats-section py-16 md:py-20 px-4 transition-all duration-500 border-b">
          <div className="courses-container-wide">
            <motion.h2
              className="courses-heading-2 courses-text-primary text-center mb-8 md:mb-12"
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
                  className="courses-card flex flex-col items-center text-center cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleInfo(review.review)}
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                    <div className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-green-400 to-emerald-500"/>
                    <img
                      src={review.img}
                      alt={review.name}
                      className="relative w-full h-full rounded-full object-cover border-3 border-green-400 group-hover:border-green-300 transition-all duration-300 z-10 shadow-lg"
                    />
                  </div>
                  <h4 className="courses-heading-4 courses-text-gradient mb-3 md:mb-4">{review.name}</h4>
                  <p className="courses-body-small courses-text-secondary text-center leading-relaxed line-clamp-4">
                    {review.review}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Tag Cloud & Community Stats */}
        <section className="courses-section py-16 md:py-20 px-4 transition-all duration-500 border-b">
          <div className="courses-container-wide">
            <motion.h3
              className="courses-heading-3 courses-text-primary text-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              100+ topics taught...
            </motion.h3>
            <motion.div
              className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-6 transition-all duration-500 ${showAllTopics ? 'max-h-none' : 'max-h-32 md:max-h-40 overflow-hidden'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {(showAllTopics ? topics : topics.slice(0, 20)).map((topic, idx) => (
                <motion.span
                  key={idx}
                  className="courses-topic-tag"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {topic}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                className="courses-button-ghost px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105"
                onClick={() => setShowAllTopics((v) => !v)}
              >
                {showAllTopics ? "Show less" : "Show more"}
              </button>
            </motion.div>
          </div>

          {/* Community Stats */}
          <div ref={statsRef} className="courses-grid courses-grid-3 mt-8 md:mt-12">
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
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 flex justify-center items-baseline courses-text-gradient">
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isStatsVisible ? animatedStats[stat.label] : 0}
                    </motion.span>
                    <span className="inline-block ml-1 text-lg md:text-xl lg:text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="courses-body-large courses-text-secondary font-semibold transition-colors duration-300 mb-4 md:mb-6">
                    {stat.label}
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300">
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
        <section className="courses-faq-section py-16 md:py-20 px-4 transition-all duration-500 border-b">
          <div className="courses-container">
            <motion.h2
              className="courses-heading-2 courses-text-primary text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Commonly asked questions
            </motion.h2>
            <div className="max-w-3xl mx-auto">
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
                    className="courses-faq-button w-full text-left py-4 md:py-6 px-4 md:px-6 courses-body md:courses-body-large font-semibold flex justify-between items-center focus:outline-none transition-all duration-300"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span
                      className="transform transition-transform duration-300 text-xl md:text-2xl flex-shrink-0"
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
                    <div className="courses-faq-answer py-4 md:py-6 px-4 md:px-6 courses-body leading-relaxed">
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