"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter"));
const teacherRouter_1 = __importDefault(require("./routes/teacherRouter"));
const timeTableRouter_1 = __importDefault(require("./routes/timeTableRouter"));
const subjectRouter_1 = __importDefault(require("./routes/subjectRouter"));
const classRouter_1 = __importDefault(require("./routes/classRouter"));
const dashBoardRouter_1 = __importDefault(require("./routes/dashBoardRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
// CORS - Hardcoded to your frontend port
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // ← Hardcoded to YOUR browser port!
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// This serves files like http://localhost:5000/images/filename.png
app.use(express_1.default.static('public'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use('/auth', authRouter_1.default);
app.use('/student', authMiddleware_1.requireAuth, studentRouter_1.default);
app.use('/teacher', authMiddleware_1.requireAuth, teacherRouter_1.default);
app.use('/timetable', authMiddleware_1.requireAuth, timeTableRouter_1.default);
app.use('/subjects', authMiddleware_1.requireAuth, subjectRouter_1.default);
app.use('/class', authMiddleware_1.requireAuth, classRouter_1.default);
app.use('/dashBoard', authMiddleware_1.requireAuth, dashBoardRouter_1.default);
exports.default = app;
