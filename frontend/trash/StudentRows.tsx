import React from 'react'

interface Student {
  studentId: number;
  studentName: string;
  fatherName: string;
  phoneNumber: number;
  age: number;
  gender: string;
}
interface Props{
    students:Student
}
const StudentRows:React.FC<Props> = ({students}) => {
  return (
    <>
    {
        students?.map((student, index) => (
            <div
                key={student?.studentId || index}
                    className={`flex p-7 text-black border-2 py-3 pr-[15rem] hover:bg-[#bcbec7] hover:text-white ${
                    index % 2 === 0 ? 'bg-[#efefef]' : ''}`
                }
                >
                <p key={index} className="w-1/4 text-center">{student?.studentId}</p>
                <p key={index} className="w-1/4 text-center flex gap-3">
                    <img
                        key={index}
                        src={student?.imageUrl || ''} // add src or placeholder if needed
                        alt="Student"
                        className="border-2 items-center ml-[4rem] h-[2rem] w-[2rem]"
                    />
                    {student?.studentName}
                </p>
                <p key={index} className="w-1/4 text-center">{student?.phoneNumber}</p>
                <p key={index} className="w-1/4 text-center">{student?.gender}</p>
            </div>
        ))
    }
    </>
  )
}
export default StudentRows