import Blog from "../models/blog-model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const blog = await Blog.create({
      title,
      content,
      category,
      author: req.user.id,
    });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Unable to create blog", error: err.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isDeleted: false })
      .populate("author", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch blogs", error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("category", "name");

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch blog", error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update this blog" });
    }

    const allowedFields = ["title", "content", "category"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    Object.assign(blog, updates);
    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Unable to update blog", error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }

    blog.isDeleted = true;
    await blog.save();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete blog", error: err.message });
  }
};
