import { Request, Response } from 'express';
import teacherSchema from '../models/teacherSchema'; // Adjust path as needed

interface ITeacher {
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

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const teacher: ITeacher = JSON.parse(req.body.teacher);
    const image = req.file?.filename;

    const newTeacher = await teacherSchema.create({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone || undefined,
      hireDate: teacher.hireDate ? new Date(teacher.hireDate) : undefined,
      qualification: teacher.qualification || undefined,
      experienceYears: teacher.experienceYears,
      subjectSpecialization: teacher.subjectSpecialization || undefined,
      gender: teacher.gender || undefined,
      salary: teacher.salary,
      image, // store filename in DB
    });

    res.status(201).json({ message: 'Teacher registered successfully', teacher: newTeacher });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function fetch (req:Request,res:Response){
    try {
        const teachers = await teacherSchema.find(); // Fetches all students
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
}