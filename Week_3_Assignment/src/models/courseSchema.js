const courseSchemaMain = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "title",
        "department",
        "code",
        "duration",
        "fees",
        "createdAt",
      ],
      properties: {
        title: {
          bsonType: "string",
          description: "Title of the course",
          minLength: 3,
          maxLength: 100,
          pattern: "^[A-Za-z0-9 ,.-]+$",
        },
        department: {
          bsonType: "string",
          description: "Department offering the course",
          minLength: 2,
          maxLength: 50,
          pattern: "^[A-Za-z ]+$",
        },
        code: {
          bsonType: "string",
          description: "Unique course code",
        },
        description: {
          bsonType: "string",
          description: "Course description",
          minLength: 10,
          maxLength: 500,
        },
        duration: {
          bsonType: "string",
          description: "Duration in weeks/months format",
        },
        fees: {
          bsonType: "int",
          description: "Course fee amount",
          minimum: 1,
          maximum: 100000,
        },
        createdAt: {
          bsonType: "date",
          description: "Course creation timestamp",
        },
        updatedAt: {
          bsonType: "date",
          description: "Course update timestamp",
        },
      },
    },
  },
};

module.exports = {courseSchemaMain};