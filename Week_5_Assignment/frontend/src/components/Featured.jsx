import React from "react";

const FeaturedPost = () => {
  return (
    <div className="max-w-6xl mx-auto my-5">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          className="w-full h-95 object-cover"
          src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg"
          alt="Blog"
        />

        {/* Content Card */}
        <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-6 max-w-md">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Technology
          </span>
          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            The Impact of Technology on the Workplace: How Technology is Changing
          </h2>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Author"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-gray-700">Jason Francisco</p>
              <p className="text-xs text-gray-400">August 20, 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
