import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      maxlength: 500,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title too long"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content should be at least 20 characters"],
    },

    featuredimage: {
      type: String,
      default: "https://via.placeholder.com/1200x500?text=No+Featured+Image",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: {
      type: [String],
      set: (tags) =>
        tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean), // auto-trim + lowercase
    },

    category: {
      type: String,
      enum: [
        "Travel Blogs",
        "Lifestyle Blogs",
        "Tech Blogs",
        "Food and Recipe Blogs",
        "Fitness and Health Blogs",
        "Beauty and Fashion Blogs",
        "Personal Development Blogs",
        "Finance and Investment Blogs",
        "Parenting Blogs",
        "Education Blogs",
      ],
      required: [true, "Category is required"],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    metadescription: {
      type: String,
      maxlength: [200, "Meta description too long"],
      trim: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],

    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* 
📌 Pre-save Hook
- Automatically create slug
- Ensure uniqueness (add random suffix if slug exists)
*/
blogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;

    // Check if slug already exists
    const Blog = mongoose.model("Blog", blogSchema);
    let counter = 1;
    while (await Blog.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
