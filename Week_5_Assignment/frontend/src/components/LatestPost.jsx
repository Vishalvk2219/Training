import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/blog/");
        if (res.data.success && res.data.blogs) {
          // Map only the fields we need
          const formatted = res.data.blogs.map((b) => ({
            id: b._id,
            title: b.title,
            category: b.category,
            authorName: b.author?.name || "Unknown",
            authorAvatar: b.author?.avatar || "https://via.placeholder.com/50",
            date: new Date(b.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            // You could store a thumbnail field in backend later; placeholder now
            image:
              b.featuredimage ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
          }));
          setBlogs(formatted);
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center py-10">Loading latest posts…</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Posts</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-base font-semibold text-gray-900 leading-snug mb-4 hover:text-gray-700 transition-colors">
                {post.title}
              </h3>

              {/* Author */}
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
