# MERN Task Manager — Frontend-focused Task Management App

**Live demo:** https://mern-task-app-ruby.vercel.app/signin   
**Backend API:** https://mern-task-app-m5vd.onrender.com/api

---

## Project Overview
Full-stack Task Management App (MERN). Focus on a polished React frontend (MUI). Users can:
- Sign up / Sign in (JWT)   
- Add / Edit tasks (title, description, status, created date)
- Admins can delete tasks; normal users cannot
- Dashboard shows paginated tasks

---

## Repo structure
/frontend # React + Vite + MUI
/backend # Node.js + Express + Mongoose

## How to run locally (quick)
### Backend
cd backend
npm install
# copy .env.example -> .env and fill values:
# MONGO_URI (mongodb+srv://USER:ENCODED_PASS@cluster.../tasksdb?...), JWT_SECRET, PORT=5000
npm run dev

### Backend
cd frontend
npm install
# create frontend/.env:
# VITE_API_URL=http://localhost:5000/api
npm run dev
