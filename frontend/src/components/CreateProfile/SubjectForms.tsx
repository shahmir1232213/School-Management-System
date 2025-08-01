import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorComponent from '../ErrorComponent';
import type { Subjects } from './Table';

interface SubjectFormsProps {
  onClose: () => void;
}

const SubjectForms: React.FC<SubjectFormsProps> = ({ onClose }) => {
  const [count, setCount] = useState<number>(0);
  const [errorFlag,setErrorFlag] = useState<boolean>(false)
  const [errMsg,setErrMsg] = useState<string>('')
  const [subjectForm, setSubjectForm] = useState<Subject[]>([
    {
      id: '',
      name: '',
      teacherId: 0,
      className:''
    },
  ]);

  const keys = Object.keys(subjectForm[0]) as (keyof Subject)[];
  
  useEffect(() => {
    console.log('subjectForm: ', subjectForm);
  }, [subjectForm]);

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/subjects/register', subjectForm);
      // onClose(); // Uncomment if you want to close after submission
    } catch (err) {
      console.log('Error submitting subjects: ', err);
      const {response} = err;
      console.log("response.data.err: ",response.data.error)
      setErrorFlag(true)
      setErrMsg(response.data.error)
    }
  }

  function handleChange(key: keyof Subject, value: string | number): void {
    const updated: Subject[] = [...subjectForm];
    updated[count] = {
      ...updated[count],
      [key]: value,
    };
    setSubjectForm(updated);
  }

  return (
    <>
      <form className="flex flex-col mt-[1rem]" onSubmit={handleFormSubmit}>
        <div className="flex flex-wrap gap-6 p-4">
          {keys.map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 capitalize">{key}</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2 w-[13rem] h-[3rem]"
                type={typeof subjectForm[count][key] === 'number' ? 'number' : 'text'}
                placeholder={`Enter ${key}`}
                value={subjectForm[count][key] as string | number}
                required
                onChange={(e) =>
                  handleChange(key, typeof subjectForm[count][key] === 'number' ? +e.target.value : e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex gap-4 ml-4">
          <button
            type="submit"
            className="border-2 w-56 bg-[#055266] text-white h-[3rem] rounded-md"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setSubjectForm((prev) => [
                ...prev,
                {
                  id: '',
                  name: '',
                  teacherId: 0,
                  className:''
                },
              ]);
              setCount(subjectForm.length);
            }}
            className="border-2 w-56 bg-green-600 text-white h-[3rem] rounded-md"
          >
            + Add Another
          </button>
        </div>
      </form>
      {
        errorFlag && (
          <ErrorComponent errMsg={errMsg} onClose={()=>{setErrorFlag(false)}}/>
        )
      }
    </>
  );
};

export default SubjectForms;