import { useEffect, useState } from "react";
import type { TimetableRecord, TimetableSubject } from "../../types/entities";

interface ClassScheduleModalProps {
  setClassView_Flag: (flag: boolean) => void;
  Details: TimetableRecord;
}

interface GroupedSubjects {
  [day: string]: TimetableSubject[];
}

function groupSubjectsByDay(subjectDetails: TimetableSubject[]): GroupedSubjects {
  return subjectDetails.reduce((acc: GroupedSubjects, item) => {
    const day = item.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});
}

const weekdaysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ClassScheduleModal: React.FC<ClassScheduleModalProps> = ({
  setClassView_Flag,
  Details,
}) => {
  const [filteredData, setFilteredData] = useState<GroupedSubjects>({});

  useEffect(() => {
    if (Details.subjectDetails.length > 0) {
      setFilteredData(groupSubjectsByDay(Details.subjectDetails));
    }
  }, [Details]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={() => setClassView_Flag(false)}
      ></div>

      <div className="relative z-60 max-h-[90vh] w-[65rem] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <button
          onClick={() => setClassView_Flag(false)}
          className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          x
        </button>

        <h2 className="mb-5 text-2xl font-bold">Class {Details.classID} - Weekly Schedule</h2>

        <div className="space-y-6">
          {weekdaysOrder.map((day) => {
            const subjects = filteredData[day];
            if (!subjects || subjects.length === 0) {
              return null;
            }

            return (
              <div key={day}>
                <h3 className="mb-2 text-lg font-semibold">{day}</h3>
                <div className="space-y-2">
                  {subjects.map((item, index) => (
                    <div
                      key={`${item.subjectID}-${index}`}
                      className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 shadow-sm"
                    >
                      <div className="font-semibold text-blue-700">{item.subjectID}</div>
                      <div className="text-sm text-gray-500">
                        {item.startTime} - {item.endTime}
                      </div>
                      <div className="text-sm text-gray-500">{item.room || "-"}</div>
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
