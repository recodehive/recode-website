type BlogLike = {
  title: string;
  description: string;
  tags?: string[];
};

export function filterBlogsBySearchTerm<T extends BlogLike>(
  blogs: T[],
  searchTerm: string,
): T[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (normalizedSearch === "") {
    return blogs;
  }

  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(normalizedSearch) ||
      blog.description.toLowerCase().includes(normalizedSearch) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch)),
  );
}