const express = require("express");
const studentRoutes = express.Router();
const {
  viewProfile,
  getEnrolledCourses,
  updateProfile,
  viewAllCourses,
  enrollToCourse,
} = require("../controllers/studentController");

studentRoutes.get("/profile", viewProfile);
studentRoutes.get("/enrolled-courses", getEnrolledCourses);
studentRoutes.put("/update-profile", updateProfile);
studentRoutes.get("/all-courses", viewAllCourses);
studentRoutes.post("/enroll", enrollToCourse);

module.exports = studentRoutes;
