import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re passionate about empowering people through knowledge and sharing
          stories that inspire. Our platform helps creators publish high-quality
          blogs and reach the right audience effortlessly.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src="https://i.pinimg.com/originals/b6/18/4a/b6184a1289bbd01c2cb93dd70610d6b6.jpg"
          alt="Our Team"
          className="rounded-xl shadow-lg w-full h-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our mission is to make content creation seamless and powerful. We
            believe every voice matters, and our platform gives writers and
            businesses a beautiful space to share their insights.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With cutting-edge technology, we’re bridging the gap between writers
            and readers, making blog discovery simpler and more engaging.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We constantly evolve to deliver the best possible experience for
              our users.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community</h3>
            <p className="text-gray-600">
              We value building a supportive and collaborative environment for
              creators and readers alike.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Transparency</h3>
            <p className="text-gray-600">
              We’re committed to being open, honest, and clear in everything we
              do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
