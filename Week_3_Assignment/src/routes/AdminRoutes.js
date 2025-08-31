const express = require("express");
const adminRouter = express.Router();
const {
  createCourse,
  getAllStudent,
  updateCourse,
  deleteCourse,
  search,
  getStudentsCourseWise,
  getAnalytics,
  viewAllCourses,
} = require("../controllers/adminController");

adminRouter.post("/create-course", createCourse);
adminRouter.get("/students", getAllStudent);
adminRouter.put("/update-course/:code", updateCourse);
adminRouter.delete("/delete-course/:code", deleteCourse);
adminRouter.get("/all-courses", viewAllCourses);
adminRouter.get("/search", search);
adminRouter.get("/get-student/:courseCode", getStudentsCourseWise);
adminRouter.get("/analytics", getAnalytics);

module.exports = adminRouter;
