"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.fetch = fetch;
exports.update = update;
exports.deleteClass = deleteClass;
const timeTable_1 = __importDefault(require("../models/timeTable"));
async function register(req, res) {
    const entries = req.body;
    try {
        for (const entry of entries) {
            const existing = await timeTable_1.default.findOne({ classID: entry.classID });
            if (!existing) {
                await timeTable_1.default.create({
                    classID: entry.classID,
                    subjectDetails: entry.subjectDetails,
                });
            }
            else {
                await timeTable_1.default.updateOne({ classID: entry.classID }, { $push: { subjectDetails: entry.subjectDetails } });
            }
        }
        res.status(201).json({ message: "Timetable registered successfully" });
    }
    catch (err) {
        console.error("Error registering timetable:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function fetch(req, res) {
    try {
        const timetables = await timeTable_1.default.find();
        res.status(200).json(timetables);
    }
    catch (err) {
        console.error("Error fetching timetables:", err);
        res.status(500).json({ error: "Failed to fetch timetables" });
    }
}
async function update(req, res) {
    try {
        const timetable = await timeTable_1.default.findById(req.params.id);
        if (!timetable) {
            res.status(404).json({ error: "Timetable not found" });
            return;
        }
        const { classID, subjectDetails } = req.body;
        if (classID !== timetable.classID) {
            const duplicateClass = await timeTable_1.default.findOne({ classID });
            if (duplicateClass) {
                res.status(400).json({ error: `Timetable for class ${classID} already exists` });
                return;
            }
        }
        timetable.set({
            classID,
            subjectDetails,
        });
        await timetable.save();
        res.status(200).json({ message: "Timetable updated successfully", timetable });
    }
    catch (err) {
        console.error("Error updating timetable:", err);
        res.status(500).json({ error: "Failed to update timetable" });
    }
}
async function deleteClass(req, res) {
    try {
        await timeTable_1.default.deleteOne({ classID: req.body.classID });
        const timetables = await timeTable_1.default.find();
        res.status(200).json(timetables);
    }
    catch (err) {
        console.error("Error deleting timetable by class:", err);
        res.status(500).json({ error: "Failed to fetch timetables" });
    }
}
