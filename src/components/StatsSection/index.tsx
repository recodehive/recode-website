import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

const stats: StatItem[] = [
  { value: "10,000+", label: "Active Learners", icon: "👥" },
  { value: "100+", label: "Hours of Content", icon: "⏱️" },
  { value: "24/7", label: "Community Support", icon: "💬" },
  { value: "4.9/5", label: "Average Rating", icon: "⭐" },
];

const StatCard: React.FC<{ stat: StatItem; index: number }> = ({
  stat,
  index,
}) => {
  return (
    <motion.div
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
      {stat.icon && <div className={styles.statIcon}>{stat.icon}</div>}
      <motion.div
        className={styles.statValue}
        aria-label={stat.value}
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
        {stat.value}
      </motion.div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.statsGrid}
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
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
