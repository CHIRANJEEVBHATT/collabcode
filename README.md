# CollabCode

CollabCode is a modern real-time collaborative code editor designed for pair programming, interviews, coding sessions, and team-based development. It combines a polished React frontend with a Node.js backend to deliver instant code synchronization, room-based collaboration, authentication, and code execution in a seamless experience.

## Overview

CollabCode empowers users to:
- Create or join collaborative coding rooms instantly
- Edit code in real time with other participants
- Run JavaScript code from the editor
- Save room history and recover previous work
- Authenticate securely with JWT-based login
- Share room links for fast collaboration

## Key Features

- Real-time code synchronization using Socket.IO
- Secure authentication with JWT and bcrypt
- Room-based collaboration with unique room IDs
- Monaco-powered editor experience
- Live user presence in each room
- Room history persistence and autosave
- Responsive and modern UI built with React and Tailwind CSS
- Code execution support for JavaScript

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Socket.IO Client
- React Router
- Zustand

### Backend
- Node.js
- Express
- TypeScript
- Socket.IO
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## Architecture

The project is organized into two main parts:
- Client: React application for the user interface and editor experience
- Server: Express + Socket.IO backend for authentication, room management, persistence, and code execution

The application follows a modular structure with clear separation between:
- UI and routing
- Auth and session management
- Real-time collaboration
- Database persistence

## Prerequisites

Before running the project locally, make sure you have:
- Node.js 18+ installed
- npm or yarn installed
- MongoDB running locally or a reachable MongoDB Atlas instance

## Environment Configuration

Create a .env file inside the server directory with the following values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/collabcode
JWT_SECRET=your_super_secret_key
```

Replace the values with your own secure configuration.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/CHIRANJEEVBHATT/collabcode.git
cd collabcode
```

### 2. Install dependencies

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

## Running the Application

### Start the backend

```bash
cd server
npm run dev
```

The server will start on http://localhost:5000.

### Start the frontend

```bash
cd client
npm run dev
```

The client will be available at http://localhost:5173.

## Project Structure

```text
collabcode/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── store/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── sockets/
│   │   └── utils/
│   └── package.json
└── docs/
```

## API Highlights

The backend exposes endpoints for:
- Authentication
  - POST /auth/register
  - POST /auth/login
  - GET /auth/me
- Rooms
  - POST /rooms
  - GET /rooms/:roomId
- Room history
  - POST /room-history/:roomId
  - GET /room-history/:roomId
- Code execution
  - POST /run

## Development Notes

- The frontend uses Vite for fast development and optimized production builds.
- The backend uses TypeScript for maintainability and stronger code quality.
- Socket.IO is used for low-latency collaboration across connected clients.
- MongoDB stores usernames, hashed passwords, and room-related data.

## Contributing

Contributions are welcome. If you would like to improve CollabCode, please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a clear description

## License

This project is licensed under the ISC License.

## Contact

For questions or collaboration opportunities, please reach out through the project repository.
