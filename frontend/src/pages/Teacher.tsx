import React from 'react';
import FullScreenProfile from '../components/FullScreenProfile';
import TableActionsBar from '../components/Table/TableActionsBar';
import Table from '../components/Table/Table';
import CreateTeacher from '../components/CreateProfile/CreateProfile'

const Teacher = () => {
  const [teacherBoard, setTeacherBoard] = React.useState<boolean>(false);
  const [createProfile_Flag, setCreateProfile_Flag] = React.useState<boolean>(false)

  // ✅ Define style object
  const characterStyles = {
    character: 'Teacher',
    bgColor: '#055266', // customize color if needed
    textColor: '#ffffff',
  };

  // ✅ Define profile action handler
  const profileActions = {
    setCreateProfile_Flag: setCreateProfile_Flag,
  };

  const headers:string[] = [
    "ID",
    "Name",
    "Phone",
    "Qualification",
    "Specialization",
    "Salary"
  ];

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={profileActions}
      />
      <Table headers={headers}  fetch={'teacher'}/>
      {createProfile_Flag && (
        <CreateTeacher onClose={() => setCreateProfile_Flag(false) } type='Teacher'/>
      )}
      {teacherBoard && <FullScreenProfile />}
    </div>
  );
};

export default Teacher;
