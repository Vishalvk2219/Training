import React from "react";
import { useNavigate } from "react-router-dom";

const LatestPosts = ({ blogs }) => {
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0)
    return <p className="text-center py-10">No latest posts found.</p>;

  const formattedPosts = blogs.map((b) => ({
    id: b._id,
    slug: b.slug, // ✅ assuming you have slug in your blog model
    title: b.title,
    category: b.category,
    authorName: b.author?.name || "Unknown",
    authorAvatar:
      b.author?.avatar || "https://via.placeholder.com/50",
    date: new Date(b.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    image:
      b.featuredimage ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
  }));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Posts</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {formattedPosts.map((post) => (
          <div
            key={post.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/blog/${post.slug}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/blog/${post.slug}`);
            }}
            className="transform transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer bg-white rounded-lg overflow-hidden shadow hover:shadow-md"
          >

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-base font-semibold text-gray-900 leading-snug mb-4 hover:text-gray-700 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium text-gray-700">{post.authorName}</p>
                  <p className="text-xs text-gray-400">{post.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
