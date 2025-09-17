import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth-routes.js";
import blogRouter from "./src/routes/blog-routes.js"
import connectDB from "./src/config/db.js";
import cors from 'cors';


dotenv.config()
const app=express();

app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
    res.status(200).json({message:"HomePage"})
})
app.use('/user',authRouter);
app.use('/blog',blogRouter)

try{
    connectDB();
}catch(err){
    console.log(err)
}

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log("server is Running.")
})