import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog-controller.js";
import { protect } from "../middleware/auth-middleware.js";

const blogRouter = express.Router();

blogRouter.post("/", protect, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/:id", protect, updateBlog);
blogRouter.delete("/:id", protect, deleteBlog);

export default blogRouter;
