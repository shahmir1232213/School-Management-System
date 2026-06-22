"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.promote = exports.fetch = exports.register = void 0;
const classesSchema_1 = __importDefault(require("../models/classesSchema"));
const studentSchema_1 = __importDefault(require("../models/studentSchema"));
const subjectSchema_1 = __importDefault(require("../models/subjectSchema"));
const timeTable_1 = __importDefault(require("../models/timeTable"));
const register = async (req, res) => {
    try {
        const data = Array.isArray(req.body) ? req.body : [req.body];
        const savedClasses = await classesSchema_1.default.insertMany(data, { ordered: false });
        res.status(201).json({
            message: "Classes registered successfully",
            data: savedClasses,
        });
    }
    catch (error) {
        console.error("Error registering class:", error);
        res.status(500).json({ message: "Failed to register class", error });
    }
};
exports.register = register;
const fetch = async (req, res) => {
    try {
        const classes = await classesSchema_1.default.find();
        res.status(200).json(classes);
    }
    catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: "Failed to fetch classes", error });
    }
};
exports.fetch = fetch;
const promote = async (req, res) => {
    try {
        const { currentClassId, promotingClassId } = req.body;
        if (!currentClassId || !promotingClassId) {
            res.status(400).json({
                message: "Both currentClassId and promotingClassId are required",
            });
            return;
        }
        const currentClass = await classesSchema_1.default.findOne({ id: currentClassId });
        const promotingClass = await classesSchema_1.default.findOne({ id: promotingClassId });
        if (!currentClass && !promotingClass) {
            res.status(404).json({
                message: `Class with id '${currentClassId}' and '${promotingClassId}' does not exist`,
            });
            return;
        }
        if (!currentClass) {
            res.status(404).json({ message: `Class with id '${currentClassId}' does not exist` });
            return;
        }
        if (!promotingClass) {
            res.status(404).json({ message: `Class with id '${promotingClassId}' does not exist` });
            return;
        }
        const studentIds = [...currentClass.students];
        promotingClass.students.push(...studentIds);
        currentClass.students = [];
        promotingClass.noOfStudents = promotingClass.students.length;
        currentClass.noOfStudents = currentClass.students.length;
        await studentSchema_1.default.updateMany({ _id: { $in: studentIds } }, { $set: { className: promotingClass.id } });
        await promotingClass.save();
        await currentClass.save();
        res.status(200).json({ message: "Students promoted successfully" });
    }
    catch (error) {
        console.error("Error promoting students:", error);
        res.status(500).json({ message: "Failed to promote students", error });
    }
};
exports.promote = promote;
const update = async (req, res) => {
    try {
        const existingClass = await classesSchema_1.default.findById(req.params.id);
        if (!existingClass) {
            res.status(404).json({ message: "Class not found" });
            return;
        }
        const { id, fees } = req.body;
        const nextId = id?.trim() || existingClass.id;
        if (nextId !== existingClass.id) {
            const duplicateClass = await classesSchema_1.default.findOne({ id: nextId });
            if (duplicateClass) {
                res.status(400).json({ message: `Class ${nextId} already exists` });
                return;
            }
            await Promise.all([
                studentSchema_1.default.updateMany({ className: existingClass.id }, { $set: { className: nextId } }),
                subjectSchema_1.default.updateMany({ className: existingClass.id }, { $set: { className: nextId } }),
                timeTable_1.default.updateMany({ classID: existingClass.id }, { $set: { classID: nextId } }),
            ]);
        }
        existingClass.set({
            id: nextId,
            fees: fees ?? existingClass.fees,
        });
        await existingClass.save();
        res.status(200).json({
            message: "Class updated successfully",
            classData: existingClass,
        });
    }
    catch (error) {
        console.error("Error updating class:", error);
        res.status(500).json({ message: "Failed to update class", error });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const classDoc = await classesSchema_1.default.findById(req.params.id);
        if (!classDoc) {
            res.status(404).json({ message: "Class not found" });
            return;
        }
        if (classDoc.students.length > 0) {
            res.status(400).json({ message: "Move or delete students before deleting this class" });
            return;
        }
        if (classDoc.subjects.length > 0) {
            res.status(400).json({ message: "Remove subjects before deleting this class" });
            return;
        }
        await timeTable_1.default.deleteMany({ classID: classDoc.id });
        await classDoc.deleteOne();
        res.status(200).json({ message: "Class deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting class:", error);
        res.status(500).json({ message: "Failed to delete class", error });
    }
};
exports.remove = remove;
