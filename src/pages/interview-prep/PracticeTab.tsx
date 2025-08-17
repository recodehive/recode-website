import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MockQuestion {
    id: string
    type: "technical" | "behavioral" | "system-design" | (string & {})
    question: string
    difficulty: "Easy" | "Medium" | "Hard" | (string & {})
    framework?: string
    hints: string[]
    estimatedTime: number
    category?: string
    links?: {
        title: string
        url: string
        type: "documentation" | "tutorial" | "example" | "reference" | "tool" | (string & {})
    }[]
}

interface PracticeSession {
    questionId: string
    timeSpent: number
    completed: boolean
    startTime?: number
}

interface PracticeStats {
    totalCompleted: number
    averageTime: number
    easyCompleted: number
    mediumCompleted: number
    hardCompleted: number
    technicalCompleted: number
    behavioralCompleted: number
    systemDesignCompleted: number
}

interface PracticeTabProps {
    mockInterviewQuestions?: MockQuestion[]
    onTabChange?: (tab: string) => void
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const scaleIn = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } } }

const PracticeTab: React.FC<PracticeTabProps> = ({ mockInterviewQuestions = [], onTabChange }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
    const [activeSession, setActiveSession] = useState<PracticeSession | null>(null)
    const [timer, setTimer] = useState<number>(0)
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
    const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set())
    const [practiceStats, setPracticeStats] = useState<PracticeStats>({
        totalCompleted: 0,
        averageTime: 0,
        easyCompleted: 0,
        mediumCompleted: 0,
        hardCompleted: 0,
        technicalCompleted: 0,
        behavioralCompleted: 0,
        systemDesignCompleted: 0,
    })
    const [filterType, setFilterType] = useState<string>("all")
    const [filterDifficulty, setFilterDifficulty] = useState<string>("all")
    const [showHints, setShowHints] = useState<Set<string>>(new Set())
    const [showResources, setShowResources] = useState<Set<string>>(new Set())
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null)

    const allQuestions = [...mockInterviewQuestions]

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isTimerRunning && activeSession) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isTimerRunning, activeSession])

    useEffect(() => {
        if (showConfetti) {
            const timeout = setTimeout(() => setShowConfetti(false), 3000)
            return () => clearTimeout(timeout)
        }
    }, [showConfetti])

    const filteredQuestions = allQuestions.filter((q) => {
        const typeMatch = filterType === "all" || q.type === filterType
        const difficultyMatch = filterDifficulty === "all" || q.difficulty === filterDifficulty
        return typeMatch && difficultyMatch
    })

    const startPractice = (question: MockQuestion) => {
        const session: PracticeSession = {
            questionId: question.id,
            timeSpent: 0,
            completed: false,
            startTime: Date.now(),
        }
        setActiveSession(session)
        setTimer(0)
        setIsTimerRunning(true)
        setSelectedQuestion(question.id)
    }

    const completePractice = () => {
        if (activeSession) {
            const timeSpent = Math.floor(timer / 60)
            setCompletedQuestions((prev) => new Set([...prev, activeSession.questionId]))
            setRecentlyCompleted(activeSession.questionId)
            setShowConfetti(true)

            const question = allQuestions.find((q) => q.id === activeSession.questionId)
            if (question) {
                setPracticeStats((prev) => ({
                    ...prev,
                    totalCompleted: prev.totalCompleted + 1,
                    averageTime: Math.round((prev.averageTime * prev.totalCompleted + timeSpent) / (prev.totalCompleted + 1)),
                }))
            }
        }
        setIsTimerRunning(false)
        setActiveSession(null)
        setSelectedQuestion(null)
        setTimer(0)

        setTimeout(() => setRecentlyCompleted(null), 2000)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700"
            case "Medium":
                return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-700"
            case "Hard":
                return "bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 dark:from-rose-900/30 dark:to-red-900/30 dark:text-rose-200 border border-rose-200 dark:border-rose-700"
            default:
                return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "technical":
                return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
            case "behavioral":
                return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-200 border border-green-200 dark:border-green-700"
            case "system-design":
                return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-700"
            default:
                return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-700 dark:to-slate-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
        }
    }

    const toggleHints = (questionId: string) => {
        setShowHints((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(questionId)) {
                newSet.delete(questionId)
            } else {
                newSet.add(questionId)
            }
            return newSet
        })
    }

    const toggleResources = (questionId: string) => {
        setShowResources((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(questionId)) {
                newSet.delete(questionId)
            } else {
                newSet.add(questionId)
            }
            return newSet
        })
    }

    const handleTabNavigation = (tab: string) => {
        if (onTabChange) {
            onTabChange(tab)
        }
    }

    const progressPercentage = allQuestions.length > 0 ? (practiceStats.totalCompleted / allQuestions.length) * 100 : 0

    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative">
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
                    >
                        <div className="text-6xl animate-bounce">🎉</div>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div className="mb-12" variants={fadeIn}>
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 shadow-2xl backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <motion.div
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-6 shadow-lg border border-indigo-200 dark:border-indigo-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                            Interactive Practice Sessions
                        </motion.div>
                        <motion.h2
                            className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Mock Interview Practice
                        </motion.h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Simulate real interview scenarios with our interactive practice sessions. Track your progress, time your
                            responses, and get instant feedback to improve your interview performance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <motion.div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            onClick={() => handleTabNavigation("technical")}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                                    whileHover={{ rotate: 5 }}
                                >
                                    <span className="text-3xl">💻</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technical Deep Dive</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    Explore comprehensive technical resources, coding patterns, and algorithm practice.
                                </p>
                                <div className="text-blue-600 dark:text-blue-400 font-bold group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center">
                                    Go to Technical Tab
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            onClick={() => handleTabNavigation("behavioral")}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                                    whileHover={{ rotate: -5 }}
                                >
                                    <span className="text-3xl">🗣️</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Behavioral Mastery</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    Master the STAR method and practice storytelling for behavioral interviews.
                                </p>
                                <div className="text-green-600 dark:text-green-400 font-bold group-hover:text-green-700 dark:group-hover:text-green-300 flex items-center">
                                    Go to Behavioral Tab
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            onClick={() => handleTabNavigation("companies")}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                                    whileHover={{ rotate: 5 }}
                                >
                                    <span className="text-3xl">🏢</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Company Research</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    Research specific companies, their interview processes, and preparation strategies.
                                </p>
                                <div className="text-purple-600 dark:text-purple-400 font-bold group-hover:text-purple-700 dark:group-hover:text-purple-300 flex items-center">
                                    Go to Companies Tab
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" variants={fadeIn}>
                <motion.div
                    className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-900/30 dark:via-blue-800/40 dark:to-indigo-800/50 rounded-2xl shadow-lg p-8 text-center border-2 border-blue-200/50 dark:border-blue-700/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    variants={scaleIn}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <motion.div
                            className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                            {practiceStats.totalCompleted}
                        </motion.div>
                        <div className="text-sm text-blue-700 dark:text-blue-300 font-bold">Completed</div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-900/30 dark:via-green-800/40 dark:to-emerald-800/50 rounded-2xl shadow-lg p-8 text-center border-2 border-green-200/50 dark:border-green-700/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    variants={scaleIn}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">
                            {practiceStats.averageTime}m
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300 font-bold">Avg Time</div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 dark:from-purple-900/30 dark:via-purple-800/40 dark:to-violet-800/50 rounded-2xl shadow-lg p-8 text-center border-2 border-purple-200/50 dark:border-purple-700/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    variants={scaleIn}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                            {Math.round(progressPercentage)}%
                        </div>
                        <div className="text-sm text-purple-700 dark:text-purple-300 font-bold">Progress</div>
                        <div className="mt-3 w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 dark:from-orange-900/30 dark:via-orange-800/40 dark:to-amber-800/50 rounded-2xl shadow-lg p-8 text-center border-2 border-orange-200/50 dark:border-orange-700/50 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    variants={scaleIn}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <motion.div
                            className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2"
                            animate={isTimerRunning ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        >
                            {isTimerRunning ? formatTime(timer) : "00:00"}
                        </motion.div>
                        <div className="text-sm text-orange-700 dark:text-orange-300 font-bold">Current</div>
                        {isTimerRunning && (
                            <motion.div
                                className="mt-2 w-2 h-2 bg-red-500 rounded-full mx-auto"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                        )}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border-2 border-gray-200/50 dark:border-gray-700/50"
                variants={fadeIn}
            >
                <div className="flex flex-wrap gap-8 items-center">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Filter by Type:</label>
                        <motion.select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg font-medium"
                            whileFocus={{ scale: 1.02 }}
                        >
                            <option value="all">All Types</option>
                            <option value="technical">Technical</option>
                            <option value="behavioral">Behavioral</option>
                            <option value="system-design">System Design</option>
                        </motion.select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Filter by Difficulty:</label>
                        <motion.select
                            value={filterDifficulty}
                            onChange={(e) => setFilterDifficulty(e.target.value)}
                            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg font-medium"
                            whileFocus={{ scale: 1.02 }}
                        >
                            <option value="all">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </motion.select>
                    </div>
                    <motion.div
                        className="text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 px-6 py-3 rounded-xl font-bold shadow-lg border border-gray-200 dark:border-gray-600"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="font-black text-blue-600 dark:text-blue-400">{filteredQuestions.length}</span> of{" "}
                        <span className="font-black text-purple-600 dark:text-purple-400">{allQuestions.length}</span> questions
                    </motion.div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <AnimatePresence>
                    {filteredQuestions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden flex flex-col h-full relative ${activeSession?.questionId === question.id
                                    ? "border-blue-500 ring-4 ring-blue-200/50 dark:ring-blue-800/50 shadow-blue-200/50 dark:shadow-blue-800/50"
                                    : recentlyCompleted === question.id
                                        ? "border-green-500 ring-4 ring-green-200/50 dark:ring-green-800/50 shadow-green-200/50 dark:shadow-green-800/50"
                                        : "border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/70 dark:hover:border-gray-600/70"
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
                                        className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 z-10 flex items-center justify-center rounded-2xl"
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
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center space-x-4">
                                        <motion.span
                                            className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getTypeColor(question.type)}`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {question.type === "system-design"
                                                ? "System Design"
                                                : question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                                        </motion.span>
                                        <AnimatePresence>
                                            {completedQuestions.has(question.id) && (
                                                <motion.div
                                                    className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 px-3 py-2 rounded-full border border-green-200 dark:border-green-700 shadow-lg"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    <motion.span
                                                        className="text-green-600 dark:text-green-400 text-lg"
                                                        animate={{ rotate: [0, 360] }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        ✓
                                                    </motion.span>
                                                    <span className="text-green-700 dark:text-green-300 text-xs font-bold">Completed</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <motion.span
                                            className={`px-4 py-2 rounded-full text-xs font-black shadow-lg ${getDifficultyColor(question.difficulty)}`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {question.difficulty}
                                        </motion.span>
                                        <motion.div
                                            className="text-xs text-gray-500 dark:text-gray-400 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 px-3 py-2 rounded-full font-bold shadow-lg border border-gray-200 dark:border-gray-600"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            ~{question.estimatedTime}min
                                        </motion.div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                                    {question.question}
                                </h3>

                                {question.framework && (
                                    <motion.div
                                        className="mb-6 p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center space-x-3 -mb-3">
                                            <motion.span
                                                className="text-blue-600 dark:text-blue-400 text-xl -mt-5"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                            >
                                                💡
                                            </motion.span>
                                            <p className="text-sm text-blue-700 dark:text-blue-300 font-bold">
                                                Framework: {question.framework}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {question.category && (
                                    <div className="mb-6 flex items-center space-x-3">
                                        <span className="text-gray-400 text-lg">📂</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                            {question.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="px-8 pb-4 flex-1">
                                <motion.button
                                    onClick={() => toggleHints(question.id)}
                                    className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors group bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/50 w-full justify-between shadow-lg border border-gray-200 dark:border-gray-600"
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
                                        <span className="font-bold">{showHints.has(question.id) ? "Hide Hints" : "Show Hints"}</span>
                                    </div>
                                    <motion.span
                                        className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-bold border border-blue-200 dark:border-blue-700"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {question.hints.length}
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence>
                                    {showHints.has(question.id) && (
                                        <motion.div
                                            className="mt-6 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700/50 dark:to-slate-700/50 rounded-xl p-6 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-lg backdrop-blur-sm"
                                            initial={{ opacity: 0, height: 0, y: -20 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h4 className="font-black text-gray-900 dark:text-white mb-4 flex items-center space-x-3">
                                                <motion.span
                                                    animate={{ rotate: [0, 10, -10, 0] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                >
                                                    💡
                                                </motion.span>
                                                <span>Helpful Hints:</span>
                                            </h4>
                                            <ul className="space-y-4">
                                                {question.hints.map((hint, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-4"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <motion.span
                                                            className="text-blue-500 font-black text-xs bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-700 shadow-lg"
                                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {i + 1}
                                                        </motion.span>
                                                        <span className="leading-relaxed font-medium">{hint}</span>
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
                                            className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors group bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 px-4 py-3 rounded-xl hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 dark:hover:from-indigo-800/40 dark:hover:via-purple-800/40 dark:hover:to-pink-800/40 w-full justify-between shadow-lg border-2 border-indigo-200/50 dark:border-indigo-700/50"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <motion.span
                                                    className="text-lg"
                                                    animate={{ rotate: showResources.has(question.id) ? 90 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {showResources.has(question.id) ? "🔽" : "▶️"}
                                                </motion.span>
                                                <span className="font-bold">
                                                    {showResources.has(question.id) ? "Hide Resources" : "Show Resources"}
                                                </span>
                                            </div>
                                            <motion.span
                                                className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-bold border border-indigo-200 dark:border-indigo-700"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {question.links.length}
                                            </motion.span>
                                        </motion.button>

                                        <AnimatePresence>
                                            {showResources.has(question.id) && (
                                                <motion.div
                                                    className="mt-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border-2 border-indigo-200/50 dark:border-indigo-700/50 shadow-lg backdrop-blur-sm"
                                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <h4 className="font-black text-gray-900 dark:text-white mb-4 flex items-center space-x-3">
                                                        <motion.span
                                                            animate={{ scale: [1, 1.1, 1] }}
                                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                        >
                                                            🔗
                                                        </motion.span>
                                                        <span>Helpful Resources:</span>
                                                    </h4>
                                                    <div className="grid gap-3">
                                                        {question.links.map((link, i) => {
                                                            const getLinkTypeIcon = (type: string) => {
                                                                switch (type) {
                                                                    case "documentation":
                                                                        return "📚"
                                                                    case "tutorial":
                                                                        return "🎓"
                                                                    case "example":
                                                                        return "💡"
                                                                    case "reference":
                                                                        return "📖"
                                                                    case "tool":
                                                                        return "🛠️"
                                                                    default:
                                                                        return "🔗"
                                                                }
                                                            }

                                                            const getLinkTypeColor = (type: string) => {
                                                                switch (type) {
                                                                    case "documentation":
                                                                        return "from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                                                    case "tutorial":
                                                                        return "from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                                                                    case "example":
                                                                        return "from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700"
                                                                    case "reference":
                                                                        return "from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                                                                    case "tool":
                                                                        return "from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700"
                                                                    default:
                                                                        return "from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                                                                }
                                                            }

                                                            return (
                                                                <motion.a
                                                                    key={i}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`flex items-center space-x-4 p-4 bg-gradient-to-r ${getLinkTypeColor(link.type)} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 group practice-tab-link`}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    <motion.span
                                                                        className="text-2xl flex-shrink-0"
                                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        {getLinkTypeIcon(link.type)}
                                                                    </motion.span>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-bold text-sm leading-tight group-hover:underline">
                                                                            {link.title}
                                                                        </div>
                                                                        <div className="text-xs opacity-75 mt-1 capitalize font-medium">
                                                                            {link.type.replace("-", " ")}
                                                                        </div>
                                                                    </div>
                                                                    <motion.span
                                                                        className="text-lg opacity-60 group-hover:opacity-100 flex-shrink-0"
                                                                        animate={{ x: [0, 3, 0] }}
                                                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                                                    >
                                                                        →
                                                                    </motion.span>
                                                                </motion.a>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            <div className="px-8 pb-8 mt-auto">
                                <AnimatePresence mode="wait">
                                    {activeSession?.questionId === question.id ? (
                                        <motion.div
                                            className="space-y-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center space-x-2">
                                                        <motion.span
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                                        >
                                                            🎯
                                                        </motion.span>
                                                        <span>Session Active</span>
                                                    </span>
                                                    <motion.span
                                                        className="text-2xl font-black text-blue-600 dark:text-blue-400"
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                                    >
                                                        {formatTime(timer)}
                                                    </motion.span>
                                                </div>
                                            </div>
                                            <motion.button
                                                onClick={completePractice}
                                                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transition-all font-black flex items-center justify-center space-x-3 shadow-2xl hover:shadow-green-500/25 border-2 border-green-500/20"
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <motion.span
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                >
                                                    ✓
                                                </motion.span>
                                                <span>Complete Practice</span>
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            onClick={() => startPractice(question)}
                                            disabled={!!activeSession}
                                            className={`w-full py-4 rounded-xl transition-all font-black flex items-center justify-center space-x-3 shadow-2xl border-2 ${completedQuestions.has(question.id)
                                                    ? "bg-gradient-to-r from-gray-200 to-slate-200 dark:from-gray-600 dark:to-slate-600 text-gray-600 dark:text-gray-300 cursor-default border-gray-300 dark:border-gray-500"
                                                    : activeSession
                                                        ? "bg-gradient-to-r from-gray-300 to-slate-300 dark:from-gray-700 dark:to-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-400 dark:border-gray-600"
                                                        : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-blue-500/25 border-blue-500/20"
                                                }`}
                                            whileHover={!completedQuestions.has(question.id) && !activeSession ? { scale: 1.02, y: -2 } : {}}
                                            whileTap={!completedQuestions.has(question.id) && !activeSession ? { scale: 0.98 } : {}}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            {completedQuestions.has(question.id) ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: [0, 360] }}
                                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                    >
                                                        ✓
                                                    </motion.span>
                                                    <span>Completed</span>
                                                </>
                                            ) : (
                                                <>
                                                    <motion.span
                                                        animate={!activeSession ? { scale: [1, 1.2, 1] } : {}}
                                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                    >
                                                        🚀
                                                    </motion.span>
                                                    <span>Start Practice</span>
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
                className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-700 rounded-3xl p-10 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-2xl backdrop-blur-sm"
                variants={fadeIn}
            >
                <motion.h3
                    className="text-3xl font-black mb-10 text-gray-900 dark:text-white text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    🎯 Practice Features & Tools
                </motion.h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group"
                            whileHover={{ scale: 1.05, y: -5 }}
                            variants={scaleIn}
                            custom={index}
                        >
                            <motion.div
                                className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 dark:from-${feature.color}-900/40 dark:to-${feature.color}-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-${feature.color}-200 dark:border-${feature.color}-700 group-hover:scale-110 transition-transform duration-300`}
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="text-4xl">{feature.icon}</span>
                            </motion.div>
                            <h4 className="font-black text-gray-900 dark:text-white mb-3 text-lg">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default PracticeTab
