import React from "react";

const BlogFeaturedImageInput = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Featured Image URL
    </label>
    <input
      type="url"
      name="featuredimage"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
      placeholder="https://example.com/image.jpg"
    />
    {value && (
      <img
        src={value}
        alt="preview"
        className="mt-3 w-full h-48 object-cover rounded-lg shadow-sm"
      />
    )}
  </div>
);

export default BlogFeaturedImageInput;
