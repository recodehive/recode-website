interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
  authors: string[];
  category: string;
  tags?: string[];
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
    tags: ["UX", "UI", "Career", "Job"],
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

];

export default blogs;
