module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "role", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Full name of the user",
          minLength: 2,
          maxLength: 50,
          pattern: "^[A-Za-z ]+$"
        },
        email: {
          bsonType: "string",
          description: "User email address",
          pattern: "^.+@.+\\..+$"
        },
        password: {
          bsonType: "string",
          description: "Enter Password",
          minLength: 8,
          maxLength: 128,
        },
        mobile: {
          bsonType: "string",
          description: "10-digit mobile number",
          minLength: 10,
          maxLength: 10,
          pattern: "^[0-9]{10}$",
        },

        age: {
          bsonType: "int",
          description: "Age of the user (must be realistic)",
          minimum: 5,
          maximum: 100,
        },
        role: {
          bsonType: "string",
          description: "Defines whether the user is a student or an admin",
          enum: ["student", "admin"],
        },
        courses: {
          bsonType: "array",
          description: "Courses the student is enrolled in",
          uniqueItems: true,
          items: { bsonType: "objectId" },
        },
        createdAt: {
          bsonType: "date",
          description: "Account creation timestamp",
        },
        updatedAt: {
          bsonType: "date",
          description: "Account last updated timestamp",
        },
      },
      additionalProperties: false,
    },
  },
};
