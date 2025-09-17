import { Router } from "express";
import { register,login, profile,updateProfile} from "../controllers/auth-controller.js";
import { protect } from "../middlewares/auth-middleware.js";
const authRouter = Router();

authRouter.post('/register',register);
authRouter.post("/login",login);
authRouter.get("/profile",protect,profile);
authRouter.put("/profile",protect,updateProfile);

export default authRouter;