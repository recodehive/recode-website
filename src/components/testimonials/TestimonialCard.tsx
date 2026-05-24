import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSafeColorMode } from "../../utils/useSafeColorMode";


interface TestimonialCardProps {
  name: string;
  username: string;
  content: string;
  date: string;
  avatar: string;
  gradient?: string;
  borderColor?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  username,
  content,
  date,
  avatar,
  gradient,
  borderColor,
}) => {
  const { colorMode, isDark } = useSafeColorMode();

  const getBackgroundStyle = () => {
    let colorStop = "";
    if (gradient === "bg-pink-100") {
      colorStop = "rgba(244, 194, 214, 0.35)"; // Pink
    } else if (gradient === "bg-purple-100") {
      colorStop = "rgba(191, 190, 255, 0.35)"; // Blue/Lavender
    } else {
      colorStop = "rgba(165, 243, 252, 0.35)"; // Cyan
    }

    return {
      background: `
        radial-gradient(
          ellipse 600px 500px at 10% 85%,
          ${colorStop} 0%,
          rgba(255, 255, 255, 0) 70%
        ),
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.9) 100%
        )
      `,
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      border: "1px solid rgba(200, 200, 220, 0.4)",
    };
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative h-full w-full overflow-hidden rounded-3xl min-h-[550px] flex flex-col justify-between p-8`}
      style={getBackgroundStyle()}
    >
      {/* Subtle glossy overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)`,
        }}
      />

      {/* Soft shadow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-lg shadow-black/5" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Testimonial Quote - Top Section */}
        <div className="mb-12">
          <p className="text-2xl leading-relaxed font-semibold text-gray-900 tracking-tight">
            "{content.replace(/#\w+/g, '').trim()}"
          </p>
        </div>

        {/* Avatar and Info - Bottom Section */}
        <div className="mt-auto">
          <div className="flex items-center gap-6">
            {/* Large Avatar with White Background */}
            <Avatar className="h-20 w-20 overflow-hidden rounded-full border-3 border-white shadow-md flex-shrink-0 bg-white">
              <AvatarImage src={avatar} className="h-full w-full object-cover scale-125" />
              <AvatarFallback className="text-white font-bold text-lg bg-gradient-to-br from-purple-400 to-pink-400">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3
                className="testimonial-author-name mb-1 text-xl font-bold leading-tight tracking-tight"
                style={{ color: "#111827", opacity: 1, WebkitTextFillColor: "#111827" }}
              >
                {name}
              </h3>
              {username !== "AryanGupta" && username !== "DonaldAnyamba" && (
                <p
                  className="testimonial-author-role mb-3 text-sm font-medium"
                  style={{ color: "#334155", opacity: 1, WebkitTextFillColor: "#334155" }}
                >
                  {username === "VivienChen" ? "Founder @ Toastie (BC Y24)" :
                    username === "DanielHan" ? "Founder @ Unsloth AI (YC W24, BC Y24)" :
                      "AI Engineer @ Relevance AI"}
                </p>
              )}

              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: "#334155", opacity: 1, WebkitTextFillColor: "#334155" }}
              >
                <span className="font-medium">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
