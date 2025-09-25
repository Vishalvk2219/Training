import React, { useEffect,useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";


const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);          // stores blog data
  const [loading, setLoading] = useState(true);     // loading spinner
  const [error, setError] = useState(null); 
  const [page,setPage] = useState(1)
  
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:8080/blog",{
          params:{
            page:page || 1,
            limit:6
          }
        });

        // ✅ Handle success flag and blogs existence safely
        if (res?.data?.success && Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
        } else if (Array.isArray(res?.data)) {
          // In case API directly returns array of blogs
          setBlogs(res.data);
        } else {
          // if API returns unexpected structure
          setBlogs([]);
          setError("No blogs available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching blogs. Please try again later."
        );
        setBlogs([]); // ensure empty state on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  // ✅ Loading state
  if (loading)
    return <p className="text-center py-10">Loading blogs...</p>;

  // ✅ Error state
  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        {error}
      </p>
    );

  // ✅ Empty state
  if (!blogs || blogs.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">
        No blogs found.
      </p>
    );

  // ✅ Normal state
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full text-center">
  <h1
    className="
      inline-block 
      text-5xl font-bold 
      text-emerald-400 
      border-4 border-emerald-500 
      bg-white 
      rounded-2xl 
      py-4 px-8 
      mb-8
      shadow-lg 
      hover:shadow-2xl 
      hover:text-white 
      hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700
      hover:border-transparent 
      transform 
      hover:scale-105 
      transition-all 
      duration-500 
      ease-in-out
    "style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
  >
    All Blogs
  </h1>
</div>



      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          // ✅ Protect BlogCard: if blog is undefined, skip rendering
          blog ? <BlogCard key={blog._id || Math.random()} blog={blog} /> : null
        ))}
      </div>
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
};

export default AllBlogs;
