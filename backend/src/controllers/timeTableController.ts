// controllers/timetableController.ts
import { Request, Response } from "express";
import Timetable from "../models/timeTable";
import { Document } from 'mongoose';

interface details{
  subjectID: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room?: string;
}
export interface ITimetableEntry {
  classID: string;
  subjectDetails:details[];
}

export async function register(req: Request, res: Response): Promise<void> {
  const entries: ITimetableEntry[] = req.body;
  let flag:boolean = false
  try {
    for (const entry of entries) {
      console.log('entry: ',entry)
        const existing = await Timetable.findOne({ classID: entry.classID });
        if (!existing) {
        //   // Create new timetable with one subject
          await Timetable.create({
            classID: entry.classID,
            subjectDetails: entry.subjectDetails, // Make sure `entry.subjectDetail` contains subjectID, dayOfWeek, etc.
           });
          //  const timetables = await Timetable.find();
          //  console.log('timetables',timetables)
          //  res.status(200).json(timetables);
        } else {
          // Add subject to existing timetable
          await Timetable.updateOne(
            { classID: entry.classID },
            { $push: { subjectDetails: entry.subjectDetails } }
          );
          //  const timetables = await Timetable.find();
          //  console.log('timetables',timetables)
          //  res.status(200).json(timetables);

        }
    }
      console.log("Timetable entries created successfully");
      res.status(201).json({ message: "Timetable registered successfully" });
  } catch (err) {
      console.error("Error registering timetable: ", err);
      res.status(500).json({ error: "Internal server error" });
  }
}
export async function fetch(req: Request, res: Response): Promise<void> {
  try {
    console.log("Fetching timetable entries...");
    const timetables = await Timetable.find();
    res.status(200).json(timetables);
  } catch (err) {
    console.error("Error fetching timetables: ", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
}

export async function deleteClass(req: Request, res: Response){
  try {
    console.log("Fetching timetable entries...");
    console.log('deleting class: ',req.body)
     await Timetable.deleteOne({classID:req.body.classID});
    const timetables = await Timetable.find();
    console.log('timetables',timetables)
    res.status(200).json(timetables);
  } catch (err) {
    console.error("Error fetching timetables: ", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
}