import React from 'react';
import type { Student, Teacher } from './Table/Table';

type ProfileData = Student | Teacher;

interface FullScreenProfileProps {
  data: ProfileData;
  type: 'student' | 'teacher';
  onClose: () => void;
}

const FullScreenProfile: React.FC<FullScreenProfileProps> = ({ data, type, onClose }) => {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-[90%] max-w-4xl p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-[10rem] h-[10rem] relative">
            <img
              src={
                data.image
                  ? `http://localhost:3000/images/${data.image}`
                  : '/images/studentpic.png'
              }
              alt="Profile"
              className="object-cover w-full h-full rounded border"
            />
          </div>

          {/* Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[16px] text-gray-800">
            {type === 'student' ? (
              <>
                <div><strong>Name:</strong> {(data as Student).studentName}</div>
                <div><strong>Father's Name:</strong> {(data as Student).fatherName}</div>
                <div><strong>Age:</strong> {(data as Student).age}</div>
                <div><strong>Class:</strong> {(data as Student).className}</div>
                <div><strong>Gender:</strong> {(data as Student).gender}</div>
                <div><strong>Phone:</strong> {(data as Student).phone}</div>
                <div><strong>Status:</strong> {(data as Student).status}</div>
              </>
            ) : (
              <>
                <div><strong>Name:</strong> {(data as Teacher).name}</div>
                <div><strong>Email:</strong> {(data as Teacher).email}</div>
                <div><strong>Phone:</strong> {(data as Teacher).phone || 'N/A'}</div>
                <div><strong>Qualification:</strong> {(data as Teacher).qualification}</div>
                <div><strong>Experience:</strong> {(data as Teacher).experience_years} years</div>
                <div><strong>Specialization:</strong> {(data as Teacher).subjectSpecialization}</div>
                <div>
                  <strong>Hire Date:</strong>{' '}
                  {new Date((data as Teacher).hire_date!).toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenProfile;
