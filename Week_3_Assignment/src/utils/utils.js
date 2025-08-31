const { getDB } = require("../config/db");

function getEnrollmentCollection() {
  const db = getDB();
  return db.collection("enrollments");
}

function getCourseCollection() {
  const db = getDB();
  return db.collection("courses");
}

function getUserCollection() {
  const db = getDB();
  return db.collection("users");
}

module.exports = {
  getEnrollmentCollection,
  getCourseCollection,
  getUserCollection,
};
