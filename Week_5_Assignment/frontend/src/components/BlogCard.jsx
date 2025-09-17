// src/components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // ✅ Safely handle undefined or missing blog
  if (!blog || typeof blog !== "object") {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
        Blog data not available
      </div>
    );
  }

  // ✅ Provide safe fallbacks for all fields
  const slug = blog.slug || blog._id || "";
  const featuredimage =
    blog.featuredimage ||
    blog.image || // in case your blog object has `image` instead of `featuredimage`
    "https://via.placeholder.com/600x300";
  const title = blog.title || "Untitled Blog";
  const category = blog.category || "Uncategorized";
  const authorName = blog.author?.name || "Unknown Author";
  const authorAvatar =
    blog.author?.avatar || blog.authorAvatar || "https://via.placeholder.com/50";
  const createdAt = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "Unknown Date";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  const metaDescription =
    blog.metadescription ||
    (blog.content ? blog.content.slice(0, 150) + "..." : "No description available");

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Featured image */}
      <Link to={`/blog/${slug}`}>
        <img
          src={featuredimage}
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6">
        {/* Category */}
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {category}
        </span>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>

        {/* Author */}
        <div className="flex items-center mb-4 space-x-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm text-gray-600">
            {authorName} • {createdAt}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{metaDescription}</p>

        {/* Read More */}
        <Link
          to={`/blog/${slug}`}
          className="inline-block w-full text-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
