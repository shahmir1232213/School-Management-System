import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const studentSchema = new Schema({
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

const Student = model('Student', studentSchema);
export default Student;
