# Auth User Service

Node.js + Express + MongoDB authentication API with JWT.

## Tech Stack

- Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Quick Start

```bash
npm install
npm run dev    # Port 5000
```

## Environment Setup

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-user-db
JWT_SECRET=yourStrongSecretKey@123
```

## API Endpoints

**Auth** - `POST /api/auth/{register|login|reset-password}`

- Register user, Login, Reset password

**User** (Protected) - `{GET|PUT|DELETE} /api/user/profile`

- Get, Update, Delete user profile

All protected routes require: `Authorization: Bearer <token>`

## Features

✅ User registration & authentication  
✅ JWT token protection  
✅ Password hashing with bcryptjs  
✅ User CRUD operations  
✅ CORS enabled

---

**Part of**: Assignment-Hub

## Database

MongoDB database: `auth-user-db`

User model includes: `name`, `email`, `password`, `bio`, `timestamps`

## Requirements

- Node.js v14+
- MongoDB running on localhost:27017
