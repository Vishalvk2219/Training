const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { userSchema } = require("../models/userSchema");
const { courseSchema } = require("../models/courseSchema");
const { enrollmentSchema } = require("../models/enrollmentSchema");
dotenv.config();

let client;
let db;

async function connectDB() {
    if (db) {
        console.log("Using existing database connection");
        return db;
    }

    try {
        client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        console.log("MongoClient connected");

        db = client.db(process.env.DB_NAME || "Student_Management");
        console.log("DB connected:", db.databaseName);

        const userAll = await db.listCollections({ name: "users" }).toArray();
        if (userAll.length === 0) {
            console.log("Creating users collection...");
            await db.createCollection("users", userSchema);
            console.log("Users collection created");
        }
        await db.collection("users").createIndex({ email: 1 }, { unique: true });

        const courseAll = await db.listCollections({ name: "courses" }).toArray();
        if (courseAll.length === 0) {
            console.log("Creating courses collection...");
            await db.createCollection("courses", courseSchema);
            console.log("Courses collection created");
        }
        await db.collection("courses").createIndex({ code: 1 }, { unique: true });

        const enrollmentAll = await db
            .listCollections({ name: "enrollments" })
            .toArray();
        if (enrollmentAll.length === 0) {
            console.log("Creating enrollments collection...");
            await db.createCollection("enrollments", enrollmentSchema);
            console.log("Enrollments collection created");
        }

        return db;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db;
}

module.exports = { connectDB, getDB };
