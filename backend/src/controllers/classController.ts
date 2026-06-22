import { Request, Response } from "express";
import ClassSchema from "../models/classesSchema";
import StudentSchema from "../models/studentSchema";
import SubjectSchema from "../models/subjectSchema";
import Timetable from "../models/timeTable";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const savedClasses = await ClassSchema.insertMany(data, { ordered: false });

    res.status(201).json({
      message: "Classes registered successfully",
      data: savedClasses,
    });
  } catch (error) {
    console.error("Error registering class:", error);
    res.status(500).json({ message: "Failed to register class", error });
  }
};

export const fetch = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await ClassSchema.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Failed to fetch classes", error });
  }
};

export const promote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentClassId, promotingClassId } = req.body as {
      currentClassId?: string;
      promotingClassId?: string;
    };

    if (!currentClassId || !promotingClassId) {
      res.status(400).json({
        message: "Both currentClassId and promotingClassId are required",
      });
      return;
    }

    const currentClass = await ClassSchema.findOne({ id: currentClassId });
    const promotingClass = await ClassSchema.findOne({ id: promotingClassId });

    if (!currentClass && !promotingClass) {
      res.status(404).json({
        message: `Class with id '${currentClassId}' and '${promotingClassId}' does not exist`,
      });
      return;
    }

    if (!currentClass) {
      res.status(404).json({ message: `Class with id '${currentClassId}' does not exist` });
      return;
    }

    if (!promotingClass) {
      res.status(404).json({ message: `Class with id '${promotingClassId}' does not exist` });
      return;
    }

    const studentIds = [...currentClass.students];
    promotingClass.students.push(...studentIds);
    currentClass.students = [];

    promotingClass.noOfStudents = promotingClass.students.length;
    currentClass.noOfStudents = currentClass.students.length;

    await StudentSchema.updateMany(
      { _id: { $in: studentIds } },
      { $set: { className: promotingClass.id } }
    );

    await promotingClass.save();
    await currentClass.save();

    res.status(200).json({ message: "Students promoted successfully" });
  } catch (error) {
    console.error("Error promoting students:", error);
    res.status(500).json({ message: "Failed to promote students", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingClass = await ClassSchema.findById(req.params.id);

    if (!existingClass) {
      res.status(404).json({ message: "Class not found" });
      return;
    }

    const { id, fees } = req.body as { id?: string; fees?: string };
    const nextId = id?.trim() || existingClass.id;

    if (nextId !== existingClass.id) {
      const duplicateClass = await ClassSchema.findOne({ id: nextId });

      if (duplicateClass) {
        res.status(400).json({ message: `Class ${nextId} already exists` });
        return;
      }

      await Promise.all([
        StudentSchema.updateMany(
          { className: existingClass.id },
          { $set: { className: nextId } }
        ),
        SubjectSchema.updateMany(
          { className: existingClass.id },
          { $set: { className: nextId } }
        ),
        Timetable.updateMany(
          { classID: existingClass.id },
          { $set: { classID: nextId } }
        ),
      ]);
    }

    existingClass.set({
      id: nextId,
      fees: fees ?? existingClass.fees,
    });

    await existingClass.save();

    res.status(200).json({
      message: "Class updated successfully",
      classData: existingClass,
    });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Failed to update class", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const classDoc = await ClassSchema.findById(req.params.id);

    if (!classDoc) {
      res.status(404).json({ message: "Class not found" });
      return;
    }

    if (classDoc.students.length > 0) {
      res.status(400).json({ message: "Move or delete students before deleting this class" });
      return;
    }

    if (classDoc.subjects.length > 0) {
      res.status(400).json({ message: "Remove subjects before deleting this class" });
      return;
    }

    await Timetable.deleteMany({ classID: classDoc.id });
    await classDoc.deleteOne();

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Failed to delete class", error });
  }
};
