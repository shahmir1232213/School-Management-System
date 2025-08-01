import React, { useEffect, useState } from 'react';
import TeacherForms from './TeacherForms';
import StudentForms from './StudentForms';
import SubjectForms from './SubjectForms';
import TimetableForm from './TimetableForm';
import ClassForm from './ClassForm'
import ClassFormUpdate from './ClassFromUpdate';
import CreateProfileFooter from './CreateProfileFooter';
import axios from 'axios';

interface Props {
  onClose: () => void;
  type: 'Teacher' | 'Students' | 'Subjects' | 'Timetable' | 'Class';  
}


const CreateProfile:React.FC<Props> = ({ onClose,type}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative bg-white p-[1.5rem] rounded-xl shadow-lg z-60 w-[60rem] h-[40rem] ml-[10rem] overflow-y-auto"> 
        <h1 className="text-2xl font-bold mb-5 ml-4">Add {type}</h1>
    {
      type === 'Teacher' ? (
        <TeacherForms onClose={onClose} />
      ): type === 'Subjects' ? (
        <SubjectForms onClose={onClose} />
      ): type === 'Students' ? (
        <StudentForms onClose={onClose}/>
      ): type === 'Timetable' ? (
        <TimetableForm onClose={onClose} />
      ): type === 'Class' ?(
        <ClassForm onClose={onClose}/>
      ):<ClassFormUpdate onClose={onClose}/>
    }
        <CreateProfileFooter onClose={onClose}/>
      </div>
    </div>
  );
};

export default CreateProfile;
