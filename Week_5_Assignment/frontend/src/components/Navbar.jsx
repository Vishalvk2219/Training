import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false); // profile dropdown toggle
  const [mobileMenu, setMobileMenu] = useState(false); // hamburger menu toggle
  const [avatar, setAvatar] = useState('')

  // Check login status
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ active + normal styles
  const baseLinkClass =
    "relative transition-colors duration-300 group px-1 block"; // block for mobile stacking
  const activeLinkClass =
    "text-emerald-500 font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-emerald-400 after:transition-all after:duration-300";
  const inactiveLinkClass =
    "text-gray-700 hover:text-emerald-700 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-800 group-hover:after:w-full after:transition-all after:duration-300";

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/category", label: "Category" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  

  useEffect(() => {
    const userAvatar = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    
     setAvatar(res.data.data.avatar);
  }
   if (isLoggedIn) {
    userAvatar();
  }
  }, [isLoggedIn]);

return (
  <nav className="bg-white relative z-40 mt-1">
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-1">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-1.5xl font-bold text-white bg-gray-800 hover:scale-105 transition-all duration-300 px-4 py-2 rounded shadow-md">
          BlogWeb
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-md font-bold">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.label !== "Blog" ? true : false}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass
                } font-sans font-medium tracking-wide antialiased transition-colors duration-300 px-2`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Profile dropdown (always visible, mobile & desktop) */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <img
                  src={avatar || 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border border-emerald-300"
                />
              </button>
              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg z-50 overflow-hidden hover:shadow-2xl border border-gray-300">
                  <NavLink
                    to="/profile"
                    onClick={() => setOpenProfile(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 ${isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-200"
                      } transition-colors duration-300`
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/create-blog"
                    onClick={() => setOpenProfile(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 ${isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-200"
                      } transition-colors duration-300`
                    }
                  >
                    Create Blog
                  </NavLink>
                  <NavLink
                    to="/myblogs"
                    onClick={() => setOpenProfile(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 ${isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-200"
                      } transition-colors duration-300`
                    }
                  >
                    My Blogs
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpenProfile(false);
                    }}
                    className="w-full text-left font-semibold block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "hidden md:block px-4 py-2 bg-emerald-500 text-white rounded-md shadow-sm transition-all duration-300"
                    : "hidden md:block px-4 py-2 bg-gray-800 text-gray-100 hover:bg-emerald-500 hover:text-white rounded-md shadow-sm transition-all duration-300"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "hidden md:block px-4 py-2 bg-emerald-500 text-white rounded-md shadow-sm transition-all duration-300"
                    : "hidden md:block px-4 py-2 bg-gray-800 text-gray-100 hover:bg-emerald-500 hover:text-white rounded-md shadow-sm transition-all duration-300"
                }
              >
                Register
              </NavLink>
            </>
          )}


          {/* Hamburger always visible on mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileMenu && (
      <div className="md:hidden px-4 pb-4 bg-white shadow-md border-t border-gray-200">
        <div className="flex flex-col space-y-2">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 hover:scale-105 transition-all duration-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    )}
  </nav>
);
};

export default Navbar;
