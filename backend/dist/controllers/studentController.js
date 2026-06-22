"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.fetch = fetch;
exports.feeStatusRenew = feeStatusRenew;
exports.feesPaid = feesPaid;
exports.update = update;
exports.remove = remove;
const studentSchema_1 = __importDefault(require("../models/studentSchema"));
const classesSchema_1 = __importDefault(require("../models/classesSchema"));
function parseStudentPayload(req) {
    if (typeof req.body.student === "string") {
        return JSON.parse(req.body.student);
    }
    return req.body;
}
async function syncStudentCount(classId) {
    const classDoc = await classesSchema_1.default.findOne({ id: classId });
    if (!classDoc) {
        return;
    }
    classDoc.noOfStudents = classDoc.students.length;
    await classDoc.save();
}
async function register(req, res) {
    const student = parseStudentPayload(req);
    const image = req.file?.filename;
    try {
        const classExists = await classesSchema_1.default.findOne({ id: student.className });
        if (!classExists) {
            res.status(400).json({ error: `Class ${student.className} does not exist` });
            return;
        }
        const insertedStudent = await studentSchema_1.default.create({
            ...student,
            image,
        });
        const classUpdate = await classesSchema_1.default.findOneAndUpdate({ id: student.className }, { $push: { students: insertedStudent._id } });
        if (classUpdate) {
            classUpdate.noOfStudents += 1;
            await classUpdate.save();
        }
        res.status(201).json({
            message: "Student registered successfully",
            student: insertedStudent,
        });
    }
    catch (err) {
        console.error("Error registering student:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function fetch(req, res) {
    try {
        const students = await studentSchema_1.default.find();
        res.status(200).json(students);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
}
async function feeStatusRenew(req, res) {
    try {
        await studentSchema_1.default.updateMany({}, { status: "unpaid" });
        res.status(200).json({ message: "Fee status reset successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update fee status" });
    }
}
async function feesPaid(req, res) {
    try {
        const { id } = req.body;
        const student = await studentSchema_1.default.findById(id);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        const newStatus = student.status === "paid" ? "unpaid" : "paid";
        await studentSchema_1.default.findByIdAndUpdate(id, { status: newStatus });
        res.status(200).json({ message: `Status updated to ${newStatus}` });
    }
    catch (err) {
        console.error("Error toggling fee status:", err);
        res.status(500).json({ error: "Failed to update fee status" });
    }
}
async function update(req, res) {
    try {
        const existingStudent = await studentSchema_1.default.findById(req.params.id);
        if (!existingStudent) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        const studentData = parseStudentPayload(req);
        const nextClassName = studentData.className ?? existingStudent.className;
        if (nextClassName !== existingStudent.className) {
            const classExists = await classesSchema_1.default.findOne({ id: nextClassName });
            if (!classExists) {
                res.status(400).json({ error: `Class ${nextClassName} does not exist` });
                return;
            }
            await classesSchema_1.default.updateOne({ id: existingStudent.className }, { $pull: { students: existingStudent._id } });
            await classesSchema_1.default.updateOne({ id: nextClassName }, { $addToSet: { students: existingStudent._id } });
            await Promise.all([
                syncStudentCount(existingStudent.className),
                syncStudentCount(nextClassName),
            ]);
        }
        existingStudent.set({
            ...studentData,
            className: nextClassName,
            image: req.file?.filename ?? existingStudent.image,
        });
        await existingStudent.save();
        res.status(200).json({
            message: "Student updated successfully",
            student: existingStudent,
        });
    }
    catch (err) {
        console.error("Error updating student:", err);
        res.status(500).json({ error: "Failed to update student" });
    }
}
async function remove(req, res) {
    try {
        const student = await studentSchema_1.default.findById(req.params.id);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        await classesSchema_1.default.updateOne({ id: student.className }, { $pull: { students: student._id } });
        await syncStudentCount(student.className);
        await student.deleteOne();
        res.status(200).json({ message: "Student deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting student:", err);
        res.status(500).json({ error: "Failed to delete student" });
    }
}
