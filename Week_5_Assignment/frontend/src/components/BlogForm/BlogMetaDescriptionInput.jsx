import React from "react";

const BlogMetaDescriptionInput = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Meta Description (max 200 chars)
    </label>
    <input
      type="text"
      name="metadescription"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
      placeholder="Short SEO-friendly description"
      maxLength="200"
    />
  </div>
);

export default BlogMetaDescriptionInput;
