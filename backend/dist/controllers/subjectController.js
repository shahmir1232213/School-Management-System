"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.fetch = fetch;
exports.update = update;
exports.remove = remove;
const subjectSchema_1 = __importDefault(require("../models/subjectSchema"));
const teacherSchema_1 = __importDefault(require("../models/teacherSchema"));
const classesSchema_1 = __importDefault(require("../models/classesSchema"));
async function syncSubjectCount(classId) {
    const classDoc = await classesSchema_1.default.findOne({ id: classId });
    if (!classDoc) {
        return;
    }
    classDoc.noOfSubjects = classDoc.subjects.length;
    await classDoc.save();
}
async function register(req, res) {
    const subjectsFromFrontend = req.body;
    try {
        for (const subject of subjectsFromFrontend) {
            const classExists = await classesSchema_1.default.findOne({ id: subject.className });
            if (!classExists) {
                res.status(400).json({ error: `Class ${subject.className} does not exist` });
                return;
            }
            const teacherExists = await teacherSchema_1.default.findOne({ id: subject.teacherId });
            if (!teacherExists) {
                res.status(400).json({ error: `Teacher ${subject.teacherId} does not exist` });
                return;
            }
            const insertedSubject = await subjectSchema_1.default.create({
                id: subject.id,
                name: subject.name,
                teacherID: subject.teacherId,
                className: subject.className,
            });
            const classUpdate = await classesSchema_1.default.findOneAndUpdate({ id: subject.className }, { $push: { subjects: insertedSubject._id } });
            if (classUpdate) {
                classUpdate.noOfSubjects += 1;
                await classUpdate.save();
            }
        }
        res.status(201).json({ message: "Subjects registered successfully" });
    }
    catch (err) {
        console.error("Error registering subjects:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function fetch(req, res) {
    try {
        const subjects = await subjectSchema_1.default.find();
        res.status(200).json(subjects);
    }
    catch (err) {
        console.error("Error fetching subjects:", err);
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
}
async function update(req, res) {
    try {
        const subject = await subjectSchema_1.default.findById(req.params.id);
        if (!subject) {
            res.status(404).json({ error: "Subject not found" });
            return;
        }
        const payload = req.body;
        const teacherExists = await teacherSchema_1.default.findOne({ id: payload.teacherId });
        if (!teacherExists) {
            res.status(400).json({ error: `Teacher ${payload.teacherId} does not exist` });
            return;
        }
        const classExists = await classesSchema_1.default.findOne({ id: payload.className });
        if (!classExists) {
            res.status(400).json({ error: `Class ${payload.className} does not exist` });
            return;
        }
        const previousClassName = subject.className;
        subject.set({
            id: payload.id,
            name: payload.name,
            teacherID: payload.teacherId,
            className: payload.className,
        });
        await subject.save();
        if (previousClassName !== payload.className) {
            await classesSchema_1.default.updateOne({ id: previousClassName }, { $pull: { subjects: subject._id } });
            await classesSchema_1.default.updateOne({ id: payload.className }, { $addToSet: { subjects: subject._id } });
            await Promise.all([
                syncSubjectCount(previousClassName),
                syncSubjectCount(payload.className),
            ]);
        }
        res.status(200).json({ message: "Subject updated successfully", subject });
    }
    catch (err) {
        console.error("Error updating subject:", err);
        res.status(500).json({ error: "Failed to update subject" });
    }
}
async function remove(req, res) {
    try {
        const subject = await subjectSchema_1.default.findById(req.params.id);
        if (!subject) {
            res.status(404).json({ error: "Subject not found" });
            return;
        }
        await classesSchema_1.default.updateOne({ id: subject.className }, { $pull: { subjects: subject._id } });
        await syncSubjectCount(subject.className);
        await subject.deleteOne();
        res.status(200).json({ message: "Subject deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting subject:", err);
        res.status(500).json({ error: "Failed to delete subject" });
    }
}
