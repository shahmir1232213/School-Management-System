import express from "express";
import cors from 'cors';
import path from 'path';

import studentRouter from './routes/studentRouter'
import teacherRouter from './routes/teacherRouter'
import timeTableRouter from './routes/timeTableRouter'
import subjectRouter from './routes/subjectRouter'
import classRouter from "./routes/classRouter";
import dashBoardRouter from './routes/dashBoardRouter'
import authRouter from "./routes/authRouter";
import { requireAuth } from "./middleware/authMiddleware";

const app = express()

// CORS - Hardcoded to your frontend port
app.use(cors({
    origin: 'http://localhost:3001',  // ← Hardcoded to YOUR browser port!
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// This serves files like http://localhost:5000/images/filename.png
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/auth', authRouter)
app.use('/student', requireAuth, studentRouter)
app.use('/teacher', requireAuth, teacherRouter)
app.use('/timetable', requireAuth, timeTableRouter)
app.use('/subjects', requireAuth, subjectRouter)
app.use('/class', requireAuth, classRouter)
app.use('/dashBoard', requireAuth, dashBoardRouter)

export default app