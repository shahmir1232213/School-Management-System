import React, { useState, useEffect } from 'react';
import ErrorComponent from '../ErrorComponent';
import axios from 'axios';
import type { Student } from '../Table/Table';

interface StudentFormsProps {
  onClose: () => void;
}

const StudentForms: React.FC<StudentFormsProps> = ({ onClose }) => {
  const [errorFlag, setErrorFlag] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [studentForm, setStudentForm] = useState<Student>({
    name: '',
    fatherName: '',
    phone: 0,
    age: 0,
    className: '',
    gender: '',
    image: '',
    admissionDATE: '',
  });

  const keys = Object.keys(studentForm) as (keyof Student)[];

  useEffect(() => {
    console.log('studentForm: ', studentForm);
  }, [studentForm]);

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile); // send file
    formData.append("student", JSON.stringify(studentForm)); // send student as stringified JSON

    try {
      const response = await axios.post('http://localhost:3000/student/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Registration successful:", response.data);
       onClose();
    } catch (err: any) {
      const { response } = err;
      console.log("response.data.error:", response?.data?.error || err.message);
      setErrorFlag(true);
      setErrMsg(response?.data?.error || "Unknown error occurred");
    }
  }

  function handleChange(key: keyof Student, value: string | number): void {
    setStudentForm((prev) => ({
      ...prev,
      [key]: value,
    }));
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
            src="/images/studentpic.png"
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
                    key === 'admissionDATE'
                      ? 'date'
                      : typeof studentForm[key] === 'number'
                      ? 'number'
                      : 'text'
                  }
                  placeholder={`Enter ${key}`}
                  value={studentForm[key] as string | number}
                  onChange={(e) =>
                    handleChange(
                      key,
                      typeof studentForm[key] === 'number'
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
          <label className="font-semibold">Upload Student Image</label>
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

      {errorFlag && (
        <ErrorComponent errMsg={errMsg} onClose={() => setErrorFlag(false)} />
      )}
    </>
  );
};

export default StudentForms;
