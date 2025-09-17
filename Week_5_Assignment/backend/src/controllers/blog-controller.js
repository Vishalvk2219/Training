import Blog from "../models/blog-schema.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, featuredimage, tags, category, status, metadescription } = req.body;

    const blog = new Blog({
      title,
      content,
      featuredimage,
      tags,
      category,
      status,
      metadescription,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create blog", error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { tag, category } = req.query;
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 10;
    const skip = (page-1)*limit;
    const filter = { isdeleted: false, status: "published" };
    if (tag) filter.tags = tag;
    if (category) filter.category = category;

    const blogs = await Blog.find(filter)
      .skip(skip).limit(limit)
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("author", "name email avatar")
      .populate("comments.user", "name avatar");

    if (!blog || blog.isdeleted) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blog", error: error.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.isdeleted)
      return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.author.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "You are not authorized to update this blog" });

    const fields = ["title", "content", "featuredimage", "tags", "category", "status", "metadescription"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) blog[field] = req.body[field];
    });

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update blog", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.isdeleted)
      return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.author.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "You are not authorized to delete this blog" });

    blog.isdeleted = true;
    await blog.save();

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete blog", error: error.message });
  }
};

export const myBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id, isdeleted: false })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" ,error:err.message});
  }
};


export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.isdeleted)
      return res.status(404).json({ success: false, message: "Blog not found" });

    const userId = req.user.id;
    const index = blog.likes.indexOf(userId);

    if (index > -1) {
      blog.likes.splice(index, 1);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Like status updated",
      likesCount: blog.likes.length,
      likes: blog.likes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to toggle like", error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.isdeleted)
      return res.status(404).json({ success: false, message: "Blog not found" });

    blog.comments.push({
      user: req.user.id,
      comment,
    });

    await blog.save();
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add comment", error: error.message });
  }
};

// controllers/categoryController.js
export const getCategories = async (req, res) => {
  try {
    const categories = [
      { _id: 1, name: "Travel Blogs", slug: "travel-blogs" },
      { _id: 2, name: "Lifestyle Blogs", slug: "lifestyle-blogs" },
      { _id: 3, name: "Tech Blogs", slug: "tech-blogs" },
      { _id: 4, name: "Food and Recipe Blogs", slug: "food-recipe-blogs" },
      { _id: 5, name: "Fitness and Health Blogs", slug: "fitness-health-blogs" },
      { _id: 6, name: "Beauty and Fashion Blogs", slug: "beauty-fashion-blogs" },
      { _id: 7, name: "Personal Development Blogs", slug: "personal-development-blogs" },
      { _id: 8, name: "Finance and Investment Blogs", slug: "finance-investment-blogs" },
      { _id: 9, name: "Parenting Blogs", slug: "parenting-blogs" },
      { _id: 10, name: "Education Blogs", slug: "education-blogs" },
    ];

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
