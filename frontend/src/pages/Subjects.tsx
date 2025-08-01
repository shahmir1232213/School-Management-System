import React from 'react'
//import FullScreenProfile from '../components/FullScreenProfile'
import TableActionsBar from '../components/Table/TableActionsBar'
import Table from '../components/Table/Table'
import CreateProfile from '../components/CreateProfile/CreateProfile'

const Subjects:React.FC = () => {
  //const [studentBoard, setStudentBoard] = React.useState<boolean>(true)
  const [createProfile_Flag, setCreateProfile_Flag] = React.useState<boolean>(false)
  
  const characterStyles = {
    character: 'Subjects',
    bgColor: '#055266',
    textColor: '#ffffff',
  };

  const profileActions = {
    setCreateProfile_Flag: setCreateProfile_Flag,
  };
  
  const headers:string[] = ["Subject ID", "Subject Name",'Class Name', "Teacher ID"];

  return (
    <div className="relative flex">
      <TableActionsBar
        profileActions={profileActions}
        characterStyles={characterStyles}
      />
      <Table headers={headers} fetch={'subjects'}/>
      {createProfile_Flag && (
        <CreateProfile type={'Subjects'} onClose={() => setCreateProfile_Flag(false) }/>
      )}
      
       {/* {studentBoard && <FullScreenProfile />}  */}
    </div>
  )
}

export default Subjects
