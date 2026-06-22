"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("mongoose");
const mongoose_sequence_1 = __importDefault(require("mongoose-sequence"));
const AutoIncrement = (0, mongoose_sequence_1.default)(mongoose_1.default);
const studentSchema = new mongoose_1.Schema({
    id: { type: Number, unique: true }, // this will be auto-incremented
    name: { type: String, required: true },
    monthDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    fatherName: { type: String, required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
    className: { type: String, required: true },
    //classId: { type: Schema.Types.ObjectId, ref: 'Class' },
    gender: { type: String, required: true },
    image: { type: String, required: false }, // stores the uploaded filename or URL
});
// Add auto-increment plugin
studentSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'student_id_counter' });
const Student = (0, mongoose_2.model)('Student', studentSchema);
exports.default = Student;
