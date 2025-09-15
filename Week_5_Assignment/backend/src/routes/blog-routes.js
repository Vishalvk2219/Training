import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
} from "../controllers/blog-controller.js";
import { protect } from "../middlewares/auth-middleware.js"; // your auth middleware

const blogRouter = express.Router();

// Public Routes
blogRouter.get("/", getBlogs);
blogRouter.get("/:slug", getBlogBySlug);

// Protected Routes
blogRouter.post("/", protect, createBlog);
blogRouter.put("/:id", protect, updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);

// Likes & Comments
blogRouter.put("/:id/like", protect, toggleLike);
blogRouter.post("/:id/comment", protect, addComment);

export default blogRouter;
