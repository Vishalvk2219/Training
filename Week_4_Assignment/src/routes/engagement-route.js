import express from "express";
import {
  toggleLike,
  addComment,
  getComments,
  deleteComment,
} from "../controllers/engagement-controller.js";
import { protect } from "../middleware/auth-middleware.js";

const engagementRouter = express.Router();

engagementRouter.post("/:blogId/like", protect, toggleLike);
engagementRouter.post("/:blogId/comment", protect, addComment);
engagementRouter.get("/:blogId/comments", getComments);
engagementRouter.delete("/comment/:id", protect, deleteComment);

export default engagementRouter;
