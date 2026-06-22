export type CrudResource = "student" | "teacher" | "subjects" | "class";

export type ModalType =
  | "Students"
  | "Teacher"
  | "Subjects"
  | "Timetable"
  | "Class"
  | "ClassUpdate";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface StudentRecord {
  _id: string;
  id: number;
  name: string;
  fatherName: string;
  monthDate?: string;
  status?: "paid" | "unpaid";
  image?: string;
  phone: number;
  age: number;
  gender: string;
  className: string;
  admissionDATE?: string;
}

export interface TeacherRecord {
  _id: string;
  id: number;
  name: string;
  email: string;
  phone?: string;
  hireDate?: string;
  qualification?: string;
  experienceYears?: number;
  subjectSpecialization?: string;
  image?: string;
  salary: number;
  gender?: string;
}

export interface SubjectRecord {
  _id: string;
  id: string;
  name: string;
  teacherID: number;
  className: string;
}

export interface ClassRecord {
  _id: string;
  id: string;
  fees: string;
  noOfStudents?: number;
  noOfSubjects?: number;
}

export interface TimetableSubject {
  _id?: string;
  subjectID: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface TimetableRecord {
  _id: string;
  classID: string;
  subjectDetails: TimetableSubject[];
}

export type TableRecord = StudentRecord | TeacherRecord | SubjectRecord | ClassRecord;
