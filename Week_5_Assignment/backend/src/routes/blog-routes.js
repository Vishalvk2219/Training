import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
  myBlogs,
  getCategories,
} from "../controllers/blog-controller.js";
import { protect } from "../middlewares/auth-middleware.js"; // your auth middleware

const blogRouter = express.Router();

// Public Routes
blogRouter.get("/", getBlogs);
blogRouter.get("/public/:slug", getBlogBySlug);
blogRouter.get("/get-categories", getCategories);

// Protected Routes
blogRouter.post("/", protect, createBlog);
blogRouter.put("/:id", protect, updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);
blogRouter.get("/my-blogs", protect, myBlogs);

// Likes & Comments
blogRouter.put("/:id/like", protect, toggleLike);
blogRouter.post("/:id/comment", protect, addComment);

export default blogRouter;
