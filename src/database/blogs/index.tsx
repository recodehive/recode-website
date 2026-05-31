interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
  authors: string[];
  category: string;
  tags?: string[];
  date?: string;
}

const blogs: Blog[] = [

  {
    id: 1,
    title: "Land a Job in UI/UX Design",
    image: "/img/blogs/04-ux-job-design.png",
    description:
      " Are you passionate about design and dreaming of a career in it? Or maybe you are already in the design space and looking to pivot into UI/UX? ",
    slug: "ux-ui-design-job",
    authors: ["sowmiya-v", "sanjay-kv"],
    category: "Design",
    tags: ["UX", "UI", "design", "Job"],
  },

  {
    id: 2,
    title: "What is GitHub Copilot",
    image: "/img/blogs/06-github-agent.png",
    description:
      "The GitHub Copilot Coding Agent is an asynchronous software engineering agent that assists developers by suggesting code snippets",
    slug: "git-coding-agent",
    authors: ["sanjay-kv"],
    category: "Development",
    tags: ["GitHub", "AI", "Coding", "Tools"],
  },
  {
    id: 3,
    title: "Apache Spark Architecture Explained",
    image: "img/blogs/07-spark-blog-banner.png",
    description:
      "Apache Spark is a fast, open-source big data framework that leverages in-memory computing for high performance. Its architecture powers scalable distributed processing across clusters, making it essential for analytics and machine learning.",
    slug: "spark-architecture",
    authors: ["Aditya-Singh-Rathore", "sanjay-kv"],
    category: "Development",
    tags: ["Apache Spark", "Big Data", "Data Engineering", "Architecture"],
  },
  {
    id: 4,
    title: "N8N: The Future of Workflow Automation",
    image: "/img/blogs/n8n-logo.png",
    description:
      "N8N is an open-source workflow automation tool that enables users to connect various apps and services to automate tasks without extensive coding knowledge.",
    slug: "n8n-workflow-automation",
    authors: ["Aditya-Singh-Rathore"],
    category: "Development",
    tags: ["Automation", "Workflow", "N8N", "Tools"],
  },
  {
    id: 5,
    title: "OpenAI AgentKit: Building AI Agents Without the Complexity",
    image: "/img/blogs/Agent_Builder.png",
    description:
      "OpenAI AgentKit is a framework that simplifies the process of building AI agents, allowing developers to create intelligent applications without getting bogged down in the underlying complexities.",
    slug: "open-ai-agent-builder",
    authors: ["Aditya-Singh-Rathore"],
    category: "AI & Tech",
    tags: ["AI", "OpenAI", "Development", "Agents"],
  },
  {
    id: 6,
    title: "Delta Lake: An Introduction to Trustworthy Data Storage",
    image: "/img/blogs/delta-lake-logo.png",
    description:
      "Delta Lake is an open-source storage layer that brings ACID transactions to Apache Spark and big data workloads.",
    slug: "deltalake-data-storage",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Delta Lake", "Big Data", "Data Engineering", "Storage"],
  },
  {
    id: 7,
    title: "How I Cleared the Azure Data Engineer Associate Certification",
    image: "/img/blogs/microsoft-certified-associate-badge.png",
    description:
      "The Microsoft Certified: Azure Data Engineer Associate certification validates your skills in designing and implementing data solutions on the Azure platform.",
    slug: "fabric-data-engineer",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Microsoft", "Azure", "Data Engineering", "Certification"],
  },
  {
    id: 8,
    title: "Microsoft Fabric: One Platform, One Lake, Every Data Workload",
    image: "/img/blogs/microsoft-farbic-blog-image.png",
    description:
      "Microsoft Fabric is a unified analytics platform that integrates various data services and tools to provide a seamless experience for data professionals, enabling them to manage and analyze data across the entire data lifecycle.",
    slug: "microsoft-fabric-explained",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Microsoft", "Azure", "Data Engineering", "Certification", "Fabric", "OneLake", "Data Workloads", "Unified Analytics"],
  },
  {
    id: 9,
    title: "How SSO Actually Works",
    image: "/img/blogs/sso_cover.png",
    description:
      "SSO lets you log into dozens of apps with a single set of credentials. But how does it actually work under the hood? A beginner-friendly walkthrough of the full flow — from clicking 'Sign in with Google' to getting access — step by step.",
    slug: "single-sign-on",
    authors: ["Aditya-Singh-Rathore", "sanjay-kv"],
    category: "security",
    tags: ["SSO", "Authentication", "Security", "OAuth", "OpenID Connect", "SAML"],
  },
  {
    id: 10,
    title: "Lakehouse vs Data Warehouse: A Comprehensive Comparison",
    image: "/img/blogs/datalake_vs_warehouse.png",
    description:
      "Lakehouse and Data Warehouse are two different data storage architectures. A Data Warehouse is a centralized repository for structured data, optimized for reporting and analysis. A Lakehouse combines the best of both worlds, allowing for the storage of both structured and unstructured data, providing flexibility and scalability.",
    slug: "lakehouse-vs-warehouse",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Lakehouse", "Data Warehouse", "Data Storage", "Big Data", "Architecture", "Comparison"],
  },
  {
    id: 11,
    title: "How Netflix Handles 2 Trillion Events Every Day",
    image: "/img/blogs/thumbnail.png",
    description:
      "Netflix processes an enormous amount of data every day, handling over 2 trillion events. This article explores how they manage this massive scale and the technologies they use to ensure smooth operations.",
    slug: "netflix-data-engineering",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Netflix", "Data Processing", "Big Data", "Scalability", "Event Handling", "Technology", "Architecture", "Data Engineering"],
  },
  {
    id: 12,
    title: "Azure Storage & ADLS Gen2: Where Does Your Data Actually Live?",
    image: "/img/blogs/azure-storage-cover.png",
    description:
      "Azure Storage and Azure Data Lake Storage Gen2 (ADLS Gen2) are two different storage solutions offered by Microsoft Azure. Azure Storage is a general-purpose storage service that provides various types of storage, including blobs, files, queues, and tables. ADLS Gen2, on the other hand, is a specialized storage solution designed for big data analytics workloads, offering features like hierarchical namespace and optimized performance for analytics.",
    slug: "azure-storage-options",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Azure", "Storage", "Data Lake", "ADLS Gen2", "Big Data", "Scalability", "Event Handling", "Technology", "Architecture", "Data Engineering"],
  },
  {
    id: 13,
    title: "Azure Data Factory Pipeline: Build Your First ETL in 10 Minutes",
    image: "/img/blogs/adf-cover_image.png",
    description:
      "Azure Data Factory Pipeline is a cloud-based data integration service that allows you to create data-driven workflows for orchestrating and automating data movement and transformation tasks. This article will guide you through the process of building your first ETL pipeline in Azure Data Factory.",
    slug: "ETL-pipeline-tutorial",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Azure", "Storage", "Data Lake", "ADLS Gen2", "Big Data", "Scalability", "Event Handling", "Technology", "Architecture", "Data Engineering"],
  },
  {
    id: 14,
    title: "Medallion Architecture: How to Stop Your Data Pipeline from Becoming a Nightmare",
    image: "/img/blogs/medallion_architecture.png",
    description:
      "The Medallion Architecture is a data management approach that organizes data into different layers (Bronze, Silver, Gold) to improve data quality, governance, and scalability in data pipelines. It helps prevent data pipelines from becoming unmanageable by providing a structured framework for data processing and storage.",
    slug: "medallion-architecture",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Medallion Architecture", "Data Pipeline", "Data Management", "Data Quality", "Data Governance", "Scalability", "Data Engineering"],
  },
  {
    id: 15,
    title: "Azure Synapse Analytics: When to Use It (And When to Choose Fabric Instead)",
    image: "/img/blogs/azure-synapse-cover.png",
    description:
      "Azure Synapse Analytics is a unified analytics service that combines big data and data warehousing capabilities. This article explores when to use Azure Synapse Analytics and when to choose Fabric instead.",
    slug: "azure-synapse-analytics",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Azure", "Synapse Analytics", "Data Warehousing", "Big Data", "Unified Analytics", "Fabric", "Data Engineering"],
  },
  {
    id: 16,
    title: "Why We Rolled Back Our Kafka Pipeline to Batch After 6 Months",
    image: "/img/blogs/batch-vs-stream-cover.png",
    description:
      "Streaming pipelines are powerful for real-time data processing, but they come with hidden costs that are often overlooked. These costs include increased complexity, higher resource consumption, and potential challenges in maintaining data consistency and reliability. This article explores these hidden costs and provides insights on how to mitigate them.",
    slug: "batch-vs-stream-processing",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Streaming Pipelines", "Real-Time Data Processing", "Data Consistency", "Data Reliability", "Resource Consumption", "Complexity", "Data Engineering"],
  },

  {
    id: 17,
    title: "Azure Data Pipeline Cost Optimization: How We Cut a $4,200 Bill by 73%",
    image: "/img/blogs/cost_optimzation_cover.png",
    description:
      "Azure Data Pipeline can be a powerful tool for data processing and analytics, but it can also lead to unexpectedly high costs if not managed properly. In this article, we share our experience of optimizing our Azure Data Pipeline costs, which resulted in a 73% reduction in our monthly bill, saving us $3,066. We discuss the strategies we implemented to achieve this significant cost reduction while maintaining the performance and reliability of our data pipeline.",
    slug: "azure-cost-optimization",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Azure", "Data Pipeline", "Cost Optimization", "Data Engineering"],
  },
  {
    id: 18,
    title: "PySpark Optimization Techniques: 6 Mistakes That Slow Down Every Beginner's Pipeline",
    image: "/img/blogs/pyspark_optimization_cover.png",
    description:
      "PySpark is a powerful tool for big data processing, but it can be challenging to optimize for performance. In this article, we discuss six common mistakes that beginners make when optimizing their PySpark pipelines, which can lead to slow performance and increased costs. We provide practical tips and techniques to help you avoid these pitfalls and improve the efficiency of your PySpark applications.",
    slug: "spark-performance-optimizations",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["PySpark", "Optimization", "Big Data", "Performance", "Data Engineering"],
  },
  {
    id: 20,
    title: "How We Used Purview Data Catalog to Reduce Onboarding Time for New Data Engineers from 2 Weeks to 3 Days",
    image: "/img/blogs/purview_cover.png",
    description:
      "Microsoft Purview Data Catalog is a powerful tool for managing and organizing data assets within an organization. In this article, we share our experience of using Purview Data Catalog to streamline the onboarding process for new data engineers, reducing the time it takes from 2 weeks to just 3 days. We discuss the features of Purview that enabled us to achieve this improvement and provide insights on how other organizations can leverage this tool to enhance their data management practices.",
    slug: "microsoft-data-purview",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Purview", "Data Catalog", "Onboarding", "Data Management", "Data Engineering"],
  },
  {
    id: 19,
    title: "Why Data Engineers Make Better Business Analysts Than MBAs Do",
    image: "/img/blogs/ba_de_cover_image.png",
    description:
      "Data engineers often have a deeper understanding of data and its implications for business decisions than MBAs, who may focus more on theory and strategy. This article explores why data engineers can make better business analysts than MBAs, highlighting their technical expertise, problem-solving skills, and ability to derive insights from data to drive informed business decisions.",
    slug: "data-engineers-vs-mbas",
    authors: ["Aditya-Singh-Rathore"],
    category: "data engineering",
    tags: ["Data Engineers", "Business Analysts", "MBAs", "Data Understanding", "Business Decisions"],
  },
  {
    id: 20,
    title: "Google Changed Workspace Icon after 6 years",
    image: "/img/blogs/cover-google-icon.jpg",
    description:
      " Google has unveiled a new icon design that reflects its commitment to simplicity and accessibility. The updated icon features a more modern ",
    slug: "google-icon-update",
    authors: ["sanjay-kv"],
    category: "Design",
    tags: ["UX", "UI", "design", "Job"],
  },

  

];

export default blogs;
