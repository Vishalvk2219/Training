// src/pages/AllBlogs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);          // stores blog data
  const [loading, setLoading] = useState(true);     // loading spinner
  const [error, setError] = useState(null);         // store error messages

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:8080/blog");

        // ✅ Handle success flag and blogs existence safely
        if (res?.data?.success && Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
        } else if (Array.isArray(res?.data)) {
          // In case API directly returns array of blogs
          setBlogs(res.data);
        } else {
          // if API returns unexpected structure
          setBlogs([]);
          setError("No blogs available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching blogs. Please try again later."
        );
        setBlogs([]); // ensure empty state on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Loading state
  if (loading)
    return <p className="text-center py-10">Loading blogs...</p>;

  // ✅ Error state
  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        {error}
      </p>
    );

  // ✅ Empty state
  if (!blogs || blogs.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">
        No blogs found.
      </p>
    );

  // ✅ Normal state
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        All Blogs
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          // ✅ Protect BlogCard: if blog is undefined, skip rendering
          blog ? <BlogCard key={blog._id || Math.random()} blog={blog} /> : null
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
