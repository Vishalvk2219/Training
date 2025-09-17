import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const FullBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/blog/public/${slug}`);
        if (res.data.success) setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
        <div className="h-8 bg-gray-200 w-2/3 mb-4 rounded"></div>
        <div className="h-4 bg-gray-200 w-1/3 mb-2 rounded"></div>
        <div className="h-4 bg-gray-200 w-1/2 mb-6 rounded"></div>
      </div>
    );

  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Featured Image */}
      <div className="overflow-hidden rounded-xl shadow-md mb-8">
        <img
          src={blog.featuredimage || "https://via.placeholder.com/1200x500"}
          alt={blog.title}
          className="w-full object-cover max-h-[500px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-snug">
        {blog.title}
      </h1>

      {/* Category */}
      {blog.category && (
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          {blog.category}
        </span>
      )}

      {/* Author */}
      <div className="flex items-center mb-8 space-x-4">
        <img
          src={blog.author?.avatar || "https://via.placeholder.com/50"}
          alt={blog.author?.name}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div>
          <p className="font-medium text-gray-800">{blog.author?.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-100 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-full text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Share */}
      <div className="mt-12 flex space-x-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          <FaTwitter /> Twitter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
          <FaLinkedin /> LinkedIn
        </button>
      </div>
    </div>
  );
};

export default FullBlog;
