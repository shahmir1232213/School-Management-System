import React, { useEffect, useState } from 'react';
import type { ITimetable } from '../CreateProfile/TimetableForm';
import type { ISubjectSchedule } from '../CreateProfile/TimetableForm';

interface ClassScheduleModalProps {
  setClassView_Flag: (flag: boolean) => void;
  Details: ITimetable;
 // setSchedule:(a:ITimetable[])=>void;
}

interface Subject {
  subjectID: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  _id: string;
}

interface GroupedSubjects {
  [day: string]: Subject[];
}

function groupSubjectsByDay(subjectDetails: ISubjectSchedule): GroupedSubjects {
  return subjectDetails.reduce((acc: GroupedSubjects, item: Subject) => {
    const day = item.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});
}

const weekdaysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ClassScheduleModal: React.FC<ClassScheduleModalProps> = ({
  setClassView_Flag,
  Details,
}) => {
  const [filteredData, setFilteredData] = useState<GroupedSubjects>({});

  useEffect(() => {
    if (Details.subjectDetails.length > 0) {
      const grouped = groupSubjectsByDay(Details.subjectDetails);
      setFilteredData(grouped);
    }
  }, [Details]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={() => setClassView_Flag(false)}
      ></div>

      <div className="relative z-60 bg-white w-[65rem] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl">
        <button
          onClick={() => setClassView_Flag(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-5">
          Class {Details.classID} - Weekly Schedule
        </h2>

        {/* Day-wise grouping */}
        <div className="space-y-6">
          {weekdaysOrder.map((day) => {
            const subjects = filteredData[day];
            if (!subjects || subjects.length === 0) return null;

            return (
              <div key={day}>
                <h3 className="text-lg font-semibold mb-2">{day}</h3>
                <div className="space-y-2">
                  {subjects.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
                    >
                      <div className="text-blue-700 font-semibold">{item.subjectID}</div>
                      <div className="text-gray-500 text-sm">
                        {item.startTime} - {item.endTime}
                      </div>
                      <div className="text-gray-500 text-sm">{item.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleModal;
