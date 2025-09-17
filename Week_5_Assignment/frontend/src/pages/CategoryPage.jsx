import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard"; // ✅ import BlogCard

const CategoryPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blog`
        );
        const allBlogs = response.data;
        const blogList = Array.isArray(allBlogs)
          ? allBlogs
          : allBlogs.blogs || [];
        setBlogs(blogList);

        // unique categories
        const uniqueCategories = [
          ...new Set(blogList.map((blog) => blog.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Filter blogs
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Browse by Category
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading categories...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-medium shadow-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gray-800 text-white hover:bg-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))
            ) : (
              <p className="text-gray-600">No categories found.</p>
            )}
          </div>

          <hr className="mb-8" />

          {/* Blogs */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {selectedCategory
              ? `Blogs in "${selectedCategory}"`
              : "Select a category to view blogs"}
          </h2>

          {selectedCategory && (
            <div>
              {filteredBlogs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map((blog) => (
                    <BlogCard key={blog._id || blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No blogs found in this category.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
