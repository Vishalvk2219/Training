import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const token = localStorage.getItem("token");

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // Save profile
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/user/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
      toast.error("Failed to update profile")
    }
  };

  // Change password
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage("New passwords do not match");
      toast.warn("New passwords do not match");
      return;
    }
    try {
      await axios.put("http://localhost:8080/user/profile", passwords, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Password changed successfully!");
      toast.success("Password changed successfully!")
      setPasswords({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      setShowPasswordFields(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to change password");
      toast.error("Failed to change password");
    }
  };

  const removeAvatar = () => {
    setUser((prev) => ({ ...prev, avatar: "" }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        My Profile
      </h2>

      {message && (
        <div
          className={`mb-6 text-center px-4 py-2 rounded-lg shadow ${
            message.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Profile Info */}
      <form
        onSubmit={handleProfileSave}
        className="space-y-6 bg-white p-6 rounded-xl shadow border border-emerald-200"
      >
        <h3 className="text-xl font-semibold text-emerald-700 border-b border-emerald-300 pb-2">
          Profile Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-1">
            Email (cannot be changed)
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full rounded-lg bg-gray-100 border-emerald-300 shadow-sm cursor-not-allowed"
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-1">
            Avatar URL
          </label>
          <div className="flex items-center gap-3">
            <input
              type="url"
              name="avatar"
              value={user.avatar}
              onChange={handleChange}
              className="flex-1 rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              placeholder="https://example.com/avatar.jpg"
            />
            {user.avatar && (
              <button
                type="button"
                onClick={removeAvatar}
                className="text-sm bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
          {user.avatar && (
            <div className="mt-3 flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border border-emerald-300"
              />
              <p className="text-sm text-gray-500">Current Avatar</p>
            </div>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-emerald-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            value={user.bio}
            onChange={handleChange}
            className="w-full rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
            placeholder="Tell something about yourself..."
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md disabled:bg-gray-300"
          disabled={!user.name}
        >
          Save Profile
        </button>
      </form>

      {/* Password Section */}
      <div className="text-center mt-6">
        {!showPasswordFields && (
          <button
            onClick={() => setShowPasswordFields(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md"
          >
            Change Password
          </button>
        )}
      </div>

      {showPasswordFields && (
        <form
          onSubmit={handlePasswordSave}
          className="space-y-6 bg-white p-6 rounded-xl shadow border border-emerald-200 mt-6"
        >
          <h3 className="text-xl font-semibold text-emerald-700 border-b border-emerald-300 pb-2">
            Change Password
          </h3>

          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              required
              minLength={6}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              required
              minLength={6}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPasswordFields(false)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 shadow-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md"
            >
              Save New Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
