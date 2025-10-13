import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MockQuestion {
  id: string;
  type: "technical" | "behavioral" | "system-design" | (string & {});
  question: string;
  difficulty: "Easy" | "Medium" | "Hard" | (string & {});
  framework?: string;
  hints: string[];
  estimatedTime: number;
  category?: string;
  links?: {
    title: string;
    url: string;
    type:
      | "documentation"
      | "tutorial"
      | "example"
      | "reference"
      | "tool"
      | (string & {});
  }[];
}

interface PracticeSession {
  questionId: string;
  timeSpent: number;
  completed: boolean;
  startTime?: number;
}

interface PracticeStats {
  totalCompleted: number;
  averageTime: number;
  easyCompleted: number;
  mediumCompleted: number;
  hardCompleted: number;
  technicalCompleted: number;
  behavioralCompleted: number;
  systemDesignCompleted: number;
}

interface PracticeTabProps {
  mockInterviewQuestions?: MockQuestion[];
  onTabChange?: (tab: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const PracticeTab: React.FC<PracticeTabProps> = ({
  mockInterviewQuestions = [],
  onTabChange,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<PracticeSession | null>(
    null,
  );
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [practiceStats, setPracticeStats] = useState<PracticeStats>({
    totalCompleted: 0,
    averageTime: 0,
    easyCompleted: 0,
    mediumCompleted: 0,
    hardCompleted: 0,
    technicalCompleted: 0,
    behavioralCompleted: 0,
    systemDesignCompleted: 0,
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [showHints, setShowHints] = useState<Set<string>>(new Set());
  const [showResources, setShowResources] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(
    null,
  );

  const allQuestions = [...mockInterviewQuestions];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && activeSession) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeSession]);

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  const filteredQuestions = allQuestions.filter((q) => {
    const typeMatch = filterType === "all" || q.type === filterType;
    const difficultyMatch =
      filterDifficulty === "all" || q.difficulty === filterDifficulty;
    return typeMatch && difficultyMatch;
  });

  const startPractice = (question: MockQuestion) => {
    const session: PracticeSession = {
      questionId: question.id,
      timeSpent: 0,
      completed: false,
      startTime: Date.now(),
    };
    setActiveSession(session);
    setTimer(0);
    setIsTimerRunning(true);
    setSelectedQuestion(question.id);
  };

  const completePractice = () => {
    if (activeSession) {
      const timeSpent = Math.floor(timer / 60);
      setCompletedQuestions(
        (prev) => new Set([...prev, activeSession.questionId]),
      );
      setRecentlyCompleted(activeSession.questionId);
      setShowConfetti(true);

      const question = allQuestions.find(
        (q) => q.id === activeSession.questionId,
      );
      if (question) {
        setPracticeStats((prev) => ({
          ...prev,
          totalCompleted: prev.totalCompleted + 1,
          averageTime: Math.round(
            (prev.averageTime * prev.totalCompleted + timeSpent) /
              (prev.totalCompleted + 1),
          ),
        }));
      }
    }
    setIsTimerRunning(false);
    setActiveSession(null);
    setSelectedQuestion(null);
    setTimer(0);

    setTimeout(() => setRecentlyCompleted(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700";
      case "Medium":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-700";
      case "Hard":
        return "bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 dark:from-rose-900/30 dark:to-red-900/30 dark:text-rose-200 border border-rose-200 dark:border-rose-700";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-700";
      case "behavioral":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-200 border border-green-200 dark:border-green-700";
      case "system-design":
        return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-700";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600";
    }
  };

  const toggleHints = (questionId: string) => {
    setShowHints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleResources = (questionId: string) => {
    setShowResources((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleTabNavigation = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const progressPercentage =
    allQuestions.length > 0
      ? (practiceStats.totalCompleted / allQuestions.length) * 100
      : 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative"
    >
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="animate-bounce text-6xl">🎉</div>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="mb-12" variants={fadeIn}>
        <div className="border-gradient-to-r rounded-3xl border-2 bg-gradient-to-br from-indigo-50 from-indigo-200 via-purple-50 to-pink-50 to-purple-200 p-8 shadow-2xl backdrop-blur-sm dark:from-indigo-800 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 dark:to-purple-800">
          <div className="mb-8 text-center">
            <motion.div
              className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg dark:border-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="mr-3 h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              Interactive Practice Sessions
            </motion.div>
            <motion.h2
              className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-black text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Mock Interview Practice
            </motion.h2>
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              Simulate real interview scenarios with our interactive practice
              sessions. Track your progress, time your responses, and get
              instant feedback to improve your interview performance.
            </p>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-3">
            <motion.div
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
              onClick={() => handleTabNavigation("technical")}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-blue-900/40 dark:to-cyan-900/40"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-3xl">💻</span>
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Technical Deep Dive
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  Explore comprehensive technical resources, coding patterns,
                  and algorithm practice.
                </p>
                <div className="flex items-center font-bold text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                  Go to Technical Tab
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
              onClick={() => handleTabNavigation("behavioral")}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-green-900/40 dark:to-emerald-900/40"
                  whileHover={{ rotate: -5 }}
                >
                  <span className="text-3xl">🗣️</span>
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Behavioral Mastery
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  Master the STAR method and practice storytelling for
                  behavioral interviews.
                </p>
                <div className="flex items-center font-bold text-green-600 group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300">
                  Go to Behavioral Tab
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
              onClick={() => handleTabNavigation("companies")}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:from-purple-900/40 dark:to-pink-900/40"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-3xl">🏢</span>
                </motion.div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  Company Research
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  Research specific companies, their interview processes, and
                  preparation strategies.
                </p>
                <div className="flex items-center font-bold text-purple-600 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300">
                  Go to Companies Tab
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4"
        variants={fadeIn}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-8 text-center shadow-lg dark:border-blue-700/50 dark:from-blue-900/30 dark:via-blue-800/40 dark:to-indigo-800/50"
          whileHover={{ scale: 1.05 }}
          variants={scaleIn}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          <div className="relative z-10">
            <motion.div
              className="mb-2 text-4xl font-black text-blue-600 dark:text-blue-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {practiceStats.totalCompleted}
            </motion.div>
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
              Completed
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-green-200/50 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 p-8 text-center shadow-lg dark:border-green-700/50 dark:from-green-900/30 dark:via-green-800/40 dark:to-emerald-800/50"
          whileHover={{ scale: 1.05 }}
          variants={scaleIn}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          <div className="relative z-10">
            <div className="mb-2 text-4xl font-black text-green-600 dark:text-green-400">
              {practiceStats.averageTime}m
            </div>
            <div className="text-sm font-bold text-green-700 dark:text-green-300">
              Avg Time
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 p-8 text-center shadow-lg dark:border-purple-700/50 dark:from-purple-900/30 dark:via-purple-800/40 dark:to-violet-800/50"
          whileHover={{ scale: 1.05 }}
          variants={scaleIn}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-400/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          <div className="relative z-10">
            <div className="mb-2 text-4xl font-black text-purple-600 dark:text-purple-400">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm font-bold text-purple-700 dark:text-purple-300">
              Progress
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-purple-200 dark:bg-purple-800">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-orange-200/50 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 p-8 text-center shadow-lg dark:border-orange-700/50 dark:from-orange-900/30 dark:via-orange-800/40 dark:to-amber-800/50"
          whileHover={{ scale: 1.05 }}
          variants={scaleIn}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          <div className="relative z-10">
            <motion.div
              className="mb-2 text-4xl font-black text-orange-600 dark:text-orange-400"
              animate={isTimerRunning ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              {isTimerRunning ? formatTime(timer) : "00:00"}
            </motion.div>
            <div className="text-sm font-bold text-orange-700 dark:text-orange-300">
              Current
            </div>
            {isTimerRunning && (
              <motion.div
                className="mx-auto mt-2 h-2 w-2 rounded-full bg-red-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-8 rounded-2xl border-2 border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/90"
        variants={fadeIn}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Filter by Type:
            </label>
            <motion.select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="system-design">System Design</option>
            </motion.select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Filter by Difficulty:
            </label>
            <motion.select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 shadow-lg transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="all">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </motion.select>
          </div>
          <motion.div
            className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-100 to-slate-100 px-6 py-3 text-sm font-bold text-gray-600 shadow-lg dark:border-gray-600 dark:from-gray-700 dark:to-slate-700 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-black text-blue-600 dark:text-blue-400">
              {filteredQuestions.length}
            </span>{" "}
            of{" "}
            <span className="font-black text-purple-600 dark:text-purple-400">
              {allQuestions.length}
            </span>{" "}
            questions
          </motion.div>
        </div>
      </motion.div>

      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        <AnimatePresence>
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800/95 ${
                activeSession?.questionId === question.id
                  ? "border-blue-500 ring-4 shadow-blue-200/50 ring-blue-200/50 dark:shadow-blue-800/50 dark:ring-blue-800/50"
                  : recentlyCompleted === question.id
                    ? "border-green-500 ring-4 shadow-green-200/50 ring-green-200/50 dark:shadow-green-800/50 dark:ring-green-800/50"
                    : "border-gray-200/50 hover:border-gray-300/70 dark:border-gray-700/50 dark:hover:border-gray-600/70"
              }`}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              layout
            >
              <AnimatePresence>
                {recentlyCompleted === question.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-400/20"
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 1 }}
                      className="text-6xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-8 pb-4">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.span
                      className={`rounded-full px-4 py-2 text-sm font-bold shadow-lg ${getTypeColor(question.type)}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {question.type === "system-design"
                        ? "System Design"
                        : question.type.charAt(0).toUpperCase() +
                          question.type.slice(1)}
                    </motion.span>
                    <AnimatePresence>
                      {completedQuestions.has(question.id) && (
                        <motion.div
                          className="flex items-center space-x-2 rounded-full border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 shadow-lg dark:border-green-700 dark:from-green-900/40 dark:to-emerald-900/40"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.span
                            className="text-lg text-green-600 dark:text-green-400"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.5 }}
                          >
                            ✓
                          </motion.span>
                          <span className="text-xs font-bold text-green-700 dark:text-green-300">
                            Completed
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.span
                      className={`rounded-full px-4 py-2 text-xs font-black shadow-lg ${getDifficultyColor(question.difficulty)}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {question.difficulty}
                    </motion.span>
                    <motion.div
                      className="rounded-full border border-gray-200 bg-gradient-to-r from-gray-100 to-slate-100 px-3 py-2 text-xs font-bold text-gray-500 shadow-lg dark:border-gray-600 dark:from-gray-700 dark:to-slate-700 dark:text-gray-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      ~{question.estimatedTime}min
                    </motion.div>
                  </div>
                </div>

                <h3 className="mb-6 text-xl leading-tight font-black text-gray-900 dark:text-white">
                  {question.question}
                </h3>

                {question.framework && (
                  <motion.div
                    className="mb-6 rounded-xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 shadow-lg dark:border-blue-700/50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="-mb-3 flex items-center space-x-3">
                      <motion.span
                        className="-mt-5 text-xl text-blue-600 dark:text-blue-400"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        💡
                      </motion.span>
                      <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        Framework: {question.framework}
                      </p>
                    </div>
                  </motion.div>
                )}

                {question.category && (
                  <div className="mb-6 flex items-center space-x-3">
                    <span className="text-lg text-gray-400">📂</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      {question.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 px-8 pb-4">
                <motion.button
                  onClick={() => toggleHints(question.id)}
                  className="group flex w-full items-center justify-between space-x-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-800 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-400 dark:hover:bg-gray-600/50 dark:hover:text-gray-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.span
                      className="text-lg"
                      animate={{ rotate: showHints.has(question.id) ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showHints.has(question.id) ? "🔽" : "▶️"}
                    </motion.span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {showHints.has(question.id) ? "Hide Hints" : "Show Hints"}
                    </span>
                  </div>
                  <motion.span
                    className="rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-700 dark:from-blue-900/40 dark:to-purple-900/40 dark:text-blue-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {question.hints.length}
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {showHints.has(question.id) && (
                    <motion.div
                      className="mt-6 rounded-xl border-2 border-gray-200/50 bg-gradient-to-br from-gray-50 to-slate-50 p-6 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-slate-700/50"
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="mb-4 flex items-center space-x-3 font-black text-gray-900 dark:text-white">
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          💡
                        </motion.span>
                        <span className="text-gray-900 dark:text-white">
                          Helpful Hints:
                        </span>
                      </h4>
                      <ul className="space-y-4">
                        {question.hints.map((hint, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start space-x-4 text-sm text-gray-700 dark:text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.span
                              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-cyan-100 text-xs font-black text-blue-500 shadow-lg dark:border-blue-700 dark:from-blue-900/40 dark:to-cyan-900/40"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              {i + 1}
                            </motion.span>
                            <span className="leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                              {hint}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {question.links && question.links.length > 0 && (
                  <div className="mt-6">
                    <motion.button
                      onClick={() => toggleResources(question.id)}
                      className="group flex w-full items-center justify-between space-x-3 rounded-xl border-2 border-indigo-200/50 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-3 text-sm text-gray-600 shadow-lg transition-colors hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 hover:text-gray-800 dark:border-indigo-700/50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 dark:text-gray-400 dark:hover:from-indigo-800/40 dark:hover:via-purple-800/40 dark:hover:to-pink-800/40 dark:hover:text-gray-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.span
                          className="text-lg"
                          animate={{
                            rotate: showResources.has(question.id) ? 90 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {showResources.has(question.id) ? "🔽" : "▶️"}
                        </motion.span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {showResources.has(question.id)
                            ? "Hide Resources"
                            : "Show Resources"}
                        </span>
                      </div>
                      <motion.span
                        className="rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:border-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {question.links.length}
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {showResources.has(question.id) && (
                        <motion.div
                          className="mt-4 rounded-xl border-2 border-indigo-200/50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 shadow-lg backdrop-blur-sm dark:border-indigo-700/50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30"
                          initial={{ opacity: 0, height: 0, y: -20 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="mb-4 flex items-center space-x-3 font-black text-gray-900 dark:text-white">
                            <motion.span
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              🔗
                            </motion.span>
                            <span className="text-gray-900 dark:text-white">
                              Helpful Resources:
                            </span>
                          </h4>
                          <div className="grid gap-3">
                            {question.links.map((link, i) => {
                              const getLinkTypeIcon = (type: string) => {
                                switch (type) {
                                  case "documentation":
                                    return "📚";
                                  case "tutorial":
                                    return "🎓";
                                  case "example":
                                    return "💡";
                                  case "reference":
                                    return "📖";
                                  case "tool":
                                    return "🛠️";
                                  default:
                                    return "🔗";
                                }
                              };

                              const getLinkTypeColor = (type: string) => {
                                switch (type) {
                                  case "documentation":
                                    return "from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700";
                                  case "tutorial":
                                    return "from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700";
                                  case "example":
                                    return "from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700";
                                  case "reference":
                                    return "from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700";
                                  case "tool":
                                    return "from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700";
                                  default:
                                    return "from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
                                }
                              };

                              return (
                                <motion.a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center space-x-4 bg-gradient-to-r p-4 ${getLinkTypeColor(link.type)} group practice-tab-link rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <motion.span
                                    className="flex-shrink-0 text-2xl"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {getLinkTypeIcon(link.type)}
                                  </motion.span>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm leading-tight font-bold group-hover:underline">
                                      {link.title}
                                    </div>
                                    <div className="mt-1 text-xs font-medium capitalize opacity-75">
                                      {link.type.replace("-", " ")}
                                    </div>
                                  </div>
                                  <motion.span
                                    className="flex-shrink-0 text-lg opacity-60 group-hover:opacity-100"
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Number.POSITIVE_INFINITY,
                                    }}
                                  >
                                    →
                                  </motion.span>
                                </motion.a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="mt-auto px-8 pb-8">
                <AnimatePresence mode="wait">
                  {activeSession?.questionId === question.id ? (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="rounded-xl border-2 border-blue-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-lg dark:border-blue-700/50 dark:from-blue-900/30 dark:to-indigo-900/30">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2 text-sm font-bold text-blue-700 dark:text-blue-300">
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            >
                              🎯
                            </motion.span>
                            <span className="text-gray-900 dark:text-white">
                              Session Active
                            </span>
                          </span>
                          <motion.span
                            className="text-2xl font-black text-blue-600 dark:text-blue-400"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            {formatTime(timer)}
                          </motion.span>
                        </div>
                      </div>
                      <motion.button
                        onClick={completePractice}
                        className="flex w-full items-center justify-center space-x-3 rounded-xl border-2 border-green-500/20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-4 font-black text-white shadow-2xl transition-all hover:from-green-700 hover:via-emerald-700 hover:to-green-800 hover:shadow-green-500/25"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          ✓
                        </motion.span>
                        <span className="text-gray-900 dark:text-white">
                          Complete Practice
                        </span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={() => startPractice(question)}
                      disabled={!!activeSession}
                      className={`flex w-full items-center justify-center space-x-3 rounded-xl border-2 py-4 font-black shadow-2xl transition-all ${
                        completedQuestions.has(question.id)
                          ? "cursor-default border-gray-300 bg-gradient-to-r from-gray-200 to-slate-200 text-gray-600 dark:border-gray-500 dark:from-gray-600 dark:to-slate-600 dark:text-gray-300"
                          : activeSession
                            ? "cursor-not-allowed border-gray-400 bg-gradient-to-r from-gray-300 to-slate-300 text-gray-500 dark:border-gray-600 dark:from-gray-700 dark:to-slate-700 dark:text-gray-400"
                            : "border-blue-500/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-blue-500/25"
                      }`}
                      whileHover={
                        !completedQuestions.has(question.id) && !activeSession
                          ? { scale: 1.02, y: -2 }
                          : {}
                      }
                      whileTap={
                        !completedQuestions.has(question.id) && !activeSession
                          ? { scale: 0.98 }
                          : {}
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {completedQuestions.has(question.id) ? (
                        <>
                          <motion.span
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            ✓
                          </motion.span>
                          <span className="text-gray-900 dark:text-white">
                            Completed
                          </span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={
                              !activeSession ? { scale: [1, 1.2, 1] } : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            🚀
                          </motion.span>
                          <span className="text-gray-900 dark:text-white">
                            Start Practice
                          </span>
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="rounded-3xl border-2 border-gray-200/50 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 p-10 shadow-2xl backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-800 dark:via-slate-800 dark:to-gray-700"
        variants={fadeIn}
      >
        <motion.h3
          className="mb-10 text-center text-3xl font-black text-gray-900 dark:text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Practice Features & Tools
        </motion.h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "⏱️",
              title: "Live Timer",
              desc: "Real-time countdown with session tracking to simulate interview pressure",
              color: "blue",
            },
            {
              icon: "📊",
              title: "Progress Analytics",
              desc: "Track completion rates and performance trends over time",
              color: "green",
            },
            {
              icon: "🎯",
              title: "Smart Filtering",
              desc: "Filter by type, difficulty, and completion status for focused practice",
              color: "purple",
            },
            {
              icon: "💡",
              title: "Guided Hints",
              desc: "STAR method templates and solution frameworks for better answers",
              color: "orange",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group rounded-2xl border-2 border-gray-200/50 bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
              whileHover={{ scale: 1.05, y: -5 }}
              variants={scaleIn}
              custom={index}
            >
              <motion.div
                className={`h-20 w-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 dark:from-${feature.color}-900/40 dark:to-${feature.color}-800/50 mx-auto mb-6 flex items-center justify-center rounded-2xl border shadow-lg border-${feature.color}-200 dark:border-${feature.color}-700 transition-transform duration-300 group-hover:scale-110`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">{feature.icon}</span>
              </motion.div>
              <h4 className="mb-3 text-lg font-black text-gray-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-sm leading-relaxed font-medium text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PracticeTab;
