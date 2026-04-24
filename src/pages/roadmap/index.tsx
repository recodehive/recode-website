import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import { roadmaps } from "../../data/roadmaps";
import "./roadmap.css";

const RoadmapCard = ({ roadmap, index }: { roadmap: any; index: number }) => {
  return (
    <motion.div
      className="roadmap-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="roadmap-card-icon">
        {roadmap.id === "html" ? "🌐" : roadmap.id === "css" ? "🎨" : "🚀"}
      </div>
      <h3 className="roadmap-card-title">{roadmap.title}</h3>
      <p className="roadmap-card-description">{roadmap.description}</p>
      
      <div className="roadmap-card-stats">
        <span className="roadmap-stat">{roadmap.lessons.length} Lessons</span>
        <a href={roadmap.lessons[0]?.link || "#"} className="roadmap-button" target="_blank" rel="noopener noreferrer">
          View Roadmap
        </a>
      </div>
    </motion.div>
  );
};

export default function RoadmapPage(): JSX.Element {
  return (
    <Layout
      title="Learning Roadmaps"
      description="Follow our structured learning paths to master modern web development technologies."
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="roadmap-page">
        <div className="container">
          <section className="roadmap-hero">
            <motion.h1 
              className="roadmap-hero-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Learning Roadmaps
            </motion.h1>
            <motion.p 
              className="roadmap-hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Guided paths to help you navigate through the vast landscape of modern technology. 
              Step by step, from zero to hero.
            </motion.p>
          </section>

          <div className="roadmap-grid">
            {roadmaps.map((roadmap, index) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
