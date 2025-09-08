import mongoose from "mongoose";

const engagementSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },
    content: {
      type: String,
      trim: true,
      maxlength: 500,
    
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

engagementSchema.index(
  { blog: 1, user: 1, type: 1 },
  { unique: true, partialFilterExpression: { type: "like" } }
);

export default mongoose.model("Engagement", engagementSchema);
