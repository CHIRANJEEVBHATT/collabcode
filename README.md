# 🚀 CollabCode

> A production-ready real-time collaborative JavaScript code editor built with React, TypeScript, Node.js, Socket.IO, MongoDB, and Monaco Editor.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)]()
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)]()
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socket.io)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)]()
[![License](https://img.shields.io/badge/License-ISC-blue)]()

---

# 📸 Project Preview

> **Replace the placeholders below with screenshots or GIFs of your application.**

## Login

<p align="center">
<img src="collabcode\client\public\login.png" width="900">
</p>

---

## Home

<p align="center">
<img src="collabcode\client\public\home.png" width="900">
</p>

---

## Collaborative Editor

<p align="center">
<img src="collabcode\client\public\editor.png" width="900">
</p>

---

## Output Panel

<p align="center">
<img src="collabcode\client\public\output.png" width="900">
</p>

---

# ✨ Overview

CollabCode is a full-stack collaborative JavaScript editor that enables multiple users to write and execute code together in real time.

It is designed to simulate the collaborative editing experience of platforms like Google Docs and Replit while demonstrating modern full-stack development practices including authentication, real-time communication, database persistence, and cloud-ready architecture.

---

# ✨ Features

## 👨‍💻 Collaboration

* Real-time collaborative editing
* Room-based collaboration
* Live online users
* Share room link
* Copy room ID
* Join existing rooms
* Create new rooms
* Automatic code synchronization
* Code synchronization for newly joined users

---

## 🎨 Editor

* Monaco Editor (VS Code editor)
* JavaScript syntax highlighting
* Dark theme
* Theme selector
* Font size selector
* Responsive layout
* Auto-save
* Download current code
* Copy output
* Clear output

---

## ⚙️ Code Execution

* JavaScript execution
* Output panel
* Ctrl + Enter shortcut
* Error handling
* Execution feedback

---

## 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Secure password hashing (bcrypt)
* Logout

---

## 💾 Persistence

* MongoDB database
* User management
* Room management
* Room history
* Saved editor state

---

# 🏗 Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* React Hook Form
* Zod
* Monaco Editor
* Socket.IO Client
* Zustand
* React Hot Toast

---

## Backend

* Node.js
* Express
* TypeScript
* Socket.IO
* MongoDB
* Mongoose
* JWT
* bcryptjs

---

## Tools

* Git
* GitHub
* npm

---

# 🏛 Architecture

```text
                        Browser
                           │
                 React + TypeScript
                           │
          ┌────────────────┴───────────────┐
          │                                │
     Monaco Editor                 Socket.IO Client
          │                                │
          └────────────────┬───────────────┘
                           │
                     Express Server
                           │
         ┌─────────────────┴─────────────────┐
         │                                   │
    Socket.IO                         REST API
         │                                   │
         └─────────────────┬─────────────────┘
                           │
                       MongoDB
```

---

# 📂 Project Structure

```text
collabcode/

├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── utils/
│   └── package.json
│
├── docs/
├── README.md
└── docker-compose.yml
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/CHIRANJEEVBHATT/collabcode.git

cd collabcode
```

---

## Install Dependencies

### Client

```bash
cd client

npm install
```

### Server

```bash
cd ../server

npm install
```

---

# ⚙ Environment Variables

Create `server/.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# ▶ Running Locally

### Start Backend

```bash
cd server

npm run dev
```

---

### Start Frontend

```bash
cd client

npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📡 API Overview

## Authentication

```
POST /auth/register

POST /auth/login

GET /auth/me
```

---

## Rooms

```
POST /rooms

GET /rooms/:roomId
```

---

## Room History

```
POST /room-history/:roomId

GET /room-history/:roomId
```

---

## Code Execution

```
POST /run
```

---

# 📋 Roadmap

## ✅ Completed

* Authentication
* JWT
* MongoDB
* Room Management
* Real-time Collaboration
* Monaco Editor
* Online Users
* Share Room
* Responsive Editor
* JavaScript Execution
* Output Panel

---

## 🚧 Planned

* Docker Containerization
* Docker Compose
* AWS Deployment
* Nginx Reverse Proxy
* HTTPS (Let's Encrypt)
* CI/CD Pipeline
* Redis Pub/Sub (Future)

---


# 💡 Why I Built This

I built CollabCode to explore real-time collaborative systems and strengthen my full-stack engineering skills. The project focuses on WebSocket communication, authentication, database persistence, and a modern code editing experience inspired by collaborative development tools.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 📄 License

Licensed under the ISC License.

---

# 👨‍💻 Author

**Chiranjeev Bhatt**

GitHub: https://github.com/CHIRANJEEVBHATT

---

⭐ If you found this project interesting, consider giving it a star.
