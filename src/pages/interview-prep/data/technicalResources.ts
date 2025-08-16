export const technicalResources = [
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