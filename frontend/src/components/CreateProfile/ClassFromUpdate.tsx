import React, { useState } from 'react';
import ErrorComponent from '../ErrorComponent';
import axios from 'axios';
import LoadingComponent from '../Loading';
interface ClassUpdateFormProps {
  onClose: () => void;
}

const ClassUpdateForm: React.FC<ClassUpdateFormProps> = ({ onClose }) => {
  const [currentClassId, setCurrentClassId] = useState('');
  const [promotingClassId, setPromotingClassId] = useState('');
  const [errorFlag,setErrorFlag] = useState<boolean>(false)
  const [errMsg,setErrMsg] = useState<string>('')
  const [loadingFlag ,setLoadingFlag] = useState<boolean>(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingFlag(true)
    try {
      await axios.post('http://localhost:3000/class/promote', {
        currentClassId,
        promotingClassId,
      });
      setLoadingFlag(false);
      onClose();
    } catch (err) {
      const {response} = err;
      console.log("response.data.err: ",response.data.message)
      setLoadingFlag(false)
      setErrorFlag(true)
      setErrMsg(response.data.message)
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[100%] h-[85%]"
    >
      <h2 className="text-xl font-semibold text-[#055266]">Update Class</h2>

      <div className="flex flex-col">
        <label htmlFor="currentClassId" className="mb-1 text-sm font-medium">Current Class ID</label>
        <input
          type="text"
          id="currentClassId"
          value={currentClassId}
          onChange={(e) => setCurrentClassId(e.target.value)}
          required
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter Current Class ID"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="promotingClassId" className="mb-1 text-sm font-medium">Promoting Class ID</label>
        <input
          type="text"
          id="promotingClassId"
          value={promotingClassId}
          onChange={(e) => setPromotingClassId(e.target.value)}
          required
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter Promoting Class ID"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-[#055266] text-white rounded-md py-2 hover:bg-[#044151] transition-all"
      >
        Submit
      </button>
    </form>
    {
      loadingFlag && (
        <LoadingComponent />
      )
    }
     {
        errorFlag && (
          <ErrorComponent errMsg={errMsg} onClose={()=>{setErrorFlag(false)}}/>
        )
      }
      </>
  );
};

export default ClassUpdateForm;
