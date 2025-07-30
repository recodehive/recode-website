interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Streamline Your UX Design",
    image: "/img/blogs/05-ux-streamline.png",
    description:
      "User experience design can be overwhelming because of the number of factors that influence what a product should look like and how it should function.",
    slug: "streamline-ux-ui",
  },

  {
    id: 2,
    title: "Land a Job in UI/UX Design",
    image: "/img/blogs/04-ux-job-design.png",
    description:
      " Are you passionate about design and dreaming of a career in it? Or maybe you are already in the design space and looking to pivot into UI/UX? ",
    slug: "ux-ui-design-job",
  },
  {
    id: 3,
    title: "UX Designers Future with AI",
    image: "/img/blogs/03-ui-ux.png",
    description:
      "The impact of technology on UX design is undeniable. Automation and artificial intelligence are making it easier to identify user needs and create tailored experiences.",
    slug: "ux-designers-ai",
  },
    {
    id: 4,
    title: "What is Google DeepMind?",
    image: "/img/blogs/02-deepmind.png",
    description:
      "DeepMind is an auxiliary of Google that centers around man-made brainpower. It utilizes a part of AI called AI",
    slug: "google-deepmind",
  },
      {
    id: 5,
    title: "What are backlinks for SEO",
    image: "/img/blogs/01-seo-image.png",
    description:
      "An SEO backlink is created when one website links to another, and they’re extremely important for SEO. ",
    slug: "google-backlinks",
  },

        {
    id: 6,
    title: "What is GitHub Copilot",
    image: "/img/blogs/06-github-agent.png",
    description:
      "The GitHub Copilot Coding Agent is an asynchronous software engineering agent that assists developers by suggesting code snippets",
    slug: "git-coding-agent",
  },
];

export default blogs;
