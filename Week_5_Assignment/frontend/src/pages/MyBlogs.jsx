import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  // get token for auth
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
      // remove from state after delete
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading your blogs...</p>;
  if (!blogs.length) return <p className="text-center py-10">No blogs created yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        My Blogs
      </h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              {/* Left section */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      blog.status === "published"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {blog.status}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/edit-blog/${blog.slug}`}
                  state={{blog}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyBlogs;
