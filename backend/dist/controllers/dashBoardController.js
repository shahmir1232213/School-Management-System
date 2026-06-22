"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countStudentsInAllClasses = countStudentsInAllClasses;
// Ensure this path is correct
const teacherSchema_1 = __importDefault(require("../models/teacherSchema"));
const classesSchema_1 = __importDefault(require("../models/classesSchema"));
const studentSchema_1 = __importDefault(require("../models/studentSchema"));
async function countStudentsInAllClasses(req, res) {
    try {
        // Step 1: Fetch all classes
        const noOfClasses = await classesSchema_1.default.countDocuments();
        const noOfTeachers = await teacherSchema_1.default.countDocuments();
        //let noOfClasses = classes.length;
        // Step 2: Prepare result per class and total
        let totalStudents = await studentSchema_1.default.countDocuments();
        // for (const classDoc of classes) {
        //   const count = classDoc.students.length;
        //   totalStudents += count;
        // }
        res.status(200).json({
            success: true,
            totalStudents,
            noOfClasses,
            noOfTeachers
        });
    }
    catch (err) {
        console.error('Error counting students:', err);
    }
}
;
