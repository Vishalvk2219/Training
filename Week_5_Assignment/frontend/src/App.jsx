// src/App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllBlogs from "./pages/AllBlogs";
import FullBlog from "./pages/FullBlog";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import Chatbot from "./components/chatbot/Chatbot";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:slug" element={<FullBlog />} />
          <Route path="/blog" element={<AllBlogs firstPage={true} />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Private routes grouping */}
          <Route element={<PrivateRoute />}>
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:slug" element={<CreateBlog />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/preview-blog" element={<FullBlog />} />
          </Route>

          {/* Optional 404 */}
          <Route path="*" element={<h1 className="text-center py-10">404 - Page Not Found</h1>} />
        </Routes>
        <Chatbot/>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
