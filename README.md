# 📚 Personal Book Manager

A full-stack **Personal Book Manager** built as part of the **Thumbstack MERN Stack Developer Assignment**.

The application enables users to securely create and manage their own personal collection of books. Users can authenticate, maintain their reading list, search books, and organize them by reading status.

---

# 🌐 Live Demo

**Live URL**

https://your-vercel-url.vercel.app

---

# 📂 GitHub Repository

https://github.com/yourusername/personal-book-manager

---

# ✨ Features

## 🔐 Authentication

- User Signup
- User Login
- User Logout
- JWT Authentication
- HTTP-only Cookie Authentication
- Protected Routes

---

## 📚 Book Management

Each authenticated user can:

- Add a new book
- Edit an existing book
- Delete a book
- View only their own books

Each book contains:

- Title
- Author
- Tags
- Reading Status

### Reading Status

- 📖 Want to Read
- 📘 Reading
- ✅ Completed

---

## 📊 Dashboard

The dashboard provides:

- Total number of books
- Reading statistics
- Complete personal book collection
- Search books by **Title** or **Author**
- Filter books by **Reading Status**

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons
- Lucide React

## Backend

- Next.js API Routes
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📁 Project Structure

```
app/
│
├── (auth)
│   ├── login
│   └── signup
│
├── (protected)
│   ├── dashboard
│   └── books
│       ├── add
│       └── [id]
│           └── edit
│
├── api
│   ├── auth
│   └── books
│
components/
│
lib/
│
models/
│
services/
│
middleware.js / proxy.js
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/yourusername/personal-book-manager.git
```

## Navigate to the project

```bash
cd personal-book-manager
```

## Install dependencies

```bash
npm install
```

## Create Environment File

Create a file named:

```text
.env.local
```

Copy the contents from:

```text
.env.example
```

## Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

---

## Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add a new book |
| GET | `/api/books/:id` | Get a single book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

---

# 🎯 Assignment Requirements Covered

✔ User Authentication (Signup/Login/Logout)

✔ JWT Authentication

✔ Protected Routes

✔ Personal Book Collection

✔ Add / Edit / Delete Books

✔ Dashboard with Statistics

✔ Search by Title or Author

✔ Filter by Reading Status

✔ Responsive User Interface

✔ MongoDB Integration

✔ Deployment on Vercel

---

# 🚀 Deployment

The application is deployed using:

- **Frontend & Backend:** Vercel
- **Database:** MongoDB Atlas

---

# 🔮 Future Improvements

- Filter books by Tags
- Book Cover Uploads
- User Profile Page
- Reading Progress Tracker
- Pagination
- Dark Mode

---

# 👨‍💻 Author

**Satrunjay**

Submitted as part of the **Thumbstack MERN Stack Developer Assignment**.

---

## 📄 License

This project was created for the Thumbstack technical assignment and is intended for evaluation purposes.
