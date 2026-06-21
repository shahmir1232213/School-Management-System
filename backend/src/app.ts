import express  from "express";
import cors from 'cors';
import path from 'path';

import studentRouter from './routes/studentRouter'
import teacherRouter from './routes/teacherRouter'
import timeTableRouter from './routes/timeTableRouter'
import subjectRouter from './routes/subjectRouter'
import classRouter from "./routes/classRouter";
import dashBoardRouter from './routes/dashBoardRouter'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// This serves files like http://localhost:4000/images/filename.png
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use('/student',studentRouter)
app.use('/teacher',teacherRouter)
app.use('/timetable',timeTableRouter)
app.use('/subjects',subjectRouter)
app.use('/class',classRouter)
app.use('/dashBoard',dashBoardRouter)

export default app