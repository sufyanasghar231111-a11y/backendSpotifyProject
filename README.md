# 🎧 MERN Music Streaming Platform

A full-stack music streaming application built using the MERN Stack. Users can discover music, stream songs, manage playlists, and enjoy a modern music listening experience with optimized search and responsive design.

## 🚀 Current Features

### 👤 User Authentication

* Secure user registration and login
* JWT-based authentication
* Protected routes for authenticated users
* Persistent login sessions

### 🎵 Music Streaming

* Browse all available songs
* Stream music with a custom audio player
* Play, pause, next, and previous controls
* Global music controller using React Context
* Real-time track switching

### 🔍 Smart Search System

* Search songs instantly
* Debounced search for better performance
* Backend text search optimization
* Separate search result handling
* Loading states and skeleton UI

### 📂 Playlist Management

* Create personal playlists
* Add songs to playlists
* Remove songs from playlists
* View and manage all created playlists

### ❤️ User Experience

* Responsive design for desktop and mobile devices
* Modern and clean user interface
* Skeleton loaders during data fetching
* Optimized state management using Context API
* Smooth navigation with React Router

### ⚡ Performance Optimizations

* Search request debouncing
* Context separation to minimize re-renders
* Efficient API handling
* Optimized MongoDB queries

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Context API
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 📁 Project Structure

```bash
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
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── utils/
│
├── uploads/
├── .env
├── package.json
└── README.md
```

## 🔄 Application Architecture

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
        ├── Authentication (JWT)
        ├── Controllers
        ├── Business Logic
        │
        ▼
┌───────────────┐
│   MongoDB     │
└───────────────┘
```

## 🔄 Upcoming Features

### 🎤 Artist Dashboard (In Progress)

* Upload songs
* Create albums
* Manage uploaded music
* Music analytics

### 🛡️ Admin Dashboard (In Progress)

* User management
* Artist management
* Content moderation
* Platform monitoring

## 📚 What I Learned

This project helped me gain practical experience in:

* Building RESTful APIs
* Authentication and authorization
* MongoDB database design
* React Context architecture
* Search optimization techniques
* File upload handling
* Full-stack application development
* Production-level project structure

## 👨‍💻 Developer

Built by Sufyan Asghar as a full-stack MERN project to practice scalable backend architecture and modern frontend development.

* Production-level project structure

## 👨‍💻 Developer

Built by Sufyan Asghar as a full-stack MERN project to practice scalable backend architecture and modern frontend development.
