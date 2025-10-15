interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
  authors: string[];
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Streamline Your UX Design",
    image: "/img/blogs/05-ux-streamline.png",
    description:
      "User experience design can be overwhelming because of the number of factors that influence what a product should look like and how it should function.",
    slug: "streamline-ux-ui",
    authors: ["dharshibalasubramaniyam", "sanjay-kv"],
  },

  {
    id: 2,
    title: "Land a Job in UI/UX Design",
    image: "/img/blogs/04-ux-job-design.png",
    description:
      " Are you passionate about design and dreaming of a career in it? Or maybe you are already in the design space and looking to pivot into UI/UX? ",
    slug: "ux-ui-design-job",
    authors: ["dharshibalasubramaniyam", "sanjay-kv"],
  },
  {
    id: 3,
    title: "UX Designers Future with AI",
    image: "/img/blogs/03-ui-ux.png",
    description:
      "The impact of technology on UX design is undeniable. Automation and artificial intelligence are making it easier to identify user needs and create tailored experiences.",
    slug: "ux-designers-ai",
    authors: ["dharshibalasubramaniyam", "sanjay-kv"],
  },
  {
    id: 4,
    title: "What is Google DeepMind?",
    image: "/img/blogs/02-deepmind.png",
    description:
      "DeepMind is an auxiliary of Google that centers around man-made brainpower. It utilizes a part of AI called AI",
    slug: "google-deepmind",
    authors: ["dharshibalasubramaniyam", "sanjay-kv"],
  },
  {
    id: 5,
    title: "What are backlinks for SEO",
    image: "/img/blogs/01-seo-image.png",
    description:
      "An SEO backlink is created when one website links to another, and they're extremely important for SEO. ",
    slug: "google-backlinks",
    authors: ["sanjay-kv"],
  },

  {
    id: 6,
    title: "What is GitHub Copilot",
    image: "/img/blogs/06-github-agent.png",
    description:
      "The GitHub Copilot Coding Agent is an asynchronous software engineering agent that assists developers by suggesting code snippets",
    slug: "git-coding-agent",
    authors: ["sanjay-kv"],
  },
  {
    id: 7,
    title: "Apache Spark Architecture Explained",
    image: "img/blogs/07-spark-blog-banner.png",
    description:
      "Apache Spark is a fast, open-source big data framework that leverages in-memory computing for high performance. Its architecture powers scalable distributed processing across clusters, making it essential for analytics and machine learning.",
    slug: "spark-architecture",
    authors: ["Aditya-Singh-Rathore", "sanjay-kv"],
  },
  {
    id: 8,
    title: "N8N: The Future of Workflow Automation",
    image: "/img/blogs/n8n-logo.png",
    description:
      "N8N is an open-source workflow automation tool that enables users to connect various apps and services to automate tasks without extensive coding knowledge.",
    slug: "n8n-workflow-automation",
    authors: ["Aditya-Singh-Rathore"],
  },
  {
    id: 9,
    title: "OpenAI AgentKit: Building AI Agents Without the Complexity",
    image: "/img/blogs/Agent_Builder.png",
    description:
      "OpenAI AgentKit is a framework that simplifies the process of building AI agents, allowing developers to create intelligent applications without getting bogged down in the underlying complexities.",
    slug: "open-ai-agent-builder",
    authors: ["Aditya-Singh-Rathore"],
  },
];

export default blogs;
