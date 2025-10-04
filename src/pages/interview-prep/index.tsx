import React from "react"
import { useState } from "react"
import Layout from "@theme/Layout"
import Head from "@docusaurus/Head"
import { motion } from "framer-motion"
import Link from "@docusaurus/Link"
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx'
import OverviewTab from "./OverviewTab"
import TechnicalTab from "./TechnicalTab";
import BehavioralTab from "./BehavioralTab"
import CompaniesTab from "./CompaniesTab"
import PracticeTab from "./PracticeTab"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const InterviewPrepPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "behavioral" | "companies" | "practice">(
    "overview",
  )
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})
  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }))
  }

  const [showTips, setShowTips] = useState<{ [key: number]: boolean }>({})
  const [showQuestions, setShowQuestions] = useState<{ [key: number]: boolean }>({})

  const toggleTips = (index: number) => {
    setShowTips((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleQuestions = (index: number) => {
    setShowQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }
  const behavioralQuestions = [
    {
      category: "Leadership",
      questions: [
        "Tell me about a time you led a team through a difficult project",
        "Describe a situation where you had to influence others without authority",
        "How do you handle team conflicts?",
      ],
    },
    {
      category: "Problem Solving",
      questions: [
        "Describe the most challenging technical problem you've solved",
        "Tell me about a time you failed and what you learned",
        "How do you approach debugging complex issues?",
      ],
    },
    {
      category: "Communication",
      questions: [
        "Explain a complex technical concept to a non-technical person",
        "Tell me about a time you had to give difficult feedback",
        "How do you handle disagreements with stakeholders?",
      ],
    },
    {
      category: "Growth & Learning",
      questions: [
        "How do you stay updated with new technologies?",
        "Tell me about a time you had to learn something completely new",
        "What's the most important thing you've learned in your career?",
      ],
    },
  ]

  const companyTips = [
    {
      company: "Google",
      logo: "/img/google.png",
      focus: "Googleyness & Leadership",
      industry: "Technology",
      roleTypes: ["Software Engineer", "Product Manager", "Data Scientist", "Site Reliability Engineer"],
      focusAreas: ["Scalability", "Problem-Solving", "Innovation", "Technical Excellence"],
      tips: [
        "Focus on scalability and efficiency in your solutions",
        "Demonstrate analytical thinking with data-driven approaches",
        "Show passion for technology and continuous learning",
        "Prepare for system design questions with real-world examples",
        "Practice coding problems on platforms like LeetCode (focus on medium-hard)",
        "Understand Google's products and their technical challenges",
        "Be ready to discuss trade-offs in your technical decisions",
        "Show how you've handled ambiguous problems",
      ],
      commonQuestions: [
        {
          question: "How would you design Google Search?",
          answer:
            "Start with requirements gathering (billions of queries, sub-second response), then discuss web crawling architecture, inverted indexing, ranking algorithms like PageRank, distributed systems with load balancing, caching strategies at multiple levels, and real-time updates handling. Consider data freshness, personalization, and spam detection.",
          category: "System Design",
        },
        {
          question: "Explain how you would handle billions of queries per day",
          answer:
            "Implement horizontal scaling with load balancers, use CDNs for static content, implement multi-level caching (browser, CDN, application, database), database sharding and replication, microservices architecture, auto-scaling based on traffic patterns, and comprehensive monitoring with circuit breakers.",
          category: "System Design",
        },
        {
          question: "What would you do if Gmail was slow?",
          answer:
            "Systematic debugging approach: check monitoring dashboards, identify bottlenecks (database, network, application), analyze query performance, review caching hit rates, examine resource utilization, implement performance profiling, and deploy fixes like query optimization, caching improvements, or infrastructure scaling.",
          category: "Problem Solving",
        },
        {
          question: "Tell me about a time you solved a complex technical problem",
          answer:
            "Use STAR method: Situation (complex distributed system issue), Task (restore service and prevent recurrence), Action (systematic debugging, root cause analysis, implemented monitoring), Result (99.9% uptime improvement, prevented similar issues). Focus on technical depth and problem-solving methodology.",
          category: "Behavioral",
        },
        {
          question: "How do you stay updated with technology trends?",
          answer:
            "Demonstrate continuous learning: follow tech blogs, contribute to open source, attend conferences, experiment with new technologies, participate in tech communities, and apply learnings to solve real problems. Show specific examples.",
          category: "Behavioral",
        },
      ],
    },
    {
      company: "Amazon",
      logo: "/img/amazon.png",
      focus: "Leadership Principles",
      industry: "E-commerce/Cloud",
      roleTypes: ["Software Engineer", "Solutions Architect", "Product Manager", "DevOps Engineer"],
      focusAreas: ["Leadership Principles", "Customer Obsession", "Ownership", "Bias for Action"],
      tips: [
        "Master all 16 Leadership Principles with 2-3 specific examples each",
        "Use STAR method for all behavioral questions",
        "Focus on customer obsession in every answer",
        "Demonstrate ownership mindset and long-term thinking",
        "Prepare examples showing bias for action and delivering results",
        "Show how you've simplified processes or invented solutions",
        "Quantify your impact with specific metrics",
        "Be ready to discuss failures and learnings",
      ],
      commonQuestions: [
        {
          question: "Tell me about a time you disagreed with your manager",
          answer:
            "Use 'Have Backbone; Disagree and Commit' principle. Situation: disagreement on technical approach. Task: present alternative solution. Action: prepared data-driven analysis, respectfully presented concerns, listened to feedback. Result: adopted hybrid approach that improved performance by 40%. Committed fully once decision was made.",
          category: "Behavioral",
        },
        {
          question: "Describe a time you had to make a decision with incomplete information",
          answer:
            "Demonstrate 'Bias for Action'. Situation: critical system outage with limited debugging info. Task: restore service quickly. Action: gathered available data, made calculated decision based on patterns, implemented fix with rollback plan. Result: restored service in 30 minutes, prevented $100K revenue loss.",
          category: "Behavioral",
        },
        {
          question: "How do you handle tight deadlines?",
          answer:
            "Show 'Deliver Results' and 'Ownership'. Situation: product launch deadline at risk. Task: deliver core features on time. Action: prioritized ruthlessly, communicated trade-offs to stakeholders, worked with team to optimize scope. Result: launched on time with 95% of planned features, customer satisfaction remained high.",
          category: "Behavioral",
        },
        {
          question: "Design a system like Amazon's recommendation engine",
          answer:
            "Requirements: real-time recommendations, handle millions of users, personalized results. Architecture: data ingestion pipeline, feature engineering, ML models (collaborative filtering, content-based, deep learning), real-time serving layer, A/B testing framework, feedback loop for continuous improvement.",
          category: "System Design",
        },
        {
          question: "Tell me about a time you simplified a process",
          answer:
            "Use 'Invent and Simplify'. Situation: complex deployment process taking 4 hours. Task: reduce deployment time and errors. Action: automated manual steps, created CI/CD pipeline, added automated testing. Result: reduced deployment time to 30 minutes, decreased errors by 80%.",
          category: "Behavioral",
        },
      ],
    },
    {
      company: "Meta (Facebook)",
      logo: "/img/meta.png",
      focus: "Move Fast & Impact",
      industry: "Social Media/VR",
      roleTypes: ["Software Engineer", "Product Manager", "Data Scientist", "Research Scientist"],
      focusAreas: ["Scale", "Impact", "Execution", "People Connection"],
      tips: [
        "Focus on massive scale and global impact",
        "Demonstrate ability to move fast and iterate",
        "Show examples of connecting people or communities",
        "Prepare for questions about handling billions of users",
        "Understand Meta's products and their technical challenges",
        "Be ready to discuss privacy and safety considerations",
        "Show data-driven decision making",
        "Demonstrate growth mindset and learning from failures",
      ],
      commonQuestions: [
        {
          question: "How would you design Facebook's News Feed?",
          answer:
            "Requirements: personalized content, real-time updates, billions of users. Architecture: content ingestion, ranking algorithms (engagement prediction, relevance scoring), edge timeline generation, caching strategies, real-time updates with WebSockets, content moderation pipeline, and A/B testing framework.",
          category: "System Design",
        },
        {
          question: "Tell me about a time you had to make a trade-off between speed and quality",
          answer:
            "Situation: urgent security fix needed. Task: balance quick deployment with thorough testing. Action: implemented fix with comprehensive monitoring, deployed to small percentage first, gradually rolled out. Result: fixed security issue within 24 hours while maintaining system stability.",
          category: "Behavioral",
        },
        {
          question: "How would you handle a feature that's negatively impacting user engagement?",
          answer:
            "Data analysis approach: segment users, analyze metrics, identify root causes, A/B test solutions, gather qualitative feedback. Action: iterate quickly, measure impact, communicate with stakeholders. Focus on user value and long-term engagement over short-term metrics.",
          category: "Product Sense",
        },
        {
          question: "Design a system to detect fake accounts",
          answer:
            "Multi-layered approach: behavioral analysis (login patterns, friend requests), content analysis (spam detection), graph analysis (suspicious connection patterns), machine learning models, real-time scoring system, human review workflow, and continuous model improvement.",
          category: "System Design",
        },
        {
          question: "Tell me about a time you influenced without authority",
          answer:
            "Situation: cross-team project with conflicting priorities. Task: align teams on common goal. Action: built relationships, presented data showing mutual benefits, created shared success metrics. Result: successful project delivery, improved cross-team collaboration for future projects.",
          category: "Behavioral",
        },
      ],
    },
    {
      company: "Apple",
      logo: "/img/apple.png",
      focus: "Innovation & User Experience",
      industry: "Consumer Electronics",
      roleTypes: ["Software Engineer", "Hardware Engineer", "Product Manager", "Design Engineer"],
      focusAreas: ["User Experience", "Innovation", "Quality", "Privacy"],
      tips: [
        "Focus on user experience and design thinking",
        "Demonstrate attention to detail and quality",
        "Show passion for Apple products and ecosystem",
        "Prepare examples of innovative solutions",
        "Understand Apple's privacy-first approach",
        "Be ready to discuss cross-functional collaboration",
        "Show how you've delivered polished, user-friendly solutions",
        "Demonstrate ability to work under high standards",
      ],
      commonQuestions: [
        {
          question: "How would you improve Siri?",
          answer:
            "Focus on user experience: better natural language understanding, contextual awareness, privacy-preserving personalization, faster response times, expanded capabilities, seamless device integration, and accessibility improvements. Balance innovation with Apple's privacy principles.",
          category: "Product Design",
        },
        {
          question: "Tell me about a time you had to meet very high quality standards",
          answer:
            "Situation: developing user-facing feature with strict quality requirements. Task: deliver bug-free, polished experience. Action: implemented comprehensive testing, code reviews, user testing, performance optimization. Result: zero critical bugs in production, positive user feedback.",
          category: "Behavioral",
        },
        {
          question: "How would you design a privacy-focused messaging system?",
          answer:
            "End-to-end encryption, on-device processing, minimal data collection, secure key exchange, forward secrecy, metadata protection, secure deletion, and transparent privacy controls. Balance security with user experience and performance.",
          category: "System Design",
        },
        {
          question: "Describe a time you had to innovate under constraints",
          answer:
            "Situation: limited resources for new feature. Task: deliver innovative solution within constraints. Action: creative problem-solving, leveraged existing technologies, focused on core user value. Result: delivered feature that exceeded expectations while staying within budget.",
          category: "Behavioral",
        },
        {
          question: "How do you ensure your code is maintainable and scalable?",
          answer:
            "Clean code principles, comprehensive documentation, modular architecture, automated testing, code reviews, performance monitoring, and following established patterns. Focus on long-term maintainability and team collaboration.",
          category: "Technical",
        },
      ],
    },
    {
      company: "Netflix",
      logo: "/img/netflix.png",
      focus: "Freedom & Responsibility",
      industry: "Streaming/Entertainment",
      roleTypes: ["Software Engineer", "Data Engineer", "Product Manager", "ML Engineer"],
      focusAreas: ["Scale", "Personalization", "Reliability", "Data-Driven"],
      tips: [
        "Understand Netflix's culture of freedom and responsibility",
        "Focus on high-performance culture and results",
        "Demonstrate ability to work independently",
        "Show examples of data-driven decision making",
        "Prepare for questions about streaming at scale",
        "Understand personalization and recommendation systems",
        "Be ready to discuss A/B testing and experimentation",
        "Show how you've handled ambiguous problems",
      ],
      commonQuestions: [
        {
          question: "How would you design Netflix's recommendation system?",
          answer:
            "Multi-algorithm approach: collaborative filtering, content-based filtering, deep learning models, contextual bandits for exploration/exploitation, real-time personalization, A/B testing framework, and feedback loops. Handle cold start problem and diverse content catalog.",
          category: "System Design",
        },
        {
          question: "Tell me about a time you took ownership of a problem",
          answer:
            "Situation: critical service degradation affecting user experience. Task: identify and fix root cause. Action: took full ownership, coordinated with multiple teams, implemented both immediate fix and long-term solution. Result: restored service, prevented future occurrences.",
          category: "Behavioral",
        },
        {
          question: "How would you handle video streaming for millions of concurrent users?",
          answer:
            "CDN strategy, adaptive bitrate streaming, content pre-positioning, load balancing, caching at multiple levels, real-time monitoring, graceful degradation, and global infrastructure optimization. Consider peak traffic patterns and regional differences.",
          category: "System Design",
        },
        {
          question: "Describe a time you had to make a decision with limited data",
          answer:
            "Situation: new feature launch decision with incomplete user research. Task: decide on launch strategy. Action: analyzed available data, made assumptions explicit, designed experiments to validate quickly. Result: successful launch with rapid iteration based on real user feedback.",
          category: "Behavioral",
        },
      ],
    },
    {
      company: "Microsoft",
      logo: "/img/microsoft.png",
      focus: "Growth Mindset & Collaboration",
      industry: "Technology",
      roleTypes: ["Software Engineer", "Program Manager", "Cloud Architect", "AI Engineer"],
      focusAreas: ["Growth Mindset", "Collaboration", "Inclusive Design", "Cloud Computing"],
      tips: [
        "Emphasize continuous learning and growth mindset",
        "Show collaborative approach and inclusive thinking",
        "Demonstrate how you've helped others succeed",
        "Focus on impact, results, and customer value",
        "Prepare examples of learning from failures",
        "Understand Microsoft's mission and recent innovations",
        "Show experience with cloud technologies",
        "Demonstrate inclusive design thinking",
      ],
      commonQuestions: [
        {
          question: "How do you handle failure?",
          answer:
            "Growth mindset approach: acknowledge failure quickly, analyze root causes, extract learnings, apply improvements, share knowledge with team. Example: failed project taught me better stakeholder communication, leading to 30% improvement in project success rate.",
          category: "Behavioral",
        },
        {
          question: "Tell me about a time you helped a colleague",
          answer:
            "Situation: colleague struggling with complex technical problem. Task: help without taking over. Action: paired programming, knowledge sharing, mentoring approach. Result: colleague solved problem, gained new skills, became go-to person for similar issues.",
          category: "Behavioral",
        },
        {
          question: "How would you design Microsoft Teams?",
          answer:
            "Requirements: real-time communication, enterprise scale, security, integration. Architecture: WebRTC for video/audio, WebSocket for messaging, microservices, Azure cloud infrastructure, Office 365 integration, security/compliance features, cross-platform support.",
          category: "System Design",
        },
        {
          question: "What motivates you to learn new things?",
          answer:
            "Connect to growth mindset: curiosity about solving new problems, staying relevant in rapidly evolving tech landscape, helping customers achieve more, contributing to team success. Provide specific examples of recent learning and application.",
          category: "Behavioral",
        },
      ],
    },
  ]

  const mockInterviewQuestions = [
    // 🔹 Technical

    // Arrays & Strings
    {
      id: "tech-arr-1",
      type: "technical",
      question: "Find the first non-repeating character in a string",
      difficulty: "Easy",
      hints: ["Use a hash map to count frequencies", "Return the first character with count 1"],
      estimatedTime: 10,
      category: "Strings",
      links: [
        { title: "LeetCode - First Unique Character", url: "https://leetcode.com/problems/first-unique-character-in-a-string/", type: "example" },
        { title: "MDN - Map Object", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", type: "documentation" }
      ]
    },
    {
      id: "tech-arr-2",
      type: "technical",
      question: "Merge two sorted arrays without using extra space",
      difficulty: "Medium",
      hints: ["Two-pointer technique works well", "Consider edge cases where one array is empty"],
      estimatedTime: 15,
      category: "Arrays",
      links: [
        { title: "LeetCode - Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/", type: "example" },
        { title: "GeeksforGeeks - Merge Without Extra Space", url: "https://www.geeksforgeeks.org/merge-two-sorted-arrays-o1-extra-space/", type: "tutorial" }
      ]
    },

    // Linked Lists
    {
      id: "tech-ll-1",
      type: "technical",
      question: "Reverse a linked list",
      difficulty: "Medium",
      hints: ["Think about iterative vs recursive approach", "Consider edge cases like empty list"],
      estimatedTime: 20,
      category: "Linked List",
      links: [
        { title: "LeetCode - Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", type: "example" },
        { title: "GeeksforGeeks - Reverse Linked List", url: "https://www.geeksforgeeks.org/reverse-a-linked-list/", type: "tutorial" }
      ]
    },
    {
      id: "tech-ll-2",
      type: "technical",
      question: "Detect if a linked list has a cycle",
      difficulty: "Medium",
      hints: ["Use fast and slow pointers (Floyd’s cycle detection)", "Watch out for null references"],
      estimatedTime: 15,
      category: "Linked List",
      links: [
        { title: "LeetCode - Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/", type: "example" },
        { title: "GeeksForGeeks- Detect Loop in a Linked List", url: "https://www.geeksforgeeks.org/dsa/detect-loop-in-a-linked-list/", type: "reference" }
      ]
    },

    // Trees & Graphs
    {
      id: "tech-tree-1",
      type: "technical",
      question: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      hints: ["Use recursion (DFS)", "Think about base case (null node)"],
      estimatedTime: 10,
      category: "Trees",
      links: [
        { title: "LeetCode - Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", type: "example" },
        { title: "GeeksForGeeks - DFS", url: "https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/", type: "reference" }
      ]
    },
    {
      id: "tech-graph-1",
      type: "technical",
      question: "Clone a Graph",
      difficulty: "Medium",
      hints: ["Use DFS or BFS", "Maintain a hash map of visited nodes"],
      estimatedTime: 25,
      category: "Graphs",
      links: [
        { title: "LeetCode - Clone Graph", url: "https://leetcode.com/problems/clone-graph/", type: "example" },
        { title: "GeeksforGeeks - Clone Graph", url: "https://www.geeksforgeeks.org/clone-an-undirected-graph/", type: "tutorial" }
      ]
    },

    // Dynamic Programming
    {
      id: "tech-dp-1",
      type: "technical",
      question: "Climbing Stairs",
      difficulty: "Easy",
      hints: ["Think Fibonacci", "DP with memoization or bottom-up"],
      estimatedTime: 15,
      category: "Dynamic Programming",
      links: [
        { title: "LeetCode - Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", type: "example" },
        { title: "DP Introduction", url: "https://www.geeksforgeeks.org/dynamic-programming/", type: "tutorial" }
      ]
    },
    {
      id: "tech-dp-2",
      type: "technical",
      question: "Longest Increasing Subsequence",
      difficulty: "Medium",
      hints: ["DP with O(n^2)", "Can be optimized with Binary Search (O(n log n))"],
      estimatedTime: 35,
      category: "Dynamic Programming",
      links: [
        { title: "LeetCode - Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/", type: "example" },
        { title: "GeeksforGeeks - LIS Explained", url: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/", type: "tutorial" }
      ]
    },

    // Greedy Algorithms
    {
      id: "tech-greedy-1",
      type: "technical",
      question: "Jump Game",
      difficulty: "Medium",
      hints: ["Track the maximum reachable index", "Greedy works better than DP"],
      estimatedTime: 20,
      category: "Greedy",
      links: [
        { title: "LeetCode - Jump Game", url: "https://leetcode.com/problems/jump-game/", type: "example" },
        { title: "Greedy Algorithm Basics", url: "https://www.geeksforgeeks.org/greedy-algorithms/", type: "reference" }
      ]
    },
    {
      id: "tech-greedy-2",
      type: "technical",
      question: "Activity Selection Problem",
      difficulty: "Medium",
      hints: ["Sort by finish time", "Pick earliest finishing activity"],
      estimatedTime: 25,
      category: "Greedy",
      links: [
        { title: "GeeksforGeeks - Activity Selection", url: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", type: "tutorial" },
        { title: "MIT Greedy Algorithms Notes", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-notes/MIT6_006F11_lec05.pdf", type: "reference" }
      ]
    },

    // Bit Manipulation
    {
      id: "tech-bit-1",
      type: "technical",
      question: "Single Number (Find element appearing once)",
      difficulty: "Easy",
      hints: ["Use XOR property", "a ^ a = 0"],
      estimatedTime: 10,
      category: "Bit Manipulation",
      links: [
        { title: "LeetCode - Single Number", url: "https://leetcode.com/problems/single-number/", type: "example" },
        { title: "Bitwise Operators in C++", url: "https://cplusplus.com/doc/tutorial/operators/#bitwise", type: "documentation" }
      ]
    },
    {
      id: "tech-bit-2",
      type: "technical",
      question: "Number of 1 Bits (Hamming Weight)",
      difficulty: "Easy",
      hints: ["Use n & (n-1) trick", "Loop until n=0"],
      estimatedTime: 12,
      category: "Bit Manipulation",
      links: [
        { title: "LeetCode - Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/", type: "example" },
        { title: "Hamming Weight Explained", url: "https://www.geeksforgeeks.org/count-set-bits-in-an-integer/", type: "tutorial" }
      ]
    },

    // Sorting Algorithms
    {
      id: "tech-sort-1",
      type: "technical",
      question: "Sort Colors (Dutch National Flag problem)",
      difficulty: "Medium",
      hints: ["Use three pointers (low, mid, high)", "In-place solution required"],
      estimatedTime: 20,
      category: "Sorting",
      links: [
        { title: "LeetCode - Sort Colors", url: "https://leetcode.com/problems/sort-colors/", type: "example" },
        { title: "Dutch National Flag Problem", url: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/", type: "tutorial" }
      ]
    },
    {
      id: "tech-sort-2",
      type: "technical",
      question: "Kth Largest Element in an Array",
      difficulty: "Medium",
      hints: ["QuickSelect algorithm", "Or use Min-Heap"],
      estimatedTime: 25,
      category: "Sorting/Heap",
      links: [
        { title: "LeetCode - Kth Largest Element", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", type: "example" },
        { title: "QuickSelect Algorithm", url: "https://www.geeksforgeeks.org/quickselect-algorithm/", type: "tutorial" }
      ]
    },

    // Binary Search
    {
      id: "tech-bs-1",
      type: "technical",
      question: "Binary Search",
      difficulty: "Easy",
      hints: ["Classic divide and conquer", "Midpoint check"],
      estimatedTime: 10,
      category: "Binary Search",
      links: [
        { title: "LeetCode - Binary Search", url: "https://leetcode.com/problems/binary-search/", type: "example" },
        { title: "Binary Search Explained", url: "https://www.geeksforgeeks.org/binary-search/", type: "tutorial" }
      ]
    },
    {
      id: "tech-bs-2",
      type: "technical",
      question: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium",
      hints: ["Modified binary search", "Check mid vs right"],
      estimatedTime: 20,
      category: "Binary Search",
      links: [
        { title: "LeetCode - Find Minimum in Rotated Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", type: "example" },
        { title: "Binary Search Variants", url: "https://www.geeksforgeeks.org/binary-search/", type: "reference" }
      ]
    },

    // 🔹 Behavioral
    {
      id: "behavioral-2",
      type: "behavioral",
      question: "Tell me about a time you had to work with a difficult team member",
      framework: "STAR Method",
      difficulty: "Medium",
      hints: ["Situation", "Task", "Action", "Result"],
      estimatedTime: 15,
      category: "Teamwork",
      links: [
        { title: "Behavioral Interview Tips", url: "https://www.youtube.com/watch?v=OqoGEMlNk_g", type: "tutorial" }
      ]
    },
    {
      id: "behavioral-3",
      type: "behavioral",
      question: "Describe a situation where you had to meet a tight deadline",
      framework: "STAR Method",
      difficulty: "Medium",
      hints: ["Explain how you prioritized tasks", "Mention communication with stakeholders", "Highlight the outcome"],
      estimatedTime: 12,
      category: "Time Management",
      links: [
        { title: "STAR Method Guide", url: "https://mondo.com/insights/how-to-use-star-method-to-answer-performace-based-interview-questions/#:~:text=Talk%20about%20a%20time%20when%20you%20had%20to,timeline%20and%20assigned%20tasks%20to%20each%20team%20member.", type: "tutorial" }
      ]
    },
    {
      id: "behavioral-4",
      type: "behavioral",
      question: "What’s the most challenging project you have worked on?",
      framework: "STAR Method",
      difficulty: "Medium",
      hints: ["Focus on the problem complexity", "Explain how you collaborated", "Highlight measurable outcomes"],
      estimatedTime: 15,
      category: "Problem Solving",
      links: [
        { title: "Problem Solving in Interviews", url: "https://megainterview.com/what-was-the-most-challenging-project-you-have-worked-on/", type: "reference" }
      ]
    },
    {
      id: "behavioral-5",
      type: "behavioral",
      question: "Tell me about a time you failed. How did you handle it?",
      framework: "STAR Method",
      difficulty: "Hard",
      hints: ["Be honest but professional", "Emphasize what you learned", "Show resilience and growth"],
      estimatedTime: 15,
      category: "Resilience",
      links: [
        { title: "Answering Failure Questions", url: "https://interviewpenguin.com/tell-me-about-a-time-when-you-failed/", type: "tutorial" }
      ]
    },

    // 🔹 System Design
    {
      id: "system-2",
      type: "system-design",
      question: "Design a URL shortener like bit.ly",
      difficulty: "Hard",
      hints: ["Consider scale", "Database design", "Caching strategy"],
      estimatedTime: 40,
      category: "Web Systems",
      links: [
        { title: "System Design - URL Shortener", url: "https://www.geeksforgeeks.org/system-design/system-design-url-shortening-service/", type: "example" },
        { title: "High Scalability - URL Shortener", url: "https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly", type: "reference" }
      ]
    },
    {
      id: "system-3",
      type: "system-design",
      question: "Design a chat application like WhatsApp",
      difficulty: "Hard",
      hints: ["Think about message delivery guarantees", "Consider real-time sync across devices", "Handle offline users gracefully"],
      estimatedTime: 60,
      category: "Messaging Systems",
      links: [
        { title: "System Design - WhatsApp", url: "https://blog.algomaster.io/p/design-a-chat-application-like-whatsapp", type: "example" },
        { title: "Scalable Chat App Design", url: "https://www.youtube.com/watch?v=3HXFy_7M12E&t=1s", type: "tutorial" }
      ]
    },
    {
      id: "system-4",
      type: "system-design",
      question: "Design an online food delivery system like Swiggy/Zomato",
      difficulty: "Hard",
      hints: ["Users, restaurants, delivery partners → entities", "Real-time location tracking", "Scalability and load balancing"],
      estimatedTime: 70,
      category: "Distributed Systems",
      links: [
        { title: "System Design - Food Delivery", url: "https://upvey.com/technology/interview/system-design/design-architecture-food-delivery-service-like-swiggy-or-ubereats/#google_vignette", type: "example" },
        { title: "Scalable Food Delivery Architecture", url: "https://www.youtube.com/watch?v=rZyAgZuuZiA&t=8s", type: "tutorial" }
      ]
    },
    {
      id: "system-5",
      type: "system-design",
      question: "Design a recommendation system for an e-commerce website",
      difficulty: "Medium",
      hints: ["Collaborative filtering", "Content-based recommendations", "Cold start problem"],
      estimatedTime: 50,
      category: "Machine Learning Systems",
      links: [
        { title: "Recommendation Systems Intro", url: "https://www.geeksforgeeks.org/recommendation-system-in-python/", type: "tutorial" },
        { title: "System Design - Recommendation Engine", url: "https://webkul.com/blog/e-commerce-recommendation-system/", type: "reference" }
      ]
    },
    {
      id: "system-6",
      type: "system-design",
      question: "Design YouTube (video streaming platform)",
      difficulty: "Hard",
      hints: ["Video upload, transcoding, and storage", "Content delivery networks (CDNs)", "Search and recommendation engine"],
      estimatedTime: 90,
      category: "Media Systems",
      links: [
        { title: "System Design - YouTube", url: "https://www.geeksforgeeks.org/system-design/system-design-of-youtube-a-complete-architecture/", type: "example" },
        { title: "Designing Video Streaming Platforms", url: "https://www.youtube.com/watch?v=jPKTo1iGQiE&t=1s", type: "tutorial" }
      ]
    }
  ]



  const practicePlatforms = [
    {
      name: "LeetCode",
      description: "Most popular coding interview platform",
      problems: "2000+",
      difficulty: ["Easy", "Medium", "Hard"],
      url: "https://leetcode.com/",
      features: ["Mock Interviews", "Company Tags", "Discussion Forums", "Premium Content"],
    },
    {
      name: "HackerRank",
      description: "Comprehensive coding challenges and assessments",
      problems: "1000+",
      difficulty: ["Easy", "Medium", "Hard"],
      url: "https://hackerrank.com/",
      features: ["Skill Assessments", "Certification", "Company Challenges", "Interview Prep"],
    },
    {
      name: "CodeChef",
      description: "Competitive programming and contests platform",
      problems: "3000+",
      difficulty: ["Easy", "Medium", "Hard"],
      url: "https://www.codechef.com/",
      features: ["Monthly Contests", "Long Challenge", "Cook-Off", "Practice Problems"],
    },
  ];

  const technicalResources = [
    {
      category: "📊 Data Structures & Algorithms",
      description: "Master core algorithms and problem-solving patterns for interviews",
      totalProblems: 220,
      subcategories: [
        {
          title: "Arrays & Strings",
          difficulty: "Easy",
          problems: 50,
          subtopics: [
            "Two Pointers", "Sliding Window", "String Manipulation", "Prefix Sums", "Rotation & Reversal",
            "Frequency Counting", "Hashing for Arrays", "Anagram Problems"
          ],
          resources: [
            { name: "LeetCode Arrays", url: "https://leetcode.com/tag/array/" },
            { name: "HackerRank Strings", url: "https://hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=strings" },
            { name: "NeetCode Array Playlist", url: "https://www.youtube.com/playlist?list=PLot-Xpze53lfOdF3KwpMSFEyfE77zIwiP" }
          ],
        },
        {
          title: "Linked Lists",
          difficulty: "Medium",
          problems: 30,
          subtopics: [
            "Traversal", "Reversal", "Cycle Detection", "Merge Operations", "Dummy Nodes",
            "Doubly Linked List", "Skip Lists"
          ],
          resources: [
            { name: "LeetCode Linked List", url: "https://leetcode.com/tag/linked-list/" },
            { name: "GeeksforGeeks", url: "https://geeksforgeeks.org/data-structures/linked-list/" },
            { name: "FreeCodeCamp Linked List", url: "https://www.youtube.com/watch?v=Hj_rA0dhr2I" }
          ],
        },
        {
          title: "Trees & Graphs",
          difficulty: "Hard",
          problems: 50,
          subtopics: [
            "Binary Trees", "BST Operations", "Tree Traversals", "Graph Representations", "DFS & BFS",
            "Shortest Path", "Topological Sort", "Union-Find", "Minimum Spanning Tree"
          ],
          resources: [
            { name: "LeetCode Tree", url: "https://leetcode.com/tag/tree/" },
            { name: "LeetCode Graph", url: "https://leetcode.com/tag/graph/" },
            { name: "WilliamFiset Graph Theory", url: "https://www.youtube.com/playlist?list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu" }
          ],
        },
        {
          title: "Dynamic Programming",
          difficulty: "Hard",
          problems: 50,
          subtopics: [
            "1D DP", "2D DP", "Memoization", "Tabulation", "State Optimization",
            "Knapsack Variants", "Subsequence Problems", "Game Theory DP"
          ],
          resources: [
            { name: "LeetCode DP", url: "https://leetcode.com/tag/dynamic-programming/" },
            { name: "DP Patterns", url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns" },
            { name: "NeetCode DP Playlist", url: "https://www.youtube.com/playlist?list=PLot-Xpze53ldVwtstag2TL4HQhAnC8m4D" }
          ],
        },
        {
          title: "Other Important Topics",
          difficulty: "Medium",
          problems: 40,
          subtopics: [
            "Heaps", "Hash Tables", "Bit Manipulation", "Greedy Algorithms", "Backtracking",
            "Math & Number Theory", "Sorting Algorithms", "Binary Search Variants"
          ],
          resources: [
            { name: "Heap Guide", url: "https://www.geeksforgeeks.org/heap-data-structure/" },
            { name: "Backtracking Patterns", url: "https://leetcode.com/tag/backtracking/" },
            { name: "Princeton Algorithms", url: "https://algs4.cs.princeton.edu/home/" }
          ],
        },
      ],
    },
    {
      category: "🏗️ System Design",
      description: "Learn to design scalable, fault-tolerant systems",
      totalProblems: 50,
      subcategories: [
        {
          title: "Core Concepts",
          difficulty: "Medium",
          problems: 15,
          subtopics: [
            "Scalability", "Load Balancing", "Caching", "Database Sharding", "CAP Theorem",
            "Consistency Models", "Fault Tolerance"
          ],
          resources: [
            { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { name: "High Scalability", url: "http://highscalability.com/" },
            { name: "ByteByteGo YouTube", url: "https://www.youtube.com/c/ByteByteGo" }
          ],
        },
        {
          title: "Real-world Systems",
          difficulty: "Hard",
          problems: 20,
          subtopics: [
            "URL Shortener", "Chat System", "News Feed", "Search Engine", "Video Streaming",
            "Payment Gateway", "Social Media Platform"
          ],
          resources: [
            { name: "Grokking System Design", url: "https://educative.io/courses/grokking-the-system-design-interview" },
            { name: "System Design Interview", url: "https://bytebytego.com/" }
          ],
        },
        {
          title: "Other Important Topics",
          difficulty: "Medium",
          problems: 15,
          subtopics: [
            "Monitoring & Logging", "Event-driven Architecture", "Message Queues", "Content Delivery Networks",
            "Security in System Design"
          ],
          resources: [
            { name: "Grafana Monitoring", url: "https://grafana.com/oss/grafana/" },
            { name: "Event-driven Design", url: "https://microservices.io/patterns/rel/async-messaging.html" }
          ],
        },
      ],
    },
    {
      category: "🗄️ Database Design",
      description: "Learn relational & NoSQL databases for real-world applications",
      totalProblems: 70,
      subcategories: [
        {
          title: "SQL Basics",
          difficulty: "Easy",
          problems: 20,
          subtopics: [
            "SELECT Queries", "Joins", "Indexes", "Aggregate Functions", "Stored Procedures",
            "Views", "Transactions"
          ],
          resources: [
            { name: "SQLBolt", url: "https://sqlbolt.com/" },
            { name: "LeetCode Database", url: "https://leetcode.com/problemset/database/" }
          ],
        },
        {
          title: "NoSQL & Scaling",
          difficulty: "Medium",
          problems: 20,
          subtopics: [
            "Document Stores", "Key-Value Stores", "Column Stores", "Graph Databases",
            "Sharding", "Replication"
          ],
          resources: [
            { name: "MongoDB Basics", url: "https://www.mongodb.com/basics" },
            { name: "Cassandra Guide", url: "https://cassandra.apache.org/" }
          ],
        },
        {
          title: "Advanced Design",
          difficulty: "Hard",
          problems: 15,
          subtopics: [
            "Normalization", "Denormalization", "Indexing Strategies", "Partitioning",
            "Data Warehousing", "Query Optimization"
          ],
          resources: [
            { name: "Database Normalization", url: "https://www.guru99.com/database-normalization.html" },
            { name: "AWS Data Warehousing", url: "https://aws.amazon.com/redshift/" }
          ],
        },
        {
          title: "Other Important Topics",
          difficulty: "Medium",
          problems: 15,
          subtopics: [
            "ACID Properties", "Database Security", "Backup & Recovery", "OLAP vs OLTP",
            "Temporal Databases"
          ],
          resources: [
            { name: "Transactions in SQL", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html" }
          ],
        },
      ],
    },
    {
      category: "🔌 API Design & Development",
      description: "REST, GraphQL, and microservices for backend engineering",
      totalProblems: 60,
      subcategories: [
        {
          title: "REST API Design",
          difficulty: "Easy",
          problems: 15,
          subtopics: [
            "HTTP Methods", "CRUD Operations", "Error Handling", "Versioning", "Rate Limiting",
            "Pagination", "CORS"
          ],
          resources: [
            { name: "RESTful API Tutorial", url: "https://restfulapi.net/" },
            { name: "Postman Learning Center", url: "https://learning.postman.com/" }
          ],
        },
        {
          title: "GraphQL",
          difficulty: "Medium",
          problems: 15,
          subtopics: [
            "Queries", "Mutations", "Subscriptions", "Schemas", "Resolvers",
            "Apollo Server", "GraphQL Security"
          ],
          resources: [
            { name: "GraphQL Official Docs", url: "https://graphql.org/learn/" },
            { name: "Apollo GraphQL", url: "https://www.apollographql.com/docs/" }
          ],
        },
        {
          title: "Microservices & Security",
          difficulty: "Hard",
          problems: 15,
          subtopics: [
            "Service Discovery", "API Gateway", "Authentication", "Authorization", "JWT",
            "OAuth2", "gRPC"
          ],
          resources: [
            { name: "Microservices Guide", url: "https://microservices.io/" },
            { name: "JWT Introduction", url: "https://jwt.io/introduction/" }
          ],
        },
        {
          title: "Other Important Topics",
          difficulty: "Medium",
          problems: 15,
          subtopics: [
            "API Testing", "OpenAPI/Swagger", "Async APIs", "WebSockets", "gRPC Streaming",
            "API Performance Tuning"
          ],
          resources: [
            { name: "OpenAPI Specification", url: "https://swagger.io/specification/" },
            { name: "gRPC Basics", url: "https://grpc.io/docs/what-is-grpc/" }
          ],
        },
      ],
    },
  ];


  return (
    <Layout
      title="Interview Preparation - RecodeHive"
      description="Comprehensive interview preparation resources for technical and behavioral interviews at top tech companies"
    >
      <InterviewPrepContent 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        showTips={showTips}
        toggleTips={toggleTips}
        showQuestions={showQuestions}
        toggleQuestions={toggleQuestions}
        behavioralQuestions={behavioralQuestions}
        technicalResources={technicalResources}
        practicePlatforms={practicePlatforms}
        companyTips={companyTips}
        mockInterviewQuestions={mockInterviewQuestions}
      />
    </Layout>
  )
}

function InterviewPrepContent({ 
  activeTab, 
  setActiveTab, 
  expandedCategories, 
  toggleCategory, 
  showTips, 
  toggleTips, 
  showQuestions, 
  toggleQuestions,
  behavioralQuestions,
  technicalResources,
  practicePlatforms,
  companyTips,
  mockInterviewQuestions
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<"overview" | "technical" | "behavioral" | "companies" | "practice">>;
  expandedCategories: { [key: string]: boolean };
  toggleCategory: (categoryIndex: number) => void;
  showTips: { [key: number]: boolean };
  toggleTips: (index: number) => void;
  showQuestions: { [key: number]: boolean };
  toggleQuestions: (index: number) => void;
  behavioralQuestions: any[];
  technicalResources: any[];
  practicePlatforms: any[];
  companyTips: any[];
  mockInterviewQuestions: any[];
}) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <Head>
        <title>Interview Preparation - RecodeHive</title>
        <meta
          name="description"
          content="Master technical and behavioral interviews with our comprehensive preparation resources, practice questions, and company-specific guides."
        />
      </Head>

      <div className={clsx(
        "min-h-screen",
        isDark 
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-b from-white to-gray-50 text-black"
      )}>
        {/* Hero Section */}
        <motion.section
          className="hero-section py-20 px-4 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              variants={fadeIn}
            >
              Ace Your Next Interview
            </motion.h1>
            <motion.p className="text-xl md:text-2xl mb-8 text-blue-100" variants={fadeIn}>
              Master technical challenges and behavioral questions with our comprehensive interview preparation platform
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <button
                onClick={() => setActiveTab("practice")}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Practice
              </button>
              <button
                onClick={() => setActiveTab("technical")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Browse Resources
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: "📋" },
                { id: "technical", label: "Technical", icon: "💻" },
                { id: "behavioral", label: "Behavioral", icon: "🤝" },
                { id: "companies", label: "Companies", icon: "🏢" },
                { id: "practice", label: "Practice", icon: "🎯" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? "interview-prep-nav-tab-active border-blue-500 text-blue-600 dark:text-blue-400"
                    : "interview-prep-nav-tab-inactive border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                >
                  <span className="text-inherit">{tab.icon}</span>
                  <span className="text-inherit">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
  <div className="interview-prep-page max-w-6xl mx-auto px-4 py-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewTab
              toggleTips={toggleTips}
              toggleQuestions={toggleQuestions}
              showTips={showTips}
              showQuestions={showQuestions}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Technical Tab */}
          {activeTab === "technical" && (
            <TechnicalTab
              technicalResources={technicalResources}
              practicePlatforms={practicePlatforms}
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
            />
          )}

          {/* Behavioral Tab */}
          {activeTab === "behavioral" && (
            <BehavioralTab
              behavioralQuestions={behavioralQuestions}
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
            />
          )}

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <CompaniesTab
              companyTips={companyTips}
              toggleTips={toggleTips}
              toggleQuestions={toggleQuestions}
              showTips={showTips}
              showQuestions={showQuestions}
            />
          )}

          {/* Practice Tab */}
          {activeTab === "practice" && (
            <PracticeTab mockInterviewQuestions={mockInterviewQuestions} />
          )}
        </div>

        {/* Call to Action */}
        <motion.section
          className="cta-section py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeIn}>
              Ready to Land Your Dream Job?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-blue-100" variants={fadeIn}>
              Join thousands of developers who have successfully prepared for interviews with RecodeHive
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                to="/get-started"
                className="border-2 border-white bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                Start Preparing Now
              </Link>
              <Link
                to="/community"
                className="border-2 border-white bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                Join Community
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default InterviewPrepPage
