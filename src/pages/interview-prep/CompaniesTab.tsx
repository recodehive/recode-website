import React from "react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
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
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";

interface CompanyTip {
  company: string;
  logo: string;
  focus: string;
  industry: string;
  roleTypes: string[];
  tips: string[];
  commonQuestions: Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  focusAreas: string[];
}

interface CompaniesTabProps {
  companyTips?: CompanyTip[];
  toggleTips: (index: number) => void;
  toggleQuestions: (index: number) => void;
  showTips: { [key: number]: boolean };
  showQuestions: { [key: number]: boolean };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CompaniesTab: React.FC<CompaniesTabProps> = ({ companyTips = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<{
    [key: string]: boolean;
  }>({});

  const filteredCompanies = useMemo(() => {
    return (companyTips || []).filter((company) => {
      const matchesSearch =
        company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.focusAreas.some((area) =>
          area.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesIndustry =
        !selectedIndustry || company.industry === selectedIndustry;
      const matchesRole =
        !selectedRole || company.roleTypes.includes(selectedRole);

      return matchesSearch && matchesIndustry && matchesRole;
    });
  }, [companyTips, searchTerm, selectedIndustry, selectedRole]);

  const industries = [...new Set((companyTips || []).map((c) => c.industry))];
  const roles = [...new Set((companyTips || []).flatMap((c) => c.roleTypes))];

  const toggleQuestion = (companyIndex: number, questionIndex: number) => {
    const key = `${companyIndex}-${questionIndex}`;
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const [expandedCompanies, setExpandedCompanies] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleCompany = (index: number) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      <motion.div className="mb-16 text-center" variants={fadeIn}>
        <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
          Master FAANG+ Company Interviews
        </div>
        <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
          Company-Specific Interview Prep
        </h2>
        <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200">
          Get insider knowledge, real interview questions, and proven strategies
          for landing your dream job at top tech companies
        </p>
      </motion.div>

      <motion.div
        className="company-outer relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-12 mb-16 overflow-hidden border company-blue-border"
        className="company-blue-border relative mb-16 overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-12 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-indigo-900/20"
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

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h3 className="mb-4 flex items-center justify-center text-3xl font-bold text-gray-900 dark:text-white">
              <span className="mr-4 text-4xl">🏢</span>
              FAANG+ Companies Overview
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Navigate the unique interview processes of the world's most
              competitive tech companies
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Big Tech Focus",
                icon: "🎯",
                description:
                  "Google, Amazon, Meta, Apple, Netflix, Microsoft + emerging unicorns",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500",
                stats: "6+ Companies",
              },
              {
                title: "Interview Styles",
                icon: "💼",
                description:
                  "System Design, Behavioral, Coding, Product Sense, Leadership",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-500",
                stats: "5 Categories",
              },
              {
                title: "Success Factors",
                icon: "⭐",
                description:
                  "Company culture fit, technical excellence, leadership principles",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500",
                stats: "95% Success",
              },
              {
                title: "Real Questions",
                icon: "❓",
                description:
                  "Actual questions from recent interviews with detailed answers",
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-500",
                stats: "100+ Questions",
              },
            ]?.map((item, i) =>
              item ? (
                <motion.div
                  key={i}
                  className="transform rounded-2xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div
                    className={`h-16 w-16 bg-gradient-to-br ${item.color} relative mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-2xl text-2xl font-bold text-white shadow-lg`}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white opacity-20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10 text-inherit">
                      {item.icon}
                    </span>
                  </div>
                  <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 pill-badge">
                  <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {item.stats}
                  </div>
                </motion.div>
              ) : null,
            )}
          </div>

          <div className="grid gap-8 rounded-xl md:grid-cols-3">
            {[
              {
                metric: "92%",
                label: "Interview Success Rate",
                icon: "📈",
                color: "text-green-600",
              },
              {
                metric: "150+",
                label: "Companies Covered",
                icon: "🏢",
                color: "text-blue-600",
              },
              {
                metric: "50K+",
                label: "Successful Candidates",
                icon: "👥",
                color: "text-purple-600",
              },
            ]?.map((stat, i) =>
              stat ? (
                <motion.div
                  key={i}
                  className="company-border rounded-xl border bg-white/50 p-6 text-center backdrop-blur-sm dark:bg-gray-800/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.metric}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-inherit">{stat.icon}</span>
                    {stat.label}
                  </div>
                </motion.div>
              ) : null,
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search companies, focus areas, technologies, or interview types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-input h-12 rounded-xl border-gray-200 bg-gray-50 pl-12 text-lg text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="min-w-[140px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="min-w-[120px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Building2 className="h-4 w-4" />
            Showing {filteredCompanies.length} of {companyTips?.length || 0}{" "}
            companies
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Star className="h-3 w-3" />
            Updated weekly with latest interview insights
          </div>
        </div>
      </motion.div>

      <div className="space-y-12">
        {filteredCompanies.map((company, companyIndex) => {
          const isOpen = expandedCompanies[companyIndex] || false;
          return (
            <motion.div key={companyIndex} variants={fadeIn} className="group">
              <Card className="transform overflow-hidden border-0 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                {/* --------- HEADER --------- */}
                <CardHeader className="company-outer pb-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-indigo-900/20 relative">
                <CardHeader className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pb-6 dark:from-gray-800 dark:via-blue-900/20 dark:to-indigo-900/20">
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
                    <div className="mb-6 flex items-start gap-6">
                      {/* logo */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={`${company.company} logo`}
                          className="h-20 w-20 rounded-2xl border border-gray-100 bg-white object-contain p-3 shadow-lg"
                        />
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                          <Award className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>

                      {/* title + focus */}
                      <div className="flex-1">
                        <CardTitle className="mb-3 text-3xl text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {company.company}
                        </CardTitle>
                        <div className="mb-4 flex items-center gap-2">
                          <div className="-mt-5">
                            <Target className="h-5 w-5 flex-shrink-0 text-blue-600" />
                          </div>
                          <p className="text-lg leading-tight font-semibold text-blue-600 dark:text-blue-400">
                            Focus: {company.focus}
                          </p>
                        </div>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {company.focusAreas.slice(0, 4).map((area, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {area}
                            </Badge>
                          ))}
                          {company.focusAreas.length > 4 && (
                            <Badge
                              variant="outline"
                              className="rounded-full px-3 py-1 text-sm"
                            >
                              +{company.focusAreas.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* demand + industry */}
                      <div className="text-right">
                        <div className="mb-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          High Demand
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {company.industry}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        Common roles:
                        {company.roleTypes.map((role, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="company-border rounded-full border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
                          >
                            {role}
                          </Badge>
                        ))}
                      </span>

                      {/* collapse toggle */}
                      <button
                        onClick={() => toggleCompany(companyIndex)}
                        className="rounded-full p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </CardHeader>

                {/* --------- COLLAPSIBLE CONTENT --------- */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <CardContent className="space-y-8 p-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Key Preparation Tips */}
                      <motion.div
                        className="company-green-border rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-8 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h4 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500">
                            <Lightbulb className="h-5 w-5 text-white" />
                          </div>
                          Key Preparation Tips
                        </h4>
                        <ul className="space-y-4">
                          {company.tips.map((tip, i) => (
                            <motion.li
                              key={i}
                              className="group flex items-start gap-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 transition-transform group-hover:scale-110">
                                <span className="text-xs font-bold text-white">
                                  {i + 1}
                                </span>
                              </div>
                              <span className="leading-relaxed text-gray-800 dark:text-gray-200">
                                {tip}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Common Interview Questions */}
                      <motion.div
                        className="company-purple-border rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 dark:border-purple-800 dark:from-purple-900/20 dark:to-indigo-900/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h4 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500">
                            <MessageSquare className="h-5 w-5 text-white" />
                          </div>
                          Common Interview Questions
                        </h4>
                        <div className="space-y-4">
                          {company.commonQuestions.map((item, i) => {
                            const questionKey = `${companyIndex}-${i}`;
                            const isExpanded = expandedQuestions[questionKey];

                            return (
                              <Collapsible key={i}>
                                <CollapsibleTrigger
                                  onClick={() =>
                                    toggleQuestion(companyIndex, i)
                                  }
                                  className="w-full text-left"
                                >
                                  <motion.div
                                    className="question-card flex items-start justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="flex-1">
                                      <p className="mb-2 text-sm leading-relaxed font-semibold text-gray-900 dark:text-white">
                                        "{item.question}"
                                      </p>
                                      <Badge
                                        variant="outline"
                                        className={`rounded-full px-2 py-1 text-xs ${
                                          item.category === "System Design"
                                            ? "badge-system border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                            : item.category === "Behavioral"
                                              ? "badge-behavioral border-green-300 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                              : item.category === "Technical"
                                                ? "badge-technical border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                                : "badge-other border-orange-300 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                                        }`}
                                      >
                                        {item.category}
                                      </Badge>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                                    </motion.div>
                                  </motion.div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <motion.div
                                    className="company-blue-border mt-3 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                                      {item.answer}
                                    </p>
                                  </motion.div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
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
                      <div className="technical-inner-success relative overflow-hidden rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8 dark:border-yellow-800 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20">
                        <div className="absolute top-4 right-4 text-4xl opacity-20">
                          🚀
                        </div>
                        <div className="relative z-10">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                              Community Contributors Needed!
                            </h5>
                          </div>
                          <p className="mb-6 leading-relaxed text-gray-800 dark:text-gray-200">
                            Help keep {company.company}'s interview information
                            current! Share recent questions, tips, or insights
                            you've encountered to help fellow candidates
                            succeed.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="technical-inner-success rounded-xl border-orange-200 bg-white px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-800"
                            >
                              <Zap className="mr-2 h-4 w-4" />
                              <Link
                                to="/community"
                                className="company-tab-community-link"
                              >
                                Share Interview Experience
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="technical-inner-success rounded-xl border-orange-200 bg-white px-4 py-2 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-800"
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <Link
                                to="/community"
                                className="company-tab-community-link"
                              >
                                Add Recent Questions
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <motion.div
          variants={fadeIn}
          className="rounded-xl bg-white py-12 text-center shadow-lg dark:bg-gray-800"
        >
          <div className="mb-4 text-6xl">🔍</div>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No companies match your current filters.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedIndustry("");
              setSelectedRole("");
            }}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}

      <motion.div
        className="company-blue-border relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-12 dark:border-indigo-800 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
        variants={fadeIn}
      >
        {/* Background elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-10">🤝</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-10">💡</div>

        <div className="relative z-10">
          <div className="mb-12 text-center">
            <h3 className="mb-4 flex items-center justify-center text-4xl font-bold text-gray-900 dark:text-white">
              <span className="mr-4 text-5xl">🤝</span>
              Join Our Interview Prep Community
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Help build the most comprehensive company interview resource and
              accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pill-badge">
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Share Experiences",
                icon: "💬",
                description:
                  "Recent interview questions and experiences from your interviews",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500",
                benefit: "Help 1000+ candidates",
              },
              {
                title: "Update Tips",
                icon: "💡",
                description:
                  "Company-specific preparation strategies and insider knowledge",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-500",
                benefit: "Earn community points",
              },
              {
                title: "Add Companies",
                icon: "🏢",
                description:
                  "Request coverage for new companies and emerging startups",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500",
                benefit: "Shape our roadmap",
              },
              {
                title: "Improve Content",
                icon: "✨",
                description:
                  "Enhance existing company profiles with updated information",
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-500",
                benefit: "Get featured contributor",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="company-border transform rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`h-20 w-20 bg-gradient-to-br ${item.color} relative mx-auto mb-6 flex items-center justify-center overflow-hidden rounded-2xl text-3xl font-bold text-white shadow-lg`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative z-10 text-inherit">
                    {item.icon}
                  </span>
                </div>
                <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                  {item.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 pill-badge">
                <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {item.benefit}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="company-border"
            >
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-12 py-4 text-mdx`x rounded-2xl shadow-lg">
                <Users className="w-5 h-5 mr-3" />
                <Link to="/community" className="company-tab-link text-white">
              <Button className="text-mdx`x rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-4 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700">
                <Users className="mr-3 h-5 w-5" />
                <Link to="/community" className="company-tab-link">
                  Join Community Discord
                </Link>
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Join 50,000+ developers preparing for their dream jobs
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompaniesTab;
