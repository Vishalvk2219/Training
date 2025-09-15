import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedPost = ({ blog }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  const post = {
    id: blog._id,
    title: blog.title,
    category: blog.category,
    authorName: blog.author?.name || "Unknown",
    authorAvatar:
      blog.author?.avatar || "https://via.placeholder.com/50",
    date: new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    image:
      blog.featuredimage ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  };

  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <div
      className="max-w-6xl mx-auto my-5 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img
          className="w-full h-95 object-cover"
          src={post.image}
          alt={post.title}
        />
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 transition-all duration-500 hover:from-black/50 hover:backdrop-blur-sm">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.category}
          </span>
          <h2 className="text-xl font-bold text-white leading-snug">
            {post.title}
          </h2>
          <div className="mt-4 flex items-center text-sm text-gray-200">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-8 h-8 rounded-full mr-3 object-cover border border-white/40"
            />
            <div>
              <p className="font-medium text-white">{post.authorName}</p>
              <p className="text-xs text-gray-200">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
