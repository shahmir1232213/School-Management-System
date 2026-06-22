"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.fetch = fetch;
exports.update = update;
exports.remove = remove;
const teacherSchema_1 = __importDefault(require("../models/teacherSchema"));
const subjectSchema_1 = __importDefault(require("../models/subjectSchema"));
function parseTeacherPayload(req) {
    if (typeof req.body.teacher === "string") {
        return JSON.parse(req.body.teacher);
    }
    return req.body;
}
async function register(req, res) {
    try {
        const teacher = parseTeacherPayload(req);
        const image = req.file?.filename;
        const newTeacher = await teacherSchema_1.default.create({
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone || undefined,
            hireDate: teacher.hireDate ? new Date(teacher.hireDate) : undefined,
            qualification: teacher.qualification || undefined,
            experienceYears: teacher.experienceYears,
            subjectSpecialization: teacher.subjectSpecialization || undefined,
            gender: teacher.gender || undefined,
            salary: teacher.salary,
            image,
        });
        res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher });
    }
    catch (error) {
        console.error("Error registering teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function fetch(req, res) {
    try {
        const teachers = await teacherSchema_1.default.find();
        res.status(200).json(teachers);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
}
async function update(req, res) {
    try {
        const existingTeacher = await teacherSchema_1.default.findById(req.params.id);
        if (!existingTeacher) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        const teacher = parseTeacherPayload(req);
        existingTeacher.set({
            ...teacher,
            hireDate: teacher.hireDate ? new Date(teacher.hireDate) : existingTeacher.hireDate,
            image: req.file?.filename ?? existingTeacher.image,
        });
        await existingTeacher.save();
        res.status(200).json({
            message: "Teacher updated successfully",
            teacher: existingTeacher,
        });
    }
    catch (error) {
        console.error("Error updating teacher:", error);
        res.status(500).json({ error: "Failed to update teacher" });
    }
}
async function remove(req, res) {
    try {
        const teacher = await teacherSchema_1.default.findById(req.params.id);
        if (!teacher) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        const linkedSubject = await subjectSchema_1.default.findOne({ teacherID: teacher.id });
        if (linkedSubject) {
            res.status(400).json({
                error: "This teacher is assigned to a subject. Update or remove the subject first.",
            });
            return;
        }
        await teacher.deleteOne();
        res.status(200).json({ message: "Teacher deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({ error: "Failed to delete teacher" });
    }
}
