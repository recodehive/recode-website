// posts object array with strict typing
export interface Post {
  id: number;
  title: string;
  summary: string;
  date: string;     // YYYY‑MM‑DD
  author: string;
  tags: string[];
  image: string;
  likes: number;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Building an Open Source Community",
    summary: "Learn how to grow a healthy developer community.",
    date: "2025-08-01",
    author: "Sanjay Vishwanatham",
    tags: ["Open Source", "Community"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 120,
  },
  {
    id: 2,
    title: "AI in Education: The Future",
    summary: "Exploring how AI will reshape learning experiences.",
    date: "2025-07-30",
    author: "Sanjay Vishwanatham",
    tags: ["AI", "Education"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 210,
  },
  {
    id: 3,
    title: "The Future of AI: 2025 and Beyond",
    summary: "A deep dive into how AI will evolve in the near future and impact industries worldwide.",
    date: "2025-07-0",
    author: "Sanjay Vishwanatham",
    tags: ["AI", "Education","Technology", "Trends"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 20,
  },
  {
    id: 4,
    title: "Design Thinking in Modern UX",
    summary: "Understanding how design thinking is transforming user experience strategies",
    date: "2025-06-18",
    author: "Sanjay Vishwanatham",
    tags: ["UX", "Design", "Innovation"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 20,
  },
  {
    id: 5,
    title: "Remote Work and Digital Nomadism",
    summary: "Exploring how remote work is changing lifestyles and productivity across the globe.",
    date: "2025-07-0",
    author: "Sanjay Vishwanatham",
    tags: ["Remote Work", "Lifestyle", "Productivity"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 20,
  },
  {
    id: 6,
    title: "Cybersecurity Threats You Should Know",
    summary: "An overview of emerging cybersecurity threats and how to protect against them.",
    date: "2025-07-0",
    author: "Sanjay Vishwanatham",
    tags: ["Cybersecurity", "Technology", "Safety"],
    image: "https://source.unsplash.com/featured/?ai,technology",
    likes: 20,
  },
  // …add more posts
];

export default posts;
