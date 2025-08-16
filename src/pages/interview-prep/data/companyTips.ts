export interface CompanyTip {
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

export const companyTips: CompanyTip[] = [
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
