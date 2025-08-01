import React, { useState, useEffect } from 'react';
import LoadingComponent from '../Loading';
import axios from 'axios';

type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface ISubjectSchedule {
  subjectID: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  room?: string;
}

interface ITimetable {
  classID: string;
  subjectDetails: ISubjectSchedule[];
}

interface TimetableFormProps {
  onClose: () => void;
}

const TimetableForm: React.FC<TimetableFormProps> = ({ onClose }) => {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [errorFlag,setErrorFlag] = useState<boolean>(false)
  const [errMsg,setErrMsg] = useState<string>('')
  const [loadingFlag ,setLoadingFlag] = useState<boolean>(false)
  
  const [klass, setKlass] = useState<ITimetable[]>([
    {
      classID: '',
      subjectDetails: [
        {
          subjectID: '',
          dayOfWeek: 'Monday',
          startTime: '',
          endTime: '',
          room: '',
        },
      ],
    },
  ]);

  const keys: string[] = ['classID', 'subjectDetails'];

  const subjectFields: (keyof ISubjectSchedule)[] = [
    'subjectID',
    'dayOfWeek',
    'startTime',
    'endTime',
    'room',
  ];

  const handleChange = (key: keyof ITimetable, value: string) => {
    const updated = [...klass];
    updated[count] = {
      ...updated[count],
      [key]: value,
    };
    setKlass(updated);
  };

  const handleSubjectChange = (key: keyof ISubjectSchedule, value: string) => {
    const updated = [...klass];
    const subjectList = [...updated[count].subjectDetails];
    subjectList[count2] = {
      ...subjectList[count2],
      [key]: value,
    };
    updated[count].subjectDetails = subjectList;
    setKlass(updated);
  };

  const dayOptions: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    console.log('class:', klass);
  }, [klass]);

  async function handleSubmit(e: React.FormEvent):void{
    e.preventDefault()
    setLoadingFlag(true)
    try{
       await axios.post('http://localhost:3000/timetable/register',klass)
       setLoadingFlag(false)
       onClose()
    }
    catch(err){
      console.log('Unable to post timeTable:  ',err)
    }
  }

  return (
    <>
      <form className="flex flex-col mt-[1rem]" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-6 p-4">
          {
              keys.map((key) => {
                return key === 'classID' ? (
                  <div key={key} className="flex flex-col">
                    <label className="mb-1 capitalize">{key}</label>
                    <input
                      className="border-4 rounded-md border-gray-100"
                      type="text"
                      value={klass[count][key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  </div>
                ) : (
                  subjectFields.map((sub) => (
                    <div key={sub} className="flex flex-col">
                      <label className="mb-1 capitalize">{sub}</label>

                      {sub === 'dayOfWeek' ? (
                        <select
                          className="border-4 rounded-md border-gray-100"
                          value={klass[count][key][count2][sub]}
                          onChange={(e) => handleSubjectChange(sub, e.target.value)}
                        >
                          {dayOptions.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="border-4 rounded-md border-gray-100"
                          type={
                            sub === 'startTime' || sub === 'endTime'
                              ? 'time'
                              : 'text'
                          }
                          value={klass[count][key][count2][sub] || ''}
                          onChange={(e) =>
                            handleSubjectChange(sub, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))
                );
              })
          }
        </div>

        <button
          type="submit"
          className="border-2 w-56 bg-[#055266] text-white h-[3rem] rounded-md"
        >
          Submit
        </button>
        
        <button
          type="button"
          onClick={
              () => {
                  const updated = [...klass]
                  updated[count].subjectDetails.push({
                    subjectID: '',
                    dayOfWeek: 'Monday',
                    startTime: '',
                    endTime: '',
                    room: '',
                  });
                setKlass(updated)
                setCount2(updated[count].subjectDetails.length - 1)
              }
          }
          className="border-2 w-56 bg-green-600 text-white h-[3rem] rounded-md mt-2"
        >
          + Add Another Subject
        </button>
      </form>
      {
        loadingFlag && (
          <LoadingComponent />
        )
      }
    </>
  );
};

export default TimetableForm;
