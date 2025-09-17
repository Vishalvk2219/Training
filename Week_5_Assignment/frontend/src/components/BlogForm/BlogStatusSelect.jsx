import React from "react";

const BlogStatusSelect = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Status
    </label>
    <select
      name="status"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  </div>
);

export default BlogStatusSelect;
