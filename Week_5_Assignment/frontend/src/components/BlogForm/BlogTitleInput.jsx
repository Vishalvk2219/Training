import React from "react";

const BlogTitleInput = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Blog Title <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="title"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
      placeholder="Enter blog title"
      required
      maxLength={150}
    />
  </div>
);

export default BlogTitleInput;
