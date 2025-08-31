const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");

const { login, register } = require("./src/controllers/authController");
const authMiddleware = require("./src/middleware/authMiddleware");
const adminOnlyMiddleware = require("./src/middleware/adminOnlyMiddleware");
const studentOnlyMiddleware = require("./src/middleware/studentOnlyMiddleware");
const adminRouter = require("./src/routes/AdminRoutes");
const studentRouter = require("./src/routes/StudentRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Management API is running ");
});

app.post("/login", login);
app.post("/register", register);
app.use("/admin", authMiddleware, adminOnlyMiddleware, adminRouter);
app.use("/student", authMiddleware, studentOnlyMiddleware, studentRouter);

async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
