# 🚀 Node.js User Management API

A production-ready backend API built using Node.js, Express, and MongoDB with authentication, role-based access control, and advanced features.

---

## 📌 Features

- 🔐 JWT Authentication (Signup/Login)
- 👤 Role-Based Access Control (Admin/User)
- 📦 RESTful CRUD APIs
- 📄 Pagination & Filtering
- 🖼️ File Upload (Profile Image using Multer)
- ✅ Input Validation
- ⚠️ Centralized Error Handling
- 🔒 API Security (Helmet, CORS, Environment Variables)
- ☁️ Deployed on Render

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- express-validator
- dotenv
- cors
- helmet

---
## 📁 Project Structure

project
│
├── config
│ └── db.js
│
├── controllers
│ ├── authController.js
│ └── userController.js
│
├── middleware
│ ├── authMiddleware.js
│ ├── roleMiddleware.js
│ ├── errorMiddleware.js
│
├── models
│ └── userModel.js
│
├── routes
│ ├── authRoutes.js
│ └── userRoutes.js
│
├── uploads/
├── .env
├── server.js
└── package.json



---

## 🔑 Authentication Flow

1. User registers (password hashed using bcrypt)
2. User logs in → JWT token generated
3. Token sent to client
4. Client sends token in Authorization header
5. Middleware verifies token → grants access

---

## 📡 API Endpoints

### 🔐 Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

---

### 👤 Users

- `GET /api/users` (Protected + Pagination + Filtering)
- `GET /api/users/profile` (Protected)
- `PUT /api/users/:id`
- `DELETE /api/users/:id` (Admin only)

---

### 🖼️ File Upload

- `POST /api/users/upload-profile`
  - Body: form-data → `image`

---

## 🔍 Filtering & Pagination Example

- `GET /api/users?page=1&limit=5&role=admin&name=poor`

---

## ⚙️ Environment Variables

Create a `.env` file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
