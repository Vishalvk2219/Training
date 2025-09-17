import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import BlogTitleInput from "../components/BlogForm/BlogTitleInput";
import BlogMetaDescriptionInput from "../components/BlogForm/BlogMetaDescriptionInput";
import BlogContentInput from "../components/BlogForm/BlogContentInput";
import BlogCategorySelect from "../components/BlogForm/BlogCategorySelect";
import BlogTagsInput from "../components/BlogForm/BlogTagsInput";
import BlogFeaturedImageInput from "../components/BlogForm/BlogFeaturedImageInput";
import BlogStatusSelect from "../components/BlogForm/BlogStatusSelect";
import BlogFormActions from "../components/BlogForm/BlogFormActions";

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const blogFromState = location.state?.blog;

  const [categories, setCategories] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    featuredimage: "",
    metadescription: "",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/get-categories`);
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // prefill blog
  useEffect(() => {
    if (blogFromState) {
      setFormData({
        title: blogFromState.title || "",
        content: blogFromState.content || "",
        category: blogFromState.category || "",
        featuredimage: blogFromState.featuredimage || "",
        metadescription: blogFromState.metadescription || "",
        status: blogFromState.status || "draft",
      });
      setTagsArray(blogFromState.tags || []);
    } else if (slug) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${slug}`);
          const blog = res.data;
          setFormData({
            title: blog.title || "",
            content: blog.content || "",
            category: blog.category || "",
            featuredimage: blog.featuredimage || "",
            metadescription: blog.metadescription || "",
            status: blog.status || "draft",
          });
          setTagsArray(blog.tags || []);
        } catch (err) {
          console.error(err);
          setMessage("❌ Failed to load blog data");
        }
      };
      fetchBlog();
    }
  }, [blogFromState, slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.content.trim()) return "Content is required";
    if (!formData.category.trim()) return "Category is required";
    if (formData.metadescription.length > 200) return "Meta description must be 200 characters or less";
    return null;
  };

  const saveBlog = async () => {
    const validationError = validateForm();
    if (validationError) {
      setMessage(`❌ ${validationError}`);
      return null;
    }
    setLoading(true);
    setMessage("");

    const payload = {
      ...formData,
      tags: tagsArray,
    };

    try {
      if (slug) {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/blog/${blogFromState._id}`,
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return res.data.blog;
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/blog`,
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return res.data.blog;
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving blog");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    const draftBlog = await saveBlog();
    if (draftBlog && draftBlog.slug) navigate(`/blog/${draftBlog.slug}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = await saveBlog();
    if (blog) {
      setMessage(slug ? "✅ Blog updated successfully!" : "✅ Blog saved successfully!");
      if (!slug) {
        setFormData({ title: "", content: "", category: "", featuredimage: "", metadescription: "", status: "draft" });
        setTagsArray([]);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{slug ? "Edit Blog" : "Create New Blog"}</h2>

      {message && (
        <p className={`mb-4 text-center text-sm font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <BlogTitleInput value={formData.title} onChange={handleChange} />
        <BlogMetaDescriptionInput value={formData.metadescription} onChange={handleChange} />
        <BlogContentInput value={formData.content} onChange={handleChange} />
        <BlogCategorySelect categories={categories} value={formData.category} onChange={handleChange} />
        <BlogTagsInput initialTags={tagsArray} onTagsChange={setTagsArray} />
        <BlogFeaturedImageInput value={formData.featuredimage} onChange={handleChange} />
        <BlogStatusSelect value={formData.status} onChange={handleChange} />
        <BlogFormActions onPreview={handlePreview} onSubmit={handleSubmit} loading={loading} slug={slug} />
      </form>
    </div>
  );
};

export default CreateBlog;
