import { Request, Response } from "express";
import Student from "../models/studentSchema";
import ClassSchema from '../models/classesSchema'

// ✅ Updated Interface
export interface IStudent {
  id: number;              // previously studentId
  name: string;            // previously studentName
  fatherName: string;
  phone: number;           // previously phoneNumber
  age: number;
  className: string;
  gender: string;
  image:string;
  admissionDATE?: string;
}

export async function register(req: Request, res: Response): Promise<void> {
  console.log("req.body: ",req.body)
  const student: IStudent = JSON.parse(req.body.student); // ⬅️ FormData sends as string
  const image = req.file?.filename;

  try {
    const classExists = await ClassSchema.findOne({ id: student.className });

    if (!classExists) {
      res.status(400).json({ error: `Class ${student.className} does not exist `});
      return;
    }

    const insertedStudent = await Student.create({
      ...student,
      image, // ✅ save filename to DB
    });

    let classUpdate = await ClassSchema.findOneAndUpdate(
      { id: student.className },
      { $push: { students: insertedStudent._id } }
    );

    if (classUpdate) {
      classUpdate.noOfStudents += 1;
      await classUpdate.save();
    }

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// export async function fetch(req: Request, res: Response) {
//   try {
//     console.log("req reached for fetch");

//     // Simulate a 20-second delay
//     await new Promise((resolve) => setTimeout(resolve, 20000));

//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch students" });
//   }
// }

export async function fetch(req: Request, res: Response) {
  try {
    console.log("req reached for fetch")
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
}

export async function feeStatusRenew(req: Request, res: Response){
  try {
    await Student.updateMany({}, { status: 'unpaid' });
    res.status(200)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
}
export async function feesPaid(req: Request, res: Response) {
  try {
    const { id } = req.body;
    console.log("req reached for: ", id);

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const newStatus = student.status === 'paid' ? 'unpaid' : 'paid';

    await Student.findByIdAndUpdate(id, { status: newStatus });

    res.status(200).json({ message: `Status updated to ${newStatus}` });
  } catch (err) {
    console.error("Error toggling fee status:", err);
    res.status(500).json({ error: "Failed to update fee status" });
  }
}

// export async function postImage(req: Request, res: Response) {
//   try {
//     const student = JSON.parse(req.body.student); // 👈 this is critical
//     console.log("student: ", student);
//     console.log("req.file: ", req.file);

//     if (!req.file) {
//       return res.status(400).json({ error: "No image file uploaded" });
//     }

//     await Student.findOneAndUpdate(
//       { phone: student.phone },
//       { image: req.file.filename } // only saving filename, you can adjust
//     );

//     res.status(200).json({ message: "Image uploaded successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: `Upload failed` });
//   }
// }
