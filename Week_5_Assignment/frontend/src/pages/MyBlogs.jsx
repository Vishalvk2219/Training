import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/blog/my-blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error("Error fetching user's blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:8080/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin h-10 w-10 border-b-2 border-emerald-600 rounded-full"></div>
      </div>
    );

  if (!blogs.length)
    return (
      <p className="text-center py-10 text-gray-600">
        You haven’t created any blogs yet.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-emerald-700 text-center mb-10 tracking-tight">
        My Blogs
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            style={{
              backgroundImage: `url(${blog.featuredimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* dark overlay for classy look */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

            {/* content */}
            <div className="relative flex flex-col justify-between h-80">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-200 mt-1">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs mt-2 text-gray-200">
                  Status:{" "}
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      blog.status === "published"
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-yellow-500/20 text-yellow-200"
                    }`}
                  >
                    {blog.status}
                  </span>
                </p>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="flex-1 text-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-sm"
                >
                  View
                </Link>
                <Link
                  to={`/edit-blog/${blog.slug}`}
                  state={{ blog }}
                  className="flex-1 text-center px-4 py-2 bg-emerald-600/50 text-white rounded-lg 
             hover:bg-emerald-600/60 backdrop-blur-sm transition-all duration-300 shadow-sm"
                >
                  Edit
                </Link>
                <button

                  onClick={() => handleDelete(blog._id)}
                  className="cursor-pointer flex-1 text-center px-4 py-2 bg-red-600/50 text-white rounded-lg 
             hover:bg-red-600/60 backdrop-blur-sm transition-all duration-300 shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
