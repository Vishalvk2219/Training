import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // For password change
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // your API returns data inside res.data.data
        const userData = res.data.data;

        setUser({
          name: userData.name || "",
          email: userData.email || "",
          avatar: userData.avatar || "",
          bio: userData.bio || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // ✅ Save profile info
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/user/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile");
    }
  };

  // ✅ Change password
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      // ideally your backend has /user/change-password endpoint
      await axios.put("http://localhost:8080/user/change-password", passwords, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">Loading profile…</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        My Profile
      </h2>

      {message && (
        <p
          className={`text-center text-sm font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Profile Info */}
      <form onSubmit={handleProfileSave} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Profile Information
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            type="url"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {user.avatar && (
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <p className="text-sm text-gray-500">Current Avatar</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            value={user.bio}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            placeholder="Tell something about yourself..."
          />
        </div>

        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          Save Profile
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordSave} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Change Password
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="w-full rounded-lg border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
