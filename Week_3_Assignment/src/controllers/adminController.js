const {
  getUserCollection,
  getCourseCollection,
  getEnrollmentCollection,
} = require("../utils/utils");

const { ObjectId } = require("mongodb");

async function createCourse(req, res) {
  try {
    const { title, department, code, description, duration, fees } = req.body;
    const existingCourse = await getCourseCollection().findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ error: "Course code already exists" });
    }
    const result = await getCourseCollection().insertOne({
      title,
      department,
      code,
      description,
      duration,
      fees,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Course created successfully", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllStudent(req, res) {
  try {
    const student = await getUserCollection()
      .find({ role: "student" },{projection:{password:0}})
      .toArray();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCourse(req, res) {
  const { code } = req.params;
  const updateData = req.body;

  try {
    const result = await getCourseCollection().findOneAndUpdate(
      { code: code },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Course updated successfully", updatedData: result });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function deleteCourse(req, res) {
  const { code } = req.params;
  try {
    const result = await getCourseCollection().findOneAndDelete({ code });

    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ message: "Course deleted successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function search(req, res) {
  try {
    const { name, email } = req.query;

    const query = {
      $or: [],
    };

    if (name) {
      query.$or.push({ name: { $regex: name, $options: "i" } });
    }

    if (email) {
      query.$or.push({ email: { $regex: email, $options: "i" } });
    }

    if (query.$or.length === 0) {
      return res.status(400).json({
        error: "At least one query parameter (name or email) is required",
      });
    }

    const users = await getUserCollection().find(query).toArray();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
}

async function getStudentsCourseWise(req, res) {
  try {
    const { courseCode } = req.params;
    const course = await getCourseCollection().findOne({ code: courseCode });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const studentData = await getEnrollmentCollection()
      .find({ courseId: course._id })
      .toArray();

    if (studentData.length === 0) {
      return res
        .status(404)
        .json({ message: "No students enrolled in this course" });
    }

    const studentIds = studentData.map((e) => new ObjectId(e.studentId));

    const students = await getUserCollection()
      .find({ _id: { $in: studentIds }},{projection:{password:0}})
      .toArray();

    res.status(200).json({ course: course.title, students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAnalytics(req, res) {
  try {
    const result = await getEnrollmentCollection()
      .aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseData",
          },
        },
        { $unwind: "$courseData" },
        {
          $facet: {
            perCourse: [
              {
                $group: {
                  _id: { id: "$courseData._id", code: "$courseData.code" },
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  _id: 0,
                  code: "$_id.code",
                  count: 1,
                },
              },
            ],
            totalRevenue: [
              {
                $group: {
                  _id: null,
                  totalRevenue: { $sum: "$courseData.fees" },
                },
              },
              {
                $project: {
                  _id: 0,
                  totalRevenue: 1,
                },
              },
            ],
          },
        },
      ])
      .toArray();

    const data = {
      perCourse: result[0].perCourse,
      totalRevenue: result[0].totalRevenue[0]?.totalRevenue || 0,
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err: err.message });
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

module.exports = {
  createCourse,
  getAllStudent,
  updateCourse,
  deleteCourse,
  viewAllCourses,
  search,
  getStudentsCourseWise,
  getAnalytics,
};
