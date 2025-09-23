import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedPost from "../components/Featured";
import LatestPosts from "../components/LatestPost"

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/blog/");
        if (res.data.success && res.data.blogs?.length > 0) {
          // Sort by latest first
          const sorted = res.data.blogs.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBlogs(sorted);
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center py-10">Loading posts…</p>;
  if (!blogs.length) return <p className="text-center py-10">No posts found.</p>;

  return (
    <div>
      <FeaturedPost blog={blogs[0]} />
      <LatestPosts blogs={blogs.slice(1,7)} />
    </div>
  );
};

export default Home;
