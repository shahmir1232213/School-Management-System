import { Request, Response } from "express";
import Student from "../models/studentSchema";
import ClassSchema from "../models/classesSchema";

export interface IStudent {
  id: number;
  name: string;
  fatherName: string;
  phone: number;
  age: number;
  className: string;
  gender: string;
  image: string;
  admissionDATE?: string;
}

function parseStudentPayload(req: Request): Partial<IStudent> {
  if (typeof req.body.student === "string") {
    return JSON.parse(req.body.student) as Partial<IStudent>;
  }

  return req.body as Partial<IStudent>;
}

async function syncStudentCount(classId: string): Promise<void> {
  const classDoc = await ClassSchema.findOne({ id: classId });

  if (!classDoc) {
    return;
  }

  classDoc.noOfStudents = classDoc.students.length;
  await classDoc.save();
}

export async function register(req: Request, res: Response): Promise<void> {
  const student = parseStudentPayload(req) as IStudent;
  const image = req.file?.filename;

  try {
    const classExists = await ClassSchema.findOne({ id: student.className });

    if (!classExists) {
      res.status(400).json({ error: `Class ${student.className} does not exist` });
      return;
    }

    const insertedStudent = await Student.create({
      ...student,
      image,
    });

    const classUpdate = await ClassSchema.findOneAndUpdate(
      { id: student.className },
      { $push: { students: insertedStudent._id } }
    );

    if (classUpdate) {
      classUpdate.noOfStudents += 1;
      await classUpdate.save();
    }

    res.status(201).json({
      message: "Student registered successfully",
      student: insertedStudent,
    });
  } catch (err) {
    console.error("Error registering student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetch(req: Request, res: Response): Promise<void> {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
}

export async function feeStatusRenew(req: Request, res: Response): Promise<void> {
  try {
    await Student.updateMany({}, { status: "unpaid" });
    res.status(200).json({ message: "Fee status reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update fee status" });
  }
}

export async function feesPaid(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.body as { id: string };
    const student = await Student.findById(id);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const newStatus = student.status === "paid" ? "unpaid" : "paid";
    await Student.findByIdAndUpdate(id, { status: newStatus });

    res.status(200).json({ message: `Status updated to ${newStatus}` });
  } catch (err) {
    console.error("Error toggling fee status:", err);
    res.status(500).json({ error: "Failed to update fee status" });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const existingStudent = await Student.findById(req.params.id);

    if (!existingStudent) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    const studentData = parseStudentPayload(req);
    const nextClassName = studentData.className ?? existingStudent.className;

    if (nextClassName !== existingStudent.className) {
      const classExists = await ClassSchema.findOne({ id: nextClassName });

      if (!classExists) {
        res.status(400).json({ error: `Class ${nextClassName} does not exist` });
        return;
      }

      await ClassSchema.updateOne(
        { id: existingStudent.className },
        { $pull: { students: existingStudent._id } }
      );

      await ClassSchema.updateOne(
        { id: nextClassName },
        { $addToSet: { students: existingStudent._id } }
      );

      await Promise.all([
        syncStudentCount(existingStudent.className),
        syncStudentCount(nextClassName),
      ]);
    }

    existingStudent.set({
      ...studentData,
      className: nextClassName,
      image: req.file?.filename ?? existingStudent.image,
    });

    await existingStudent.save();
    res.status(200).json({
      message: "Student updated successfully",
      student: existingStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Failed to update student" });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    await ClassSchema.updateOne(
      { id: student.className },
      { $pull: { students: student._id } }
    );
    await syncStudentCount(student.className);

    await student.deleteOne();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Failed to delete student" });
  }
}
