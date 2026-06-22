import { Request, Response } from "express";
import Teacher from "../models/teacherSchema";
import Subjects from "../models/subjectSchema";

interface ITeacher {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  hireDate?: Date | string;
  qualification?: string;
  experienceYears: number;
  subjectSpecialization?: string;
  gender?: string;
  salary: number;
  image?: string;
}

function parseTeacherPayload(req: Request): Partial<ITeacher> {
  if (typeof req.body.teacher === "string") {
    return JSON.parse(req.body.teacher) as Partial<ITeacher>;
  }

  return req.body as Partial<ITeacher>;
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const teacher = parseTeacherPayload(req) as ITeacher;
    const image = req.file?.filename;

    const newTeacher = await Teacher.create({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone || undefined,
      hireDate: teacher.hireDate ? new Date(teacher.hireDate) : undefined,
      qualification: teacher.qualification || undefined,
      experienceYears: teacher.experienceYears,
      subjectSpecialization: teacher.subjectSpecialization || undefined,
      gender: teacher.gender || undefined,
      salary: teacher.salary,
      image,
    });

    res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher });
  } catch (error) {
    console.error("Error registering teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetch(req: Request, res: Response): Promise<void> {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const existingTeacher = await Teacher.findById(req.params.id);

    if (!existingTeacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    const teacher = parseTeacherPayload(req);

    existingTeacher.set({
      ...teacher,
      hireDate: teacher.hireDate ? new Date(teacher.hireDate) : existingTeacher.hireDate,
      image: req.file?.filename ?? existingTeacher.image,
    });

    await existingTeacher.save();
    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: existingTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ error: "Failed to update teacher" });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    const linkedSubject = await Subjects.findOne({ teacherID: teacher.id });

    if (linkedSubject) {
      res.status(400).json({
        error: "This teacher is assigned to a subject. Update or remove the subject first.",
      });
      return;
    }

    await teacher.deleteOne();
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
}
