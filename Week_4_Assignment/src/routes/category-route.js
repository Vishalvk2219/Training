import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category-controller.js";
import { protect, adminOnly } from "../middleware/auth-middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, adminOnly, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.put("/:id", protect, adminOnly, updateCategory);
categoryRouter.delete("/:id", protect, adminOnly, deleteCategory);

export default categoryRouter;
