# 📝 Blog API Backend

A full-featured **REST API for blogging platforms**, built with **Node.js, Express, MongoDB, and JWT Authentication**.  
Supports **user authentication, categories, blogs, likes, comments, and admin controls**.  

---

## 🚀 Features
- User registration & login with JWT authentication  
- Role-based access control (Admin/User)  
- CRUD operations for Blogs & Categories  
- Like/Unlike functionality  
- Comment system with add/get/delete  
- CORS configured with custom origins  
- Request logging using **morgan** (saved in `/logs`)  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Vishalvk2219/Training/tree/main/Week_4_Assignment

cd Week_4_Assignment

# Install dependencies
npm install

# Setup environment variables
cp .env

# Run server (development)
npm run dev

# Or run in production
npm start
```

---

## ⚙️ Environment Variables

Create a `.env` file with the following keys:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
JWT_SECRET=your_jwt_secret
```
## 📂 Project Structure
```
BLOG_API/
│
├── .env                                 
├── index.js                             
├── package.json                         
├── package-lock.json                    
├── Blog API.postman_collection.json     
├── postmanCollection.json               
│
├── logs/
│   └── access.log                       
│
├── node_modules/                        
│
├── src/
│   ├── config/
│   │   └── db.js                       
│   │
│   ├── controllers/                     
│   │   ├── auth-controller.js
│   │   ├── blog-controller.js
│   │   ├── category-controller.js
│   │   └── engagement-controller.js     
│   │
│   ├── middleware/                      
│   │   └── auth-middleware.js
│   │
│   ├── models/                          
│   │   ├── blog-model.js
│   │   ├── category-model.js
│   │   ├── engagement-model.js          
│   │   └── user-model.js
│   │
│   └── routes/                         
│       ├── auth-route.js
│       ├── blog-route.js
│       ├── category-route.js
│       └── engagement-route.js
```

---

## 📚 API Routes Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **Auth** ||||
| POST   | `/api/auth/register`   | Register new user | ❌ |
| POST   | `/api/auth/login`      | Login user | ❌ |
| **Categories** ||||
| POST   | `/api/categories`      | Create category | ✅ Admin |
| GET    | `/api/categories`      | Get all categories | ❌ |
| PUT    | `/api/categories/:id`  | Update category | ✅ Admin |
| DELETE | `/api/categories/:id`  | Delete category | ✅ Admin |
| **Blogs** ||||
| POST   | `/api/blogs`           | Create blog | ✅ |
| GET    | `/api/blogs`           | Get all blogs | ❌ |
| GET    | `/api/blogs/:id`       | Get single blog | ❌ |
| PUT    | `/api/blogs/:id`       | Update blog | ✅ (owner/admin) |
| DELETE | `/api/blogs/:id`       | Delete blog | ✅ (owner/admin) |
| **Engagements** ||||
| POST   | `/api/engagements/like/:blogId`    | Toggle like on a blog | ✅ |
| POST   | `/api/engagements/comment/:blogId` | Add comment to a blog | ✅ |
| GET    | `/api/engagements/comment/:blogId` | Get all comments for a blog | ❌ |
| DELETE | `/api/engagements/comment/:id`     | Delete a comment | ✅ (owner/admin) |

✅ = Requires JWT authentication  
❌ = Public access  

---

## 📌 Auth Routes

### Register
```http
POST /api/auth/register
```
**Request**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```
**Response**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

### Login
```http
POST /api/auth/login
```
**Request**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```
**Response**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "_id": "64e5...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 📂 Category Routes

### Create Category
```http
POST /api/categories
Authorization: Bearer <token>
```
**Request**
```json
{ "name": "Technology" }
```
**Response**
```json
{
  "message": "Category created successfully",
  "category": { "_id": "64e5...", "name": "Technology" }
}
```

### Get Categories
```http
GET /api/categories
```
**Response**
```json
[
  { "_id": "64e5...", "name": "Technology" },
  { "_id": "64e6...", "name": "Science" }
]
```

---

## 📝 Blog Routes

### Create Blog
```http
POST /api/blogs
Authorization: Bearer <token>
```
**Request**
```json
{
  "title": "My First Blog",
  "content": "This is the blog content.",
  "category": "64e5..."
}
```
**Response**
```json
{
  "message": "Blog created successfully",
  "blog": { "_id": "64e7...", "title": "My First Blog" }
}
```

### Get All Blogs
```http
GET /api/blogs
```
**Response**
```json
[
  {
    "_id": "64e7...",
    "title": "My First Blog",
    "likeCount": 0,
    "commentCount": 0
  }
]
```

---

## ❤️ Engagement Routes

### Toggle Like
```http
POST /api/engagements/like/:blogId
Authorization: Bearer <token>
```
**Response**
```json
{ "message": "Blog liked" }
```
or
```json
{ "message": "Like removed" }
```

### Add Comment
```http
POST /api/engagements/comment/:blogId
Authorization: Bearer <token>
```
**Request**
```json
{ "content": "Great post!" }
```
**Response**
```json
{
  "message": "Comment added",
  "comment": { "_id": "64e8...", "content": "Great post!" }
}
```

### Get Comments
```http
GET /api/engagements/comment/:blogId
```
**Response**
```json
[
  {
    "_id": "64e8...",
    "content": "Great post!",
    "user": { "name": "John Doe", "email": "john@example.com" }
  }
]
```

### Delete Comment
```http
DELETE /api/engagements/comment/:id
Authorization: Bearer <token>
```
**Response**
```json
{ "message": "Comment deleted" }
```

---


