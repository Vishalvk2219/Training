import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/blog/${slug}`);
        if (res.data.success) {
          setBlog(res.data.blog);
        }
      } catch (err) {
        console.error("Error fetching blog", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      {/* Featured Image */}
      <div className="overflow-hidden rounded-xl shadow-lg mb-8">
        <img
          src={blog.featuredimage || "https://via.placeholder.com/1200x500"}
          alt={blog.title}
          className="w-full object-cover max-h-[500px]"
        />
      </div>

      {/* Title & Meta */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>

      {/* Category */}
      {blog.category && (
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {blog.category}
        </span>
      )}

      <div className="flex items-center mb-6 space-x-4">
        <img
          src={blog.author?.avatar || "https://via.placeholder.com/50"}
          alt={blog.author?.name}
          className="w-12 h-12 rounded-full object-cover"
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
      <div className="mb-6">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-full text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Social share (optional) */}
      <div className="mt-12 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Share on Twitter
        </button>
        <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition">
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
};

export default FullBlog;
