import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Teacher } from '../Table/Table';

interface TeacherFormsProps {
  onClose: () => void;
}

const TeacherForms: React.FC<TeacherFormsProps> = ({ onClose }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [teacherForm, setTeacherForm] = useState<Teacher>({
    name: '',
    email: '',
    phone: '',
    hireDate: '',
    qualification: '',
    experienceYears: 0,
    subjectSpecialization: '',
    salary: 0,
    image: '', // Make sure 'image' exists in your Teacher type
  });

  const keys = Object.keys(teacherForm) as (keyof Teacher)[];

  useEffect(() => {
    console.log('teacherForm:', teacherForm);
  }, [teacherForm]);

  function handleChange(key: keyof Teacher, value: string | number): void {
    setTeacherForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!imageFile) {
      alert('Please upload a teacher image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('teacher', JSON.stringify(teacherForm));

    try {
      await axios.post('http://localhost:4000/teacher/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onClose();
    } catch (error) {
      console.error('Error submitting teacher form:', error);
      alert('Submission failed!');
    }
  }

  function resetForm() {
    setTeacherForm({
      name: '',
      email: '',
      phone: '',
      hireDate: '',
      qualification: '',
      experienceYears: 0,
      subjectSpecialization: '',
      salary: 0,
      image: '',
    });
    setImageFile(null);
  }

  return (
    <>
      <div className="absolute top-16 right-16 w-[10rem] h-[10rem]">
         {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Selected"
            className="object-cover w-full h-full rounded"
          />
        ) : (
          <img
            src="/images/teacherPic.png"
            alt="Default Student"
            className="object-cover w-full h-full rounded"
          />
        )}
      </div>
<form className="flex flex-col mt-[1rem]" onSubmit={handleFormSubmit}>
  <div className="flex flex-wrap gap-6 p-4">
    {keys.map((key) =>
      key !== 'image' ? (
        <div key={key} className="flex flex-col">
          <label className="mb-1 capitalize">{key}</label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-[13rem] h-[3rem]"
            type={
              key === 'hireDate'
                ? 'date'
                : typeof teacherForm[key] === 'number'
                ? 'number'
                : 'text'
            }
            placeholder={`Enter ${key}`}
            value={teacherForm[key] as string | number}
            onChange={(e) =>
              handleChange(
                key,
                typeof teacherForm[key] === 'number'
                  ? +e.target.value
                  : e.target.value
              )
            }
          />
        </div>
      ) : null
    )}
  </div>

  <div className="flex flex-col gap-2 p-4">
    <label className="font-semibold">Upload Teacher Image</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      className="border p-2 w-[22rem]"
    />
  </div>

  <div className="flex flex-wrap gap-4 p-4">
    <button
      type="submit"
      className="border-2 w-56 bg-[#055266] text-white h-[3rem] rounded-md"
    >
      Submit
    </button>
  </div>
</form>

    </>
  );
};

export default TeacherForms;
