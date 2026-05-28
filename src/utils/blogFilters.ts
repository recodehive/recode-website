type BlogLike = {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
};

export function filterBlogsBySearchTerm<T extends BlogLike>(
  blogs: T[],
  searchTerm: string,
): T[] {
  let normalizedSearch = searchTerm.trim().toLowerCase();
  const isTagSearch = normalizedSearch.startsWith("#");

  if (isTagSearch) {
    normalizedSearch = normalizedSearch.slice(1);
  }

  if (normalizedSearch === "") {
    return blogs;
  }

  return blogs.filter((blog) => {
    const matchesTag =
      blog.category?.toLowerCase().includes(normalizedSearch) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    if (isTagSearch) {
      return matchesTag;
    }

    return (
      blog.title.toLowerCase().includes(normalizedSearch) ||
      blog.description.toLowerCase().includes(normalizedSearch) ||
      matchesTag
    );
  });
}