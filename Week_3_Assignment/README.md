# 📚 Student Management API

A **Node.js + Express** backend for managing students, courses, and role-based access (Admin & Student).  
This project uses **MongoDB** and **JWT authentication**.

---

## 🚀 Features
- User Authentication (JWT)  
- Role-based Access Control (Admin / Student)  
- Admin APIs for course & student management  
- Student APIs for viewing courses & managing profiles   
- Middleware for security and validation  

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT  

---

## 📂 Project Structure

```bash
│── .env
│── index.js
│── package.json
│
├── src/
│   ├── config/
│   │   └── db.js                  
│   │
│   ├── controllers/
│   │   ├── authController.js     
│   │   ├── adminController.js
│   │   └── studentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminOnlyMiddleware.js
│   │   └── studentOnlyMiddleware.js
│   │
│   ├── models/
│   │   ├── courseSchema.js
│   │   ├── enrollmentSchema.js
│   │   └── userSchema.js
│   │
│   ├── routes/
│   │   ├── AdminRoutes.js
│   │   ├── StudentRoutes.js
│   │
│   └── utils/
│       └── utils.js
```

---

## ⚙️ Setup & Installation

1. Clone the repo:
   ```bashWeek_3_Assignment
   git clone https://github.com/Vishalvk2219/Training.git
   cd Assignments/Week_3_Assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

Server runs on 👉 `http://localhost:8080`

---

# 🔑 API Endpoints

## Auth
- **POST** `/register` → Register a new user (student/admin).  
- **POST** `/login` → Login and get JWT.  

## Student Routes
| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | `/student/profile`          | View profile information     |
| GET    | `/student/enrolled-courses` | List enrolled courses        |
| PUT    | `/student/update-profile`   | Update student profile       |
| GET    | `/student/all-courses`      | List all available courses   |
| POST   | `/student/enroll`           | Enroll in a course           |

## Admin Routes
| Method | Endpoint                         | Description                                     |
|--------|----------------------------------|-------------------------------------------------|     
| POST   | `/admin/create-course`           | Create a new course                             |
| GET    | `/admin/students`                | View all students                               |
| PUT    | `/admin/update-course/:code`     | Update course details (by course code)          |
| DELETE | `/admin/delete-course/:code`     | Delete a course (by course code)                |
| GET    | `/admin/all-courses`             | List all courses                                |
| GET    | `/admin/search`                  | Search students by name or email                |
| GET    | `/admin/get-student/:courseCode` | View all students enrolled in a course          |        
| GET    | `/admin/analytics`               | View No. of Student per course and total revenue|                   

**Note:** Replace `:code` and `:courseCode` with the corresponding course code.

---

## 🧪 Testing with Postman

1. Import the included `postman_collection.json`.  
2. All requests are configured to use `http://localhost:8080` as the server URL.  
3. After logging in, copy the **JWT token** from the response and set it in the `Authorization` header as:  
   ```
   Authorization: Bearer <your_token_here>
   ```
4. Test endpoints based on your role:  
   - **Student** → `/student/...` routes  
   - **Admin** → `/admin/...` routes  

---

## 🔑 Example Requests & Responses

### 🧍 Authentication
#### 📌 Register User
```http
POST http://localhost:8080/register
```
**Body**
```json
{
    "name": "Arjun Patel",
    "email": "arjun.patel@example.com",
    "password": "hashedValue999",
    "role": "student"
}
```
**Response**
```json
{
  "message": "User Registered Successfully"
}
```

#### 📌 Login User
```http
POST http://localhost:8080/login
```
**Body**
```json
{
    "email": "rahul.mehta@example.com",
    "password": "mySecret789"
}
```
**Response**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

### 🎓 Student Routes
#### 📌 View Profile
```http
GET http://localhost:8080/student/profile
Authorization: Bearer <student_token>
```
**Response**
```json
{
    "name": "Arjun Patel",
    "email": "arjun.patel@example.com",
    "mobile": "7895426512",
    "age": null
}
```

#### 📌 Update Profile
```http
PUT http://localhost:8080/student/update-profile
Authorization: Bearer <student_token>
```
**Body**
```json
{
    "mobile": "7895426512"
}
```
**Response**
```json
{
  "message": "Profile updated successfully",
  "data": {
    "name": "Arjun Patel",
    "email": "arjun.patel@example.com",
    "mobile": "7895426512"
  }
}
```

#### 📌 View All Courses
```http
GET http://localhost:8080/student/all-courses
Authorization: Bearer <student_token>
```
**Response**
```json
{
  "message": "Courses fetched successfully",
  "data": [
    {
      "_id": "64f2b1c...",
      "title": "Artificial Intelligence",
      "code": "CS305",
      "department": "Computer Science",
      "fees": 45000
    }
  ]
}
```

#### 📌 Enroll to Course
```http
POST http://localhost:8080/student/enroll
Authorization: Bearer <student_token>
```
**Body**
```json
{
  "courseCode": "CS305"
}
```
**Response**
```json
{
  "message": "Student enrolled successfully",
  "result": {
    "acknowledged": true,
    "insertedId": "64f3d2a..."
  }
}
```

#### 📌 Get Enrolled Courses
```http
GET http://localhost:8080/student/enrolled-courses
Authorization: Bearer <student_token>
```
**Response**
```json
{
  "courses": [
    {
      "_id": "64f2b1c...",
      "title": "Artificial Intelligence",
      "code": "CS305",
      "department": "Computer Science"
    }
  ]
}
```

---

### 🛠 Admin Routes
#### 📌 Create Course
```http
POST http://localhost:8080/admin/create-course
Authorization: Bearer <admin_token>
```
**Body**
```json
{
  "title": "Artificial Intelligence",
  "department": "Computer Science",
  "code": "CS305",
  "description": "Explores machine learning, neural networks, and AI applications in modern systems.",
  "duration": "1 year",
  "fees": 45000
}
```
**Response**
```json
{
  "message": "Course created successfully",
  "id": "64f3a9c..."
}
```

#### 📌 Update Course
```http
PUT http://localhost:8080/admin/update-course/CS305
Authorization: Bearer <admin_token>
```
**Body**
```json
{
  "title": "updated title introduction to computer science"
}
```
**Response**
```json
{
  "message": "Course updated successfully",
  "updatedData": {
    "_id": "64f3a9c...",
    "title": "updated title introduction to computer science",
    "code": "CS305"
  }
}
```

#### 📌 Delete Course
```http
DELETE http://localhost:8080/admin/delete-course/CS305
Authorization: Bearer <admin_token>
```
**Response**
```json
{
  "message": "Course deleted successfully",
  "data": {
    "_id": "64f3a9c...",
    "title": "Artificial Intelligence",
    "code": "CS305"
  }
}
```

#### 📌 View All Students
```http
GET http://localhost:8080/admin/students
Authorization: Bearer <admin_token>
```
**Response**
```json
[
  {
    "_id": "64f28a5...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
]
```

#### 📌 Search Students
```http
GET http://localhost:8080/admin/search?name=rahul
Authorization: Bearer <admin_token>
```
**Response**
```json
[
  {
    "_id": "64f28a5...",
    "name": "Rahul Mehta",
    "email": "rahul.mehta@example.com"
  }
]
```

#### 📌 Get Students Course-wise
```http
GET http://localhost:8080/admin/get-student/CS305
Authorization: Bearer <admin_token>
```
**Response**
```json
{
  "course": "Artificial Intelligence",
  "students": [
    {
      "_id": "64f28a5...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

#### 📌 Course Analytics
```http
GET http://localhost:8080/admin/analytics
Authorization: Bearer <admin_token>
```
**Response**
```json
{
    "perCourse": [
        {
            "count": 1,
            "code": "CS305"
        }
    ],
    "totalRevenue": 45000
}
```
