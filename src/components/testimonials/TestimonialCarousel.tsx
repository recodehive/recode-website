import React from "react";
import { motion, Variants } from "framer-motion";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "The Recode Hive team are amazing to work with, very responsive. I'm a newbie to AI and they stepped us through the process",
    image: "/icons/ethan.png",
    name: "Ethan Trang",
    role: "AI Engineer @ Relevance AI",
  },
  {
    text: "The tech talent in Recode Hive is unparalleled. We worked with consultants who work in companies like Palantir, OpenAI, Relevance AI and more",
    image: "/icons/vivien.png",
    name: "Vivien Chen",
    role: "Founder @ Toastie (BC Y24)",
  },
  {
    text: "We were able to get our project scoped, matched and kicked off in one day. Our invoicing is now 10x faster, thanks to Recode Hive's automation.",
    image: "/icons/daniel.png",
    name: "Daniel Han",
    role: "Founder @ Unsloth AI (YC W24)",
  },
  {
    text: "You're constantly inspiring me to get applying for jobs and help me to improve my resume for 90+ ATS score and improve my LinkedIn profile.",
    image: "/icons/aryan.png",
    name: "Aryan Gupta",
    role: "Community Member",
  },
  {
    text: "Pointing out that my contributions all points back to my personal projects is an eye opener, especially now that I want to start building towards open source.",
    image: "/icons/donald.png",
    name: "Donald Anyamba",
    role: "Community Member",
  },
];

// Distribute testimonials across 3 columns dynamically to avoid hardcoded indices
const col1 = testimonials.filter((_, i) => i % 3 === 0);
const col2 = testimonials.filter((_, i) => i % 3 === 1);
const col3 = testimonials.filter((_, i) => i % 3 === 2);

// --- Vertical scrolling column ---
function TestimonialsColumn({
  testimonialsList,
  className,
  duration = 15,
  isDark,
}: {
  testimonialsList: Testimonial[];
  className?: string;
  duration?: number;
  isDark: boolean;
}) {
  const cardHeight = 160;
  const gap = 16;
  const itemHeight = cardHeight + gap;
  const cycleHeight = testimonialsList.length * itemHeight;
  const offset = itemHeight / 2;

  return (
    <div className={`overflow-hidden h-[352px] ${className || ""}`}>
      <motion.ul
        initial={{ y: -offset }}
        animate={{ y: -offset - cycleHeight }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col list-none m-0 p-0"
        style={{
          gap: `${gap}px`,
        }}
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonialsList.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow: isDark
                    ? "0 20px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)"
                    : "0 20px 40px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                className="p-5 rounded-2xl w-full max-w-[280px] cursor-default select-none group transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={{
                  height: `${cardHeight}px`,
                  minHeight: `${cardHeight}px`,
                  maxHeight: `${cardHeight}px`,
                  background: isDark ? "#111111" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isDark
                    ? "0 2px 16px rgba(0,0,0,0.3)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <blockquote className="m-0 p-0 flex flex-col h-full justify-between">
                  <p
                    className="leading-relaxed font-normal m-0 text-[12px] overflow-hidden line-clamp-3"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(0,0,0,0.6)",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                    }}
                  >
                    {text}
                  </p>
                  <footer className="flex items-center gap-2.5 mt-auto pt-2 flex-shrink-0">
                    <img
                      width={32}
                      height={32}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-8 w-8 rounded-full object-cover"
                      style={{
                        boxShadow: isDark
                          ? "0 0 0 2px rgba(255,255,255,0.08)"
                          : "0 0 0 2px rgba(0,0,0,0.06)",
                      }}
                    />
                    <div className="flex flex-col">
                      <cite
                        className="font-semibold not-italic tracking-tight leading-4 text-[12px]"
                        style={{
                          color: isDark ? "#ffffff" : "#0f172a",
                          fontFamily: "'Inter', -apple-system, sans-serif",
                        }}
                      >
                        {name}
                      </cite>
                      <span
                        className="text-[10px] leading-4 tracking-tight mt-0.5"
                        style={{
                          color: isDark
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(0,0,0,0.45)",
                        }}
                      >
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

// --- Main component ---
export function TestimonialCarousel() {
  const { isDark } = useSafeColorMode();

  return (
    <section className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Premium symmetric header — unified height & centered alignment */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="min-h-[150px] flex flex-col justify-center items-center text-center flex-shrink-0 mb-4 px-4"
      >
        <motion.div custom={0} variants={revealVariants} className="mb-2.5">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: isDark
                ? "rgba(99,102,241,0.08)"
                : "rgba(99,102,241,0.06)",
              border: isDark
                ? "1px solid rgba(99,102,241,0.15)"
                : "1px solid rgba(99,102,241,0.12)",
              color: isDark ? "#a5b4fc" : "#4338ca",
              fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
            }}
          >
            ✦ Testimonials
          </span>
        </motion.div>
        <motion.h2
          custom={1}
          variants={revealVariants}
          className="mb-2 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tighter"
          style={{
            color: isDark ? "#f1f5f9" : "#0f172a",
            fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
          }}
        >
          Builders ❤️{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Recode Hive
          </span>
        </motion.h2>
        <motion.p
          custom={2}
          variants={revealVariants}
          className="text-xs sm:text-sm leading-relaxed mx-auto max-w-lg"
          style={{
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: "'Inter', -apple-system, sans-serif",
          }}
        >
          Our builders go on to do incredible things from OpenAI to becoming AI engineers and founders.
        </motion.p>
      </motion.div>

      {/* 3-column vertical scroll — premium alignment */}
      <div
        className="flex justify-center gap-4 overflow-hidden relative"
        style={{
          height: "352px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <TestimonialsColumn
          testimonialsList={col1}
          duration={15}
          isDark={isDark}
        />
        <TestimonialsColumn
          testimonialsList={col2}
          className="hidden sm:block"
          duration={21}
          isDark={isDark}
        />
        <TestimonialsColumn
          testimonialsList={col3}
          className="hidden lg:block"
          duration={18}
          isDark={isDark}
        />
      </div>
    </section>
  );
}