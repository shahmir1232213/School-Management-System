import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rows from './Rows';
import LoadingComponent from '../Loading';

export interface Student {
  studentId: number;
  studentName: string;
  fatherName: string;
  monthDate: Date;               // fee payment date
  status?: 'paid' | 'unpaid';  
  image?:string; 
  phoneNumber: number;
  age: number;
  gender: string;
}

export interface Teacher {
  name: string;
  email: string;
  phone?: string;
  hire_date?: Date;
  qualification?: string;
  experience_years?: number;
  subjectSpecialization?: string;
  image?:string; 
  salary: number;
}

export interface ClassFormData {
  id: string;
  fees: string;
  noOfStudents?: number;
  noOfSubjects?: number;
}

export interface Subjects {
  id: string;
  name: string;
  teacherId: number;
  className: string;
}

interface Props {
  headers: string[];
  fetch: string;
}

const Table: React.FC<Props> = ({ headers, fetch }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [classDetails, setClassDetails] = useState<ClassFormData[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoadingFlag(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/${fetch}/fetch`);
        setLoadingFlag(false);
        switch (fetch) {
          case 'student':
            setStudents(data);
            break;
          case 'teacher':
            setTeachers(data);
            //console.log('teacher data: ',data);
            break;
          case 'Class':
            setClassDetails(data);
            break;
          default:
            setSubjects(data);
            console.log('teacher data: ',data);
            break;
        }
      } catch (err) {
        console.log(`Error fetching Table`, err);
        setLoadingFlag(false);
      }
    }
    fetchData();
  }, [fetch]);

  const data = fetch === 'student' ? students :
               fetch === 'teacher' ? teachers :
               fetch === 'Class' ? classDetails : subjects;

  return (
    <div className="bg-white overflow-auto h-[73.8vh] mt-[26vh] w-full">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-white text-black font-semibold">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border px-4 py-2 text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Rows data={data} type={fetch} />
        </tbody>
      </table>
      {loadingFlag && <LoadingComponent />}
    </div>
  );
};

export default Table;
