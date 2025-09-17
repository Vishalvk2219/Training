import React from "react";

const BlogCategorySelect = ({ categories, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Category <span className="text-red-500">*</span>
    </label>
    <select
      name="category"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
      required
    >
      <option value="">Select category</option>
      {categories.map((cat) => (
        <option key={cat._id || cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>
);

export default BlogCategorySelect;
