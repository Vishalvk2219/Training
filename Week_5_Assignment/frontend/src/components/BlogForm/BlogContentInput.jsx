import React from "react";

const BlogContentInput = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Content <span className="text-red-500">*</span>
    </label>
    <textarea
      name="content"
      rows="8"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
      placeholder="Write your blog content here..."
      required
    />
  </div>
);

export default BlogContentInput;
