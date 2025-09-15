import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-1.5xl font-bold text-white bg-gray-800 px-4 py-2 rounded">
            BlogWeb
          </div>



          {/* Main Links */}
          <div className="hidden md:flex space-x-6">
            {[
              { to: "/", label: "Home" },
              { to: "/blog", label: "Blog" },
              { to: "/category", label: "Category" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
              >
                {link.label}
                {/* cool underline animation */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 hover:scale-105 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
