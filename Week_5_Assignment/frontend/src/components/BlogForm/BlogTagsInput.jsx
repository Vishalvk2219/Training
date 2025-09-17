import React, { useState, useEffect } from "react";

const TAG_COLORS = [
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
];

const BlogTagsInput = ({ initialTags, onTagsChange }) => {
  const [tagsArray, setTagsArray] = useState(initialTags || []);

  useEffect(() => {
    onTagsChange(tagsArray);
  }, [tagsArray]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tagsArray.includes(value)) {
        setTagsArray([...tagsArray, value]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setTagsArray(tagsArray.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags <span className="text-gray-500 text-xs">(press Enter or comma to add)</span>
      </label>
      <div className="w-full rounded-lg border border-gray-300 p-2 flex flex-wrap gap-2 focus-within:border-gray-800">
        {tagsArray.map((tag, index) => {
          const color = TAG_COLORS[index % TAG_COLORS.length];
          return (
            <span
              key={tag}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-xs hover:text-gray-800"
              >
                ✕
              </button>
            </span>
          );
        })}
        <input
          type="text"
          onKeyDown={handleTagKeyDown}
          className="flex-grow p-1 outline-none"
          placeholder="Type and press Enter…"
        />
      </div>
    </div>
  );
};

export default BlogTagsInput;
