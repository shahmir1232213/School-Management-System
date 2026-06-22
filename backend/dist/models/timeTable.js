"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const TimetableSchema = new mongoose.Schema({
    classID: String,
    subjectDetails: [
        {
            subjectID: String,
            dayOfWeek: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            startTime: {
                type: String, // Format: 'HH:MM'
                required: true
            },
            endTime: {
                type: String, // Format: 'HH:MM'
                required: true
            },
            room: {
                type: String,
                required: false
            }
        }
    ]
});
exports.default = mongoose.model('Timetable', TimetableSchema);
