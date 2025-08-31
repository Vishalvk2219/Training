const enrollmentSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "courseId", "enrolledAt"],
      properties: {
        studentId: {
          bsonType: "objectId",
          description: "Must be a student _id and is required",
        },
        courseId: {
          bsonType: "objectId",
          description: "Must be a course _id and is required",
        },
        enrolledAt: {
          bsonType: "date",
          description: "Must be the enrollment date",
        },
        status: {
          bsonType: "string",
          enum: ["active", "completed", "dropped"],
          description: "Enrollment status",
        },
        updatedAt: {
          bsonType: "date",
          description: "Last updated timestamp",
        },
      },
      additionalProperties: false,
    },
  },
};
