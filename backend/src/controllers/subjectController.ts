import { Request, Response } from "express";
import Subjects from "../models/subjectSchema";
import Teacher from "../models/teacherSchema";
import ClassSchema from '../models/classesSchema'

export interface ISubject {
  id: string;
  name: string;
  teacherId: number;
  className: string; 
}

export async function register(req: Request, res: Response): Promise<void> {
  const subjectsFromFrontend: ISubject[] = req.body;
  console.log("subjects:",subjectsFromFrontend)
  try {
    for (const subject of subjectsFromFrontend) {
       const classExists = await ClassSchema.findOne({ id: subject.className });

      if (!classExists) {
        res.status(400).json({ error: `Class ${subject.className} does not exist` });
        return;
      }
      let insertedSubject = await Subjects.create({
        id: subject.id,
        name: subject.name,
        teacherID: subject.teacherId,
        className: subject.className
      });
        let classUpdate = await ClassSchema.findOneAndUpdate(
          { id: subject.className }, // or { className: student.className } if you store by name
          { $push: { subjects : insertedSubject._id } }
        );
        classUpdate.noOfSubjects = classUpdate.noOfSubjects + 1;
        await classUpdate.save()
        console.log("classUpdate: ",classUpdate)
    }
    

    console.log("Subjects created successfully");
    res.status(201).json({ message: "Subjects registered successfully" });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetch(req: Request, res: Response) {
  try {
    console.log("Request reached for fetching subjects");
    const subjects = await Subjects.find().populate('teacherDetails');
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects: ", err);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
}