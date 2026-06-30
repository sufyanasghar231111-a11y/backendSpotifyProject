# 🎧 MERN Music Streaming Platform

A full-stack music streaming application built using the **MERN Stack**. Users can discover music, stream songs, manage playlists, and enjoy a modern music listening experience with optimized search, secure authentication, and a responsive user interface.

---

# 🚀 Current Features

## 👤 Advanced User Authentication

* Secure user registration and login
* JWT-based authentication
* **Access Token & Refresh Token authentication**
* **Refresh Token Rotation** for enhanced security
* **Session-based authentication**
* Multiple device login support
* **Logout from current device**
* **Logout from all devices**
* Revoked session validation
* Protected routes with authentication middleware
* Persistent login sessions
* HTTP-only secure cookies for refresh tokens
* Role-based authorization support

---

## 🎵 Music Streaming

* Browse all available songs
* Stream music with a custom audio player
* Play, pause, next, and previous controls
* Global music controller using React Context
* Real-time track switching

---

## 🔍 Smart Search System

* Instant song search
* Debounced search requests
* Backend text search optimization
* Dedicated search result handling
* Loading states and skeleton UI

---

## 📂 Playlist Management

* Create personal playlists
* Add songs to playlists
* Remove songs from playlists
* View and manage all created playlists

---

## ❤️ User Experience

* Responsive design for desktop and mobile
* Modern and clean UI
* Skeleton loaders during data fetching
* Optimized state management using Context API
* Smooth navigation with React Router

---

## ⚡ Performance Optimizations

* Debounced search requests
* Context separation to minimize re-renders
* Efficient API handling
* Optimized MongoDB queries
* Session-based authentication for scalable security

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Context API
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Access & Refresh Token Rotation
* Session Management
* HTTP-only Cookies

---

# 📁 Project Structure

```text
music-streaming-platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── public/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── config/
│
├── uploads/
├── .env
├── package.json
└── README.md
```

---

# 🔐 Authentication Flow

```text
User Login
      │
      ▼
Verify Credentials
      │
      ▼
Create Session
      │
      ▼
Generate Access Token (10 min)
Generate Refresh Token
      │
      ▼
Store Hashed Refresh Token + Session
      │
      ▼
Access Protected Routes
      │
      ▼
Access Token Expires
      │
      ▼
Refresh Token Rotation
      │
      ▼
New Access Token
New Refresh Token
      │
      ▼
Old Refresh Token Revoked
```

---

# 🔄 Application Architecture

```text
┌───────────────┐
│     User      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ React Frontend│
└───────┬───────┘
        │ Axios
        ▼
┌───────────────┐
│ Express API   │
└───────┬───────┘
        │
        ├── JWT Authentication
        ├── Access Token Validation
        ├── Refresh Token Rotation
        ├── Session Management
        ├── Controllers
        ├── Business Logic
        │
        ▼
┌───────────────┐
│   MongoDB     │
└───────────────┘
```

---

# 🔄 Upcoming Features

## 🎤 Artist Dashboard

* Upload songs
* Create albums
* Manage uploaded music
* Music analytics

## 🛡️ Admin Dashboard

* User management
* Artist management
* Content moderation
* Platform monitoring

---

# 📚 What I Learned

This project helped me gain practical experience in:

* Building scalable RESTful APIs
* JWT authentication and authorization
* Access & Refresh Token implementation
* Refresh Token Rotation
* Session-based authentication
* Secure logout from all devices
* MongoDB database design
* React Context architecture
* Search optimization techniques
* File upload handling
* Secure cookie management
* Production-level backend architecture
* Full-stack application development

---

# 👨‍💻 Developer

Built by **Sufyan Asghar** as a full-stack MERN project to practice scalable backend architecture, secure authentication, and modern frontend development.
