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
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  };

  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <div
      className="max-w-7xl mx-auto my-8 cursor-pointer px-1"
      onClick={handleClick}
    >
      <div className="relative rounded-xl overflow-hidden shadow-xl group">
        {/* Featured Image */}
        <img
          className="w-full h-[450px] sm:h-[580px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          src={post.image}
          alt={post.title}
        />

        {/* Dark Overlay with Emerald Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-emerald-900/10 group-hover:from-black/60 group-hover:via-black/40 transition-all duration-500" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10 text-white">
          {/* Category Badge */}
          <span className="inline-block bg-emerald-500/90 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md mb-4 tracking-wide uppercase">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug drop-shadow-md group-hover:text-emerald-400 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Author */}
          <div className="mt-5 flex items-center text-sm text-gray-200">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full mr-4 object-cover border border-emerald-400/40 shadow-md"
            />
            <div>
              <p className="font-medium text-white">{post.authorName}</p>
              <p className="text-xs text-gray-300">{post.date}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
