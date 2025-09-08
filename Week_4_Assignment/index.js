import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth-route.js";
import categoryRoutes from "./src/routes/category-route.js";
import blogRoutes from "./src/routes/blog-route.js";
import engagementRoutes from "./src/routes/engagement-route.js";

dotenv.config();
connectDB();

const app = express();


const allowedOrigins = [
  "http://localhost:8080"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);


morgan.token("id", (req) => (req.user ? req.user._id : "Guest"));
morgan.token("role", (req) => (req.user ? req.user.role : "Anonymous"));
morgan.token("body", (req) =>
  req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : "-"
);


app.use(morgan("dev"));

app.use(
  morgan(
    ":method :url :status :response-time ms - user=:id role=:role body=:body",
    { stream: accessLogStream }
  )
);


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/engagements", engagementRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
