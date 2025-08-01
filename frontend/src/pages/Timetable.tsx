import React from 'react';
import FullScreenProfile from '../components/FullScreenProfile';
import TableActionsBar from '../components/Table/TableActionsBar';
import Table from '../components/Table/Table';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import Classes from '../components/ClassesTimeTable/Classes';
//import ClassSchedule from '../components/ClassesTimeTable/ClassSchedule';
import type {ISubjectSchedule} from '../CreateProfile/TimetableForm'

const Timetable = () => {
  const [timetableBoard, setTimetableBoard] = React.useState<boolean>(false);
  const [createTimetable_Flag, setCreateTimetable_Flag] = React.useState<boolean>(false);
  const [classView_Flag, setClassView_Flag] = React.useState<boolean>(false);
  const [subjectDetails,setSubjectDetails] = React.useState<ISubjectSchedule[]>()
  // Style configuration
  const characterStyles = {
    character: 'Timetable',
    bgColor: '#055266', // Indigo or change as needed
    textColor: '#ffffff',
  };

  const profileActions = {
    setCreateProfile_Flag: setCreateTimetable_Flag,
  };

  const headers: string[] = [
    'ID',
    'Class',
    'Subject',
    'Teacher',
    'Day',
    'Start Time',
    'End Time',
    'Room',
  ];

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={profileActions}
      />
      {createTimetable_Flag && (
        <CreateProfile type={'Timetable'} onClose={() => setCreateTimetable_Flag(false)} />
      )}
     <Classes setClassView_Flag={setClassView_Flag} subjectDetails={subjectDetails,setSubjectDetails}/>
     {/* { classView_Flag && (
        <ClassSchedule setClassView_Flag={setClassView_Flag} />
    )} */}
    </div>
  );
};

export default Timetable;
