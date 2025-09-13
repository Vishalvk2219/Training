import { Router } from "express";
import { register,login, profile,updateProfile} from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post('/register',register);
authRouter.post("/login",login);
authRouter.get("/profile",profile);
authRouter.put("/profile",updateProfile);

export default authRouter;