# Real-Time Expert Session Booking System

A full-stack booking platform where users can view experts, check available slots, and book sessions in real time.

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- Socket.io Client

Backend:
- Node.js
- Express.js
- MongoDB
- Socket.io

---

## Features

- Expert listing with search and filter
- Pagination support
- Expert detail page with available slots
- Real-time slot updates
- Session booking form with validation
- Prevent double booking
- View bookings by email
- Booking status tracking

---

## API Endpoints

```bash
GET /experts
GET /experts/:id
POST /bookings
PATCH /bookings/:id/status
GET /bookings?email=


---

Run Backend

cd backend
npm install
npm run dev


---

Run Frontend

cd frontend
npm install
npm run dev


---

Environment Variables

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173


---

Author

Purba Dey
