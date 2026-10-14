import { motion,useScroll,useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { BookOpen } from "lucide-react";

const ReadingPill = () => {
  const {scrollYProgress} = useScroll();
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress,"change",(latest)=>{
    setProgress(Math.round(Math.max(0, Math.min(1, latest)) * 100))
  })

  return (
    <div className="mb-4 pl-3">
      <div className="mb-2 flex justify-between text-xs font-medium">
        <span className="flex items-center gap-1 justify-center">
         <BookOpen size={16} className="text-gray-600"/> Reading Progress
          </span>
          <span className="text-gray-600">{progress}%</span>
      </div>

      <div
        className="h-1 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <motion.div
          className="h-full origin-left rounded-full bg-[#2e8555]"
          style={{ scaleX: progress / 100 }}
        />
      </div>
    </div>
  )
}

export default ReadingPill
