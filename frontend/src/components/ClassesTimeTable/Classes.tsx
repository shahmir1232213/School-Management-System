import React, { useState, useEffect } from 'react';
import type { ITimetable } from '../CreateProfile/TimetableForm';
import axios from 'axios';
import ClassSchedule from './ClassSchedule';
//import type {ISubjectSchedule} from '../CreateProfile/TimetableForm'
// interface TimeTableProps {
//   setClassView_Flag: (flag: boolean) => void;
// }

const Classes: React.FC = () => {
  const [schedule, setSchedule] = useState<ITimetable[]>([]);
  const [classView_Flag, setClassView_Flag] = React.useState<boolean>(false);
  const [sendState,setSendState] = useState<ITimetable|undefined>(undefined)

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get('http://localhost:4000/timetable/fetch');
        console.log("data: ", data);
        setSchedule(data);
      } catch (err) {
        console.log('Unable to fetch timeTable: ', err);
      }
    }
    fetch();
  }, []);

  async function deleteClass(classID:string){
    try{
      //console.log("deleteing: ",classID)
      const { data } = await axios.post('http://localhost:4000/timetable/class',{classID});
      setSchedule(data);
    }
    catch(err){
      console.log('Class Deleted')
    }
  }

  return (
    <>
    <div className="flex flex-wrap items-start justify-start gap-4 p-4 h-[73.8vh] mt-[26vh] w-full">
      {schedule.map((klass, idx) => (
        <div
          key={idx}
          className="w-[15rem] h-auto rounded-xl shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className={`${idx % 2 == 0 ? 'bg-[#0d9488]':'bg-[#07586b]'} mt-3 rounded-lg text-white px-6 py-4 flex justify-between`}>
            <h2 className="text-lg font-semibold">Class: {klass.classID}</h2>
            <button onClick={()=>{deleteClass(klass.classID)}}>X</button>
          </div>

          <div className="text-center px-6 py-2">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <span
                  key={i}
                  className={day === 'Mon' ? 'text-teal-500 font-semibold' : ''}
                >
                  {day}
                </span>
              ))}
            </div>

            {klass.subjectDetails.length > 0 && (
              <div className="text-gray-700 text-sm mt-2">
                <p><strong>Day:</strong> {klass.subjectDetails[0].dayOfWeek}</p>
                <p><strong>Room:</strong> {klass.subjectDetails[0].room}</p>
              </div>
            )}
          </div>

          <div className="flex justify-around px-4 pb-4 pt-2">
            <button
              className="px-4 py-2 bg-[#16a34a] text-white rounded-full text-sm font-medium hover:bg-teal-600 transition"
              onClick={() => {
                  setClassView_Flag(true)
                  setSendState(klass)
                }
              }
            >
              View Class
            </button>
          </div>
        </div>  
      ))}
    </div>
      { 
          classView_Flag && (
              <ClassSchedule setClassView_Flag={setClassView_Flag} Details={sendState} />
          )
      }
    </>
  );
};

export default Classes;
