import { Request, Response } from "express";
import Timetable from "../models/timeTable";

interface SubjectDetails {
  subjectID: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface ITimetableEntry {
  classID: string;
  subjectDetails: SubjectDetails[];
}

export async function register(req: Request, res: Response): Promise<void> {
  const entries = req.body as ITimetableEntry[];

  try {
    for (const entry of entries) {
      const existing = await Timetable.findOne({ classID: entry.classID });

      if (!existing) {
        await Timetable.create({
          classID: entry.classID,
          subjectDetails: entry.subjectDetails,
        });
      } else {
        await Timetable.updateOne(
          { classID: entry.classID },
          { $push: { subjectDetails: entry.subjectDetails } }
        );
      }
    }

    res.status(201).json({ message: "Timetable registered successfully" });
  } catch (err) {
    console.error("Error registering timetable:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetch(req: Request, res: Response): Promise<void> {
  try {
    const timetables = await Timetable.find();
    res.status(200).json(timetables);
  } catch (err) {
    console.error("Error fetching timetables:", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const timetable = await Timetable.findById(req.params.id);

    if (!timetable) {
      res.status(404).json({ error: "Timetable not found" });
      return;
    }

    const { classID, subjectDetails } = req.body as ITimetableEntry;

    if (classID !== timetable.classID) {
      const duplicateClass = await Timetable.findOne({ classID });

      if (duplicateClass) {
        res.status(400).json({ error: `Timetable for class ${classID} already exists` });
        return;
      }
    }

    timetable.set({
      classID,
      subjectDetails,
    });
    await timetable.save();

    res.status(200).json({ message: "Timetable updated successfully", timetable });
  } catch (err) {
    console.error("Error updating timetable:", err);
    res.status(500).json({ error: "Failed to update timetable" });
  }
}

export async function deleteClass(req: Request, res: Response): Promise<void> {
  try {
    await Timetable.deleteOne({ classID: req.body.classID as string });
    const timetables = await Timetable.find();
    res.status(200).json(timetables);
  } catch (err) {
    console.error("Error deleting timetable by class:", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
}
