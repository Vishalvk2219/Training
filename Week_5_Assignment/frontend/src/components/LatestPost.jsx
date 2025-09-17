// src/components/LatestPosts.jsx
import React from "react";
import BlogCard from "./BlogCard";

const LatestPosts = ({ blogs }) => {
  if (!blogs || blogs.length === 0)
    return <p className="text-center py-10">No latest posts found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Posts</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <BlogCard key={post.id} blog={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
