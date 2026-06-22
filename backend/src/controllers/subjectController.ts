import { Request, Response } from "express";
import Subjects from "../models/subjectSchema";
import Teacher from "../models/teacherSchema";
import ClassSchema from "../models/classesSchema";

export interface ISubject {
  id: string;
  name: string;
  teacherId: number;
  className: string;
}

async function syncSubjectCount(classId: string): Promise<void> {
  const classDoc = await ClassSchema.findOne({ id: classId });

  if (!classDoc) {
    return;
  }

  classDoc.noOfSubjects = classDoc.subjects.length;
  await classDoc.save();
}

export async function register(req: Request, res: Response): Promise<void> {
  const subjectsFromFrontend = req.body as ISubject[];

  try {
    for (const subject of subjectsFromFrontend) {
      const classExists = await ClassSchema.findOne({ id: subject.className });

      if (!classExists) {
        res.status(400).json({ error: `Class ${subject.className} does not exist` });
        return;
      }

      const teacherExists = await Teacher.findOne({ id: subject.teacherId });

      if (!teacherExists) {
        res.status(400).json({ error: `Teacher ${subject.teacherId} does not exist` });
        return;
      }

      const insertedSubject = await Subjects.create({
        id: subject.id,
        name: subject.name,
        teacherID: subject.teacherId,
        className: subject.className,
      });

      const classUpdate = await ClassSchema.findOneAndUpdate(
        { id: subject.className },
        { $push: { subjects: insertedSubject._id } }
      );

      if (classUpdate) {
        classUpdate.noOfSubjects += 1;
        await classUpdate.save();
      }
    }

    res.status(201).json({ message: "Subjects registered successfully" });
  } catch (err) {
    console.error("Error registering subjects:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetch(req: Request, res: Response): Promise<void> {
  try {
    const subjects = await Subjects.find();
    res.status(200).json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const subject = await Subjects.findById(req.params.id);

    if (!subject) {
      res.status(404).json({ error: "Subject not found" });
      return;
    }

    const payload = req.body as ISubject;
    const teacherExists = await Teacher.findOne({ id: payload.teacherId });

    if (!teacherExists) {
      res.status(400).json({ error: `Teacher ${payload.teacherId} does not exist` });
      return;
    }

    const classExists = await ClassSchema.findOne({ id: payload.className });

    if (!classExists) {
      res.status(400).json({ error: `Class ${payload.className} does not exist` });
      return;
    }

    const previousClassName = subject.className as string;

    subject.set({
      id: payload.id,
      name: payload.name,
      teacherID: payload.teacherId,
      className: payload.className,
    });
    await subject.save();

    if (previousClassName !== payload.className) {
      await ClassSchema.updateOne(
        { id: previousClassName },
        { $pull: { subjects: subject._id } }
      );
      await ClassSchema.updateOne(
        { id: payload.className },
        { $addToSet: { subjects: subject._id } }
      );
      await Promise.all([
        syncSubjectCount(previousClassName),
        syncSubjectCount(payload.className),
      ]);
    }

    res.status(200).json({ message: "Subject updated successfully", subject });
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ error: "Failed to update subject" });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const subject = await Subjects.findById(req.params.id);

    if (!subject) {
      res.status(404).json({ error: "Subject not found" });
      return;
    }

    await ClassSchema.updateOne(
      { id: subject.className },
      { $pull: { subjects: subject._id } }
    );
    await syncSubjectCount(subject.className as string);

    await subject.deleteOne();
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ error: "Failed to delete subject" });
  }
}
