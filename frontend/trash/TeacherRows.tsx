import React from 'react';

interface Teacher {
  name: string;
  email: string;
  phone?: string;
  hire_date?: Date;
  qualification?: string;
  experience_years?: number;
  subject_specialization?: string;
  status?: 'active' | 'inactive' | 'on_leave';
  imageUrl?: string; // Optional: add if you're displaying an image like in StudentRows
}

interface Props {
  teachers: Teacher[];
}

const TeacherRows: React.FC<Props> = ({ teachers }) => {
  return (
    <>
      {teachers?.map((teacher, index) => (
        <div
          key={teacher?.email || index}
          className={`flex p-7 text-black border-2 py-3 pr-[15rem] hover:bg-[#bcbec7] hover:text-white ${
            index % 2 === 0 ? 'bg-[#efefef]' : ''
          }`}
        >
          <p className="w-1/4 text-center flex gap-3">
            <img
              src={teacher?.imageUrl || ''}
              alt="Teacher"
              className="border-2 items-center ml-[4rem] h-[2rem] w-[2rem]"
            />
            {teacher?.name}
          </p>
          <p className="w-1/4 text-center">{teacher?.age}</p>
          <p className="w-1/4 text-center">{teacher?.phone || 'N/A'}</p>
          <p className="w-1/4 text-center">{teacher?.experience_years}</p>
           
        </div>
      ))}
    </>
  );
};

export default TeacherRows;
