import React from "react";

const BlogFormActions = ({ onPreview, loading, slug }) => (
  <div className="flex items-center justify-between gap-4">
    <button
      type="button"
      onClick={onPreview}
      disabled={loading}
      className="w-1/2 bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
    >
      {loading ? "Saving..." : "Preview Blog"}
    </button>
    <button
      type="submit"
      disabled={loading}
      className="w-1/2 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200"
    >
      {loading ? "Saving..." : slug ? "Update Blog" : "Save Blog"}
    </button>
  </div>
);

export default BlogFormActions;
