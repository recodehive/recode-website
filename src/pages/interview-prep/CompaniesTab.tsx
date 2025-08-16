import React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "@docusaurus/Link"
import {
    Search,
    ChevronDown,
    Users,
    MessageSquare,
    Building2,
    Target,
    Lightbulb,
    Star,
    TrendingUp,
    Award,
    Zap,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"

interface CompanyTip {
    company: string
    logo: string
    focus: string
    industry: string
    roleTypes: string[]
    tips: string[]
    commonQuestions: Array<{
        question: string
        answer: string
        category: string
    }>
    focusAreas: string[]
}

interface CompaniesTabProps {
    companyTips?: CompanyTip[];
    toggleTips: (index: number) => void;
    toggleQuestions: (index: number) => void;
    showTips: { [key: number]: boolean };
    showQuestions: { [key: number]: boolean };
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const CompaniesTab: React.FC<CompaniesTabProps> = ({ companyTips=[] }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedIndustry, setSelectedIndustry] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({})

    const filteredCompanies = useMemo(() => {
        return (companyTips || []).filter((company) => {
            const matchesSearch =
                company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.focusAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry
            const matchesRole = !selectedRole || company.roleTypes.includes(selectedRole)

            return matchesSearch && matchesIndustry && matchesRole
        })
    }, [companyTips, searchTerm, selectedIndustry, selectedRole])

    const industries = [...new Set((companyTips || []).map((c) => c.industry))]
    const roles = [...new Set((companyTips || []).flatMap((c) => c.roleTypes))]

    const toggleQuestion = (companyIndex: number, questionIndex: number) => {
        const key = `${companyIndex}-${questionIndex}`
        setExpandedQuestions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div className="text-center mb-16" variants={fadeIn}>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Master FAANG+ Company Interviews
                </div>
                <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Company-Specific Interview Prep</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Get insider knowledge, real interview questions, and proven strategies for landing your dream job at top tech
                    companies
                </p>
            </motion.div>

            <motion.div
                className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-12 mb-16 overflow-hidden border company-blue-border"
                variants={fadeIn}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                            backgroundSize: "20px 20px",
                        }}
                    ></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
                            <span className="text-4xl mr-4">🏢</span>
                            FAANG+ Companies Overview
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Navigate the unique interview processes of the world's most competitive tech companies
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            {
                                title: "Big Tech Focus",
                                icon: "🎯",
                                description: "Google, Amazon, Meta, Apple, Netflix, Microsoft + emerging unicorns",
                                color: "from-blue-500 to-blue-600",
                                bgColor: "bg-blue-500",
                                stats: "6+ Companies",
                            },
                            {
                                title: "Interview Styles",
                                icon: "💼",
                                description: "System Design, Behavioral, Coding, Product Sense, Leadership",
                                color: "from-green-500 to-green-600",
                                bgColor: "bg-green-500",
                                stats: "5 Categories",
                            },
                            {
                                title: "Success Factors",
                                icon: "⭐",
                                description: "Company culture fit, technical excellence, leadership principles",
                                color: "from-purple-500 to-purple-600",
                                bgColor: "bg-purple-500",
                                stats: "95% Success",
                            },
                            {
                                title: "Real Questions",
                                icon: "❓",
                                description: "Actual questions from recent interviews with detailed answers",
                                color: "from-orange-500 to-orange-600",
                                bgColor: "bg-orange-500",
                                stats: "100+ Questions",
                            },
                        ]?.map((item, i) => (
                            item?(<motion.div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg relative overflow-hidden`}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white opacity-20 rounded-2xl"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    />
                                    <span className="relative z-10">{item.icon}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{item.description}</p>
                                <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                                    {item.stats}
                                </div>
                            </motion.div>):null
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 rounded-xl">
                        {[
                            { metric: "92%", label: "Interview Success Rate", icon: "📈", color: "text-green-600" },
                            { metric: "150+", label: "Companies Covered", icon: "🏢", color: "text-blue-600" },
                            { metric: "50K+", label: "Successful Candidates", icon: "👥", color: "text-purple-600" },
                        ]?.map((stat, i) => (
                            stat?(
                            <motion.div
                                key={i}
                                className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border company-border"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            >
                                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.metric}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                                    <span>{stat.icon}</span>
                                    {stat.label}
                                </div>
                            </motion.div>):null
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
            >
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Search companies, focus areas, technologies, or interview types..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 custom-input bg-gray-50 dark:bg-gray-700 text-white border-gray-200 dark:border-gray-600 rounded-xl text-lg"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-w-[140px]"
                        >
                            <option value="">All Industries</option>
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className=" px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
                        >
                            <option value="">All Roles</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Showing {filteredCompanies.length} of {companyTips?.length||0} companies
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        Updated weekly with latest interview insights
                    </div>
                </div>
            </motion.div>

            <div className="space-y-12">
                {filteredCompanies.map((company, companyIndex) => {
                    const [isOpen, setIsOpen] = useState(false)
                    return (
                        <motion.div key={companyIndex} variants={fadeIn} className="group">
                            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0">
                                {/* --------- HEADER --------- */}
                                <CardHeader className="pb-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-indigo-900/20 relative">
                                    {/* Background pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                                                backgroundSize: "24px 24px",
                                            }}
                                        ></div>
                                    </div>

                                    <div className="relative z-10 mt-8">
                                        <div className="flex items-start gap-6 mb-6">
                                            {/* logo */}
                                            <motion.div
                                                className="relative"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <img
                                                    src={company.logo || "/placeholder.svg"}
                                                    alt={`${company.company} logo`}
                                                    className="w-20 h-20 rounded-2xl object-contain bg-white p-3 shadow-lg border border-gray-100"
                                                />
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                    <Award className="w-3 h-3 text-white" />
                                                </div>
                                            </motion.div>

                                            {/* title + focus */}
                                            <div className="flex-1">
                                                <CardTitle className="text-3xl mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {company.company}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="-mt-5">
                                                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                    </div>
                                                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg leading-tight">
                                                        Focus: {company.focus}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {company.focusAreas.slice(0, 4).map((area, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="secondary"
                                                            className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                                                        >
                                                            {area}
                                                        </Badge>
                                                    ))}
                                                    {company.focusAreas.length > 4 && (
                                                        <Badge variant="outline" className="text-sm px-3 py-1 rounded-full">
                                                            +{company.focusAreas.length - 4} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* demand + industry */}
                                            <div className="text-right">
                                                <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-2">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    High Demand
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{company.industry}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
                                                <Users className="w-4 h-4" />
                                                Common roles:
                                                {company.roleTypes.map((role, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="outline"
                                                        className="text-sm border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full company-border"
                                                    >
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </span>

                                            {/* collapse toggle */}
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            >
                                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                                </motion.div>
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* --------- COLLAPSIBLE CONTENT --------- */}
                                <motion.div
                                    initial={false}
                                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <CardContent className="space-y-8 p-8">
                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* Key Preparation Tips */}
                                            <motion.div
                                                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-800 company-green-border"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <h4 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 text-xl">
                                                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                                        <Lightbulb className="w-5 h-5 text-white" />
                                                    </div>
                                                    Key Preparation Tips
                                                </h4>
                                                <ul className="space-y-4">
                                                    {company.tips.map((tip, i) => (
                                                        <motion.li
                                                            key={i}
                                                            className="flex items-start gap-4 group"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                                        >
                                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                                                                <span className="text-white text-xs font-bold">{i + 1}</span>
                                                            </div>
                                                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>

                                            {/* Common Interview Questions */}
                                            <motion.div
                                                className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800 company-purple-border"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <h4 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 text-xl">
                                                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                                                        <MessageSquare className="w-5 h-5 text-white" />
                                                    </div>
                                                    Common Interview Questions
                                                </h4>
                                                <div className="space-y-4">
                                                    {company.commonQuestions.map((item, i) => {
                                                        const questionKey = `${companyIndex}-${i}`
                                                        const isExpanded = expandedQuestions[questionKey]

                                                        return (
                                                            <Collapsible key={i}>
                                                                <CollapsibleTrigger
                                                                    onClick={() => toggleQuestion(companyIndex, i)}
                                                                    className="w-full text-left"
                                                                >
                                                                    <motion.div
                                                                        className="question-card flex items-start justify-between gap-3 p-4 rounded-xl border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                    >
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2 leading-relaxed">
                                                                                "{item.question}"
                                                                            </p>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={`text-xs px-2 py-1 rounded-full ${item.category === "System Design"
                                                                                        ? "badge-system border-blue-300 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20"
                                                                                        : item.category === "Behavioral"
                                                                                            ? "badge-behavioral border-green-300 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20"
                                                                                            : item.category === "Technical"
                                                                                                ? "badge-technical border-purple-300 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20"
                                                                                                : "badge-other border-orange-300 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20"
                                                                                    }`}
                                                                            >
                                                                                {item.category}
                                                                            </Badge>
                                                                        </div>
                                                                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                        </motion.div>
                                                                    </motion.div>
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent>
                                                                    <motion.div
                                                                        className="mt-3 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-l-4 border-blue-500 company-blue-border"
                                                                        initial={{ opacity: 0, y: -10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                            {item.answer}
                                                                        </p>
                                                                    </motion.div>
                                                                </CollapsibleContent>
                                                            </Collapsible>
                                                        )
                                                    })}
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Contributors Section */}
                                        <motion.div
                                            className="border-t pt-8"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800 relative overflow-hidden technical-inner-success">
                                                <div className="absolute top-4 right-4 text-4xl opacity-20">🚀</div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                                                            <Users className="w-5 h-5 text-white" />
                                                        </div>
                                                        <h5 className="font-bold text-gray-900 dark:text-white text-xl">
                                                            Community Contributors Needed!
                                                        </h5>
                                                    </div>
                                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                                        Help keep {company.company}'s interview information current! Share recent questions, tips, or insights you've encountered to help fellow candidates succeed.
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="bg-white dark:bg-orange-900/20 hover:bg-orange-50 dark:hover:bg-orange-800 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-xl technical-inner-success"
                                                        >
                                                            <Zap className="w-4 h-4 mr-2" />
                                                            <Link to="/community" className="company-tab-community-link">Share Interview Experience</Link>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="bg-white dark:bg-orange-900/20 hover:bg-orange-50 dark:hover:bg-orange-800 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-xl technical-inner-success"
                                                        >
                                                            <MessageSquare className="w-4 h-4 mr-2" />
                                                            <Link to="/community" className="company-tab-community-link">Add Recent Questions</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </motion.div>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {filteredCompanies.length === 0 && (
                <motion.div variants={fadeIn} className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No companies match your current filters.</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchTerm("")
                            setSelectedIndustry("")
                            setSelectedRole("")
                        }}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Clear All Filters
                    </Button>
                </motion.div>
            )}

            <motion.div
                className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border-2 border-indigo-200 dark:border-indigo-800 overflow-hidden company-blue-border"
                variants={fadeIn}
            >
                {/* Background elements */}
                <div className="absolute top-10 right-10 text-6xl opacity-10">🤝</div>
                <div className="absolute bottom-10 left-10 text-4xl opacity-10">💡</div>

                <div className="relative z-10">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center mb-4">
                            <span className="text-5xl mr-4">🤝</span>
                            Join Our Interview Prep Community
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Help build the most comprehensive company interview resource and accelerate your career growth
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            {
                                title: "Share Experiences",
                                icon: "💬",
                                description: "Recent interview questions and experiences from your interviews",
                                color: "from-blue-500 to-blue-600",
                                bgColor: "bg-blue-500",
                                benefit: "Help 1000+ candidates",
                            },
                            {
                                title: "Update Tips",
                                icon: "💡",
                                description: "Company-specific preparation strategies and insider knowledge",
                                color: "from-green-500 to-green-600",
                                bgColor: "bg-green-500",
                                benefit: "Earn community points",
                            },
                            {
                                title: "Add Companies",
                                icon: "🏢",
                                description: "Request coverage for new companies and emerging startups",
                                color: "from-purple-500 to-purple-600",
                                bgColor: "bg-purple-500",
                                benefit: "Shape our roadmap",
                            },
                            {
                                title: "Improve Content",
                                icon: "✨",
                                description: "Enhance existing company profiles with updated information",
                                color: "from-orange-500 to-orange-600",
                                bgColor: "bg-orange-500",
                                benefit: "Get featured contributor",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700 company-border"
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div
                                    className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg relative overflow-hidden`}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white opacity-20 rounded-2xl"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    />
                                    <span className="relative z-10">{item.icon}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                                <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                                    {item.benefit}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="company-border">
                            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-12 py-4 text-mdx`x rounded-2xl shadow-lg">
                                <Users className="w-5 h-5 mr-3" />
                                <Link to="/community" className="company-tab-link">Join Community Discord</Link>
                            </Button>
                        </motion.div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            Join 50,000+ developers preparing for their dream jobs
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CompaniesTab
