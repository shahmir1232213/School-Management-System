"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    teacherID: Number,
    className: String,
    teacherDetails: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Teacher' }
});
const Subjects = mongoose_1.default.model('subjects', subjectSchema);
exports.default = Subjects;
