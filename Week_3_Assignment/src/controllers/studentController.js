const {
  getUserCollection,
  getEnrollmentCollection,
  getCourseCollection,
} = require("../utils/utils");
const { ObjectId } = require("mongodb");

async function viewProfile(req, res) {
  try {
    const studentId = req.user.id;
    const _id = ObjectId.isValid(studentId) ? new ObjectId(studentId) : null;
    const studentProfile = await getUserCollection().findOne(
      { _id },
      { projection: { name: 1, email: 1, mobile: 1, age: 1 } }
    );
    const student = studentProfile;
    if (!student) {
      res.status(404).json({ error: "Student not Found" });
    }
    const { name, email, mobile, age } = student;
    res.json({ name, email, mobile, age });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" + err });
  }
}

async function getEnrolledCourses(req, res) {
  try {
    const userId = req.user.id;
    const stringId = userId.toString();

    const enrollments = await getEnrollmentCollection()
      .find({ studentId: stringId })
      .toArray();

    const courseIds = enrollments.map((e) => e.courseId);

    const courses = await getCourseCollection()
      .find({ _id: { $in: courseIds } })
      .toArray();

    res.status(200).json({ courses });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error Fetching the enrolled Courses " + err });
  }
}

async function updateProfile(req, res) {
  try {
    const studentId = req.user.id;
    const updateData = req.body;
    const _id = ObjectId.isValid(studentId) ? new ObjectId(studentId) : null;
    const updateStudent = await getUserCollection().findOne({ _id });
    if (!updateStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    const updatedProfile = await getUserCollection().findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      {
        projection: { name: 1, email: 1, mobile: 1, age: 1 },
        returnDocument: "after",
      }
    );
    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
}

async function viewAllCourses(req, res) {
  try {
    let { page = 1, limit = 10, sort = { createdAt: -1 } } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const skip = (page - 1) * limit;
    const courses = await getCourseCollection()
      .find({})
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray();
    return res.status(200).json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (err) {
    console.error("Error fetching courses:", err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
}

async function enrollToCourse(req, res) {
  try {
    const studentId = req.user.id;
    const { courseCode } = req.body;
    if (!studentId || !courseCode) {
      return res
        .status(400)
        .json({ message: "studentId and courseCode are required" });
    }
    const course = await getCourseCollection().findOne({ code: courseCode });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const courseId = course._id;
    const existingEnrollment = await getEnrollmentCollection().findOne({
      studentId,
      courseId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in this course" });
    }
    const result = await getEnrollmentCollection().insertOne({
      studentId,
      courseId,
      enrolledAt: new Date(),
    });
    const check = await getUserCollection().updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: { courses: courseId } }
    );
    res.status(201).json({ message: "Student enrolled successfully", result:result  ,check:check});
  } catch (err) {
    console.error("Enrollment error:", err);
    res
      .status(500)
      .json({ message: "Failed to enroll student", error: err });
  }
}

module.exports = {
  viewProfile,
  getEnrolledCourses,
  updateProfile,
  enrollToCourse,
  viewAllCourses,
};
