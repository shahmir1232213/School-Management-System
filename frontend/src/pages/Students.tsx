import React from 'react'
//import FullScreenProfile from '../components/FullScreenProfile'
import TableActionsBar from '../components/Table/TableActionsBar'
import Table from '../components/Table/Table'
import CreateProfile from '../components/CreateProfile/CreateProfile'

const Students = () => {
  //const [studentBoard, setStudentBoard] = React.useState<boolean>(true)
  const [createProfile_Flag, setCreateProfile_Flag] = React.useState<boolean>(false)
  
  const characterStyles = {
    character: 'Student',
    bgColor: '#055266',
    textColor: '#ffffff',
    nextMonth:'Next Month'
  };

  const profileActions = {
    setCreateProfile_Flag: setCreateProfile_Flag,
  };
  
  const headers:string[] = ["Student ID", "Name", "Phone" ,"Gender", "Class","Fees Status"," "];

  return (
    <div className="relative flex">
      <TableActionsBar
        profileActions={profileActions}
        characterStyles={characterStyles}
      />
      <Table headers={headers} fetch={'student'}/>
      {createProfile_Flag && (
        <CreateProfile  type={'Student'}  onClose={() => setCreateProfile_Flag(false) }  type='Students'/>
      )}
      
       {/* {studentBoard && <FullScreenProfile />}  */}
    </div>
  )
}

export default Students
