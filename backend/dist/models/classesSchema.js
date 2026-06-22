"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema } = mongoose;
const classSchema = new Schema({
    id: {
        type: String
    },
    fees: String,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    noOfStudents: {
        type: Number,
        default: 0
    },
    noOfSubjects: {
        type: Number,
        default: 0
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'subjects'
        }
    ]
});
const Class = mongoose.model('class', classSchema);
exports.default = Class;
