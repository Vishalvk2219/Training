import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected");
  } catch (err) {
    console.log("Error connecting to Db...." + err);
  }
};
export default connectDB;
