import ClassSchema from '../models/classesSchema';
import { Request,Response } from 'express';
import StudentSchema from "../models/studentSchema";

export const register = async (req:Request, res:Response) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const savedClasses = await ClassSchema.insertMany(data, { ordered: false });
console.log('Classes registered successfully')
    res.status(201).json({
      message: 'Classes registered successfully',
      data: savedClasses,
    });
  } catch (error) {
    console.error('Error registering class:', error);
    res.status(500).json({ message: 'Failed to register class', error });
  }
};

// controllers/classController.js
export const fetch = async (req:Request, res:Response) => {
  try {
    const classes = await ClassSchema.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Failed to fetch classes', error });
  }
};

export const promote = async (req: Request, res: Response) => {
  try {
    const {currentClassId,promotingClassId} = req.body;
    
    if (!currentClassId || !promotingClassId) {
      return res.status(400).json({ message: 'Both currentClassId and promotingClassId are required' });
    }

    // Check if both classes exist
    const currentClass = await ClassSchema.findOne({ id: currentClassId });
    const promotingClass = await ClassSchema.findOne({ id: promotingClassId });
    if (!promotingClass && !currentClass) {
      return res.status(404).json({ message: `Class with id  '${promotingClassId} and ${currentClassId}' does not exist` });
    }
    else if (!currentClass) {
      return res.status(404).json({ message: `Class with id  '${currentClassId}' does not exist` });
    }

    else if (!promotingClass) {
      return res.status(404).json({ message: `Class with id  '${promotingClassId}' does not exist` });
    }
    
    //console.log('currentClass: ',currentClass)

    //push into promoted class
      const studentIds = [...currentClass.students];
      promotingClass.students.push(...studentIds)

    //remove from current class
      currentClass.students = []
      promotingClass.noOfStudents = promotingClass.students.length
      currentClass.noOfStudents = currentClass.students.length

    //Updating studenst schema
      await StudentSchema.updateMany(
          { _id: { $in: studentIds } },
          { $set: { className: promotingClass.id } }
      );

    // Save both classes
      await promotingClass.save();
      await currentClass.save();
      console.log('Students promoted successfully')

    res.status(200).json({ message: 'Students promoted successfully' });
  } catch (error) {
    console.error('Error promoting students:', error);
    res.status(500).json({ message: 'Failed to promote students', error });
  }
};