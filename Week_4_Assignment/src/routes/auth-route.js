import express from "express";
import { register, login, getProfile, updateProfile} from "../controllers/auth-controller.js";
import { protect } from "../middleware/auth-middleware.js";

const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", protect, getProfile);
authRouter.put("/profile",protect,updateProfile);

export default authRouter;
