import Engagement from "../models/engagement-model.js";
import Blog from "../models/blog-model.js";

export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;

    const existing = await Engagement.findOne({
      blog: blogId,
      user: req.user.id,
      type: "like",
    });

    if (existing) {
      await existing.deleteOne();
      await Blog.findByIdAndUpdate(blogId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "Like removed successfully" });
    }

    await Engagement.create({ blog: blogId, user: req.user.id, type: "like" });
    await Blog.findByIdAndUpdate(blogId, { $inc: { likeCount: 1 } });

    res.status(201).json({ message: "Blog liked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to toggle like", error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = await Engagement.create({
      blog: blogId,
      user: req.user.id,
      type: "comment",
      content,
    });

    await Blog.findByIdAndUpdate(blogId, { $inc: { commentCount: 1 } });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(500).json({ message: "Unable to add comment", error: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Engagement.find({
      blog: blogId,
      type: "comment",
      isDeleted: false,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch comments", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Engagement.findById(id);
    if (!comment || comment.type !== "comment" || comment.isDeleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    comment.isDeleted = true;
    await comment.save();
    await Blog.findByIdAndUpdate(comment.blog, { $inc: { commentCount: -1 } });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete comment", error: err.message });
  }
};
