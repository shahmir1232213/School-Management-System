import { Request,Response } from 'express';
// Ensure this path is correct
import TeacherSchema from '../models/teacherSchema'
import Class from '../models/classesSchema'
import StudentSchema from '../models/studentSchema'
export async function countStudentsInAllClasses(req:Request, res:Response) {
  try {
    // Step 1: Fetch all classes
    const noOfClasses = await Class.countDocuments();
    const noOfTeachers = await TeacherSchema.countDocuments();
    //let noOfClasses = classes.length;
    // Step 2: Prepare result per class and total
    let totalStudents = await StudentSchema.countDocuments();

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

  } catch (err) {
    console.error('Error counting students:', err)
  }
};


