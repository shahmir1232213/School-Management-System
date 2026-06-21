import React, { useState } from 'react';
import axios from 'axios';
import type { ClassFormData } from '../Table/Table';
import LoadingComponent from '../Loading';

interface ClassFormProps {
  onClose: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ClassFormData[]>([
    {
      id: '',
      fees: '',
    },
  ]);

  const [count, setCount] = useState(0); // current editing index

  function handleChange(key: keyof ClassFormData, value: string | number): void {
    const updated = [...formData];
    updated[count] = {
      ...updated[count],
      [key]: value,
    };
    setFormData(updated);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/class/register', formData);
      onClose();
    } catch (error) {
      console.error('Error submitting class form:', error);
      alert('Submission failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[100%] h-[85%]">
      <h2 className="text-xl font-semibold text-[#055266]">Create Class</h2>

      {formData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-4"
          onClick={() => setCount(index)} // set current active index
        >
          <div className="flex flex-col">
            <label htmlFor={`classID-${index}`} className="mb-1 text-sm font-medium">Class ID</label>
            <input
              type="text"
              id={`classID-${index}`}
              value={item.id}
              onChange={(e) => handleChange('id', e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Enter Class ID"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor={`fees-${index}`} className="mb-1 text-sm font-medium">Fees</label>
            <input
              type="text"
              id={`fees-${index}`}
              value={item.fees}
              onChange={(e) => handleChange('fees', e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Enter Fees"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          setFormData([...formData, { id: '', fees: '' }]);
          setCount(formData.length); // point to new entry
        }}
        className="mt-2 bg-gray-200 text-black rounded-md py-2 hover:bg-gray-300 transition-all"
      >
        Add Another
      </button>

      <button
        type="submit"
        className="mt-4 bg-[#055266] text-white rounded-md py-2 hover:bg-[#044151] transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default ClassForm;
