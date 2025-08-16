import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

interface MockQuestion {
    type: string;
    question: string;
    difficulty?: string;
    framework?: string;
    hints: string[];
}

interface PracticeTabProps {
    mockInterviewQuestions: MockQuestion[];
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

const PracticeTab: React.FC<PracticeTabProps> = ({ mockInterviewQuestions }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Mock Interview Practice</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Practice with real interview questions</p>
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {mockInterviewQuestions.map((question, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                        variants={fadeIn}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${question.type === "technical"
                                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                    : question.type === "behavioral"
                                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                        : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                                    }`}
                            >
                                {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                            </span>
                            {question.difficulty && (
                                <span
                                    className={`px-2 py-1 rounded text-xs ${question.difficulty === "Easy"
                                        ? "bg-green-100 text-green-800"
                                        : question.difficulty === "Medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {question.difficulty}
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{question.question}</h3>

                        {question.framework && (
                            <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">Framework: {question.framework}</p>
                        )}

                        <div className="mb-4">
                            <button
                                onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                {selectedQuestion === index ? "Hide Hints" : "Show Hints"}
                            </button>
                        </div>

                        {selectedQuestion === index && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hints:</h4>
                                <ul className="space-y-1">
                                    {question.hints.map((hint, i) => (
                                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                                            • {hint}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Start Practice
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Practice Tools */}
            <motion.div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Practice Tools</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-4xl mb-4">⏱️</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Timed Practice</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Practice with real interview time constraints
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-4xl mb-4">🎥</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Video Recording</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Record yourself to improve presentation skills
                        </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-4xl mb-4">📊</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Progress Tracking</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Track your improvement over time</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PracticeTab;
