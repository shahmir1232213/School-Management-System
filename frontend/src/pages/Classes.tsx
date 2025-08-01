import React,{useState} from 'react';
import TableActionsBar from '../components/Table/TableActionsBar';
import Table from '../components/Table/Table';
import CreateProfile from '../components/CreateProfile/CreateProfile'; // If you reuse this for classes
import FullScreenProfile from '../components/FullScreenProfile'; // Optional, if applicable

const Classes = () => {
  const [createProfile_Flag, setCreateProfile_Flag] = useState<boolean>(false);
  const [updateProfile_Flag,setupdateProfile_Flag] = useState<boolean>(false);
  const [classBoard, setClassBoard] = React.useState<boolean>(false); // Optional if you support detailed view

  const characterStyles = {
    character: 'Class',
    bgColor: '#055266',
    textColor: '#ffffff',
  };

  const profileActions = {
    setCreateProfile_Flag: setCreateProfile_Flag,
  };
   const profileUpdateActions = {
      setupdateProfile_Flag:setupdateProfile_Flag,
      updateText:'Promote Students'
  };

  const headers: string[] = [
    "Class ID",
    "No of Students",
    "No of Subjects",
    "Fees",
    
];

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={profileActions}
        profileUpdateActions={profileUpdateActions}
      />
      <Table headers={headers} fetch="Class" />
      {createProfile_Flag && (
        <CreateProfile onClose={() => setCreateProfile_Flag(false)} type="Class" />
      )}
      {updateProfile_Flag && (
        <CreateProfile onClose={() => setupdateProfile_Flag(false)} type="ClassUpdate" />
      )}
      {classBoard && <FullScreenProfile />}
    </div>
  );
};

export default Classes;
