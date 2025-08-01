import mongoose, { mongo } from "mongoose";
import Teacher from "./teacherSchema";

const subjectSchema = new mongoose.Schema({
    id:String,
    name:String,
    teacherID:Number,
    className:String,
    teacherDetails:{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
})

const Subjects = mongoose.model('subjects',subjectSchema)
export default Subjects;