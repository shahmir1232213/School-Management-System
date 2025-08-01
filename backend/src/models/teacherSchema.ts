import mongoose, { Schema } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const teacherSchema = new Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  hireDate: Date,
  salary:Number,
  qualification: String,
  experienceYears: Number,
  subjectSpecialization: String,
  image:String,
  gender: String,
});

// ✅ Use unique ID for the counter
teacherSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'teacher_id_counter'
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
