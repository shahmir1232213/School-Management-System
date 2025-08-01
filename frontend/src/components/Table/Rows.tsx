import React,{useState,useEffect} from 'react';
import FullScreenProfile from '../FullScreenProfile';
import axios from 'axios';
import type { Subjects, ClassFormData, Student, Teacher } from './Table';

type RowData = Student | Teacher | Subjects | ClassFormData;

interface Props {
  data: RowData[];
  type: 'student' | 'teacher' | 'subjects' | 'Class';
}

const Rows: React.FC<Props> = ({ data, type }) => {
  const [profileShowFlag,setProfileShowFlag] = useState<boolean>(false)
  const [sendData,setSendData] = useState<Student | Teacher | undefined>(undefined)
  // If it’s a Class table, just render one uniform <tr> shape
  async function payFees(id:string):void{
    console.log("id at frontend: ",id)
    await axios.post('http://localhost:3000/student/feesPaid',{id})
  }
useEffect(() => {
  console.log("profileShowFlag updated: ", profileShowFlag);
}, [profileShowFlag]);
  if (type === 'Class') {
    return (
      <>
        {data.map((c, i) => (
          <tr 
            key={c.id ?? i}
            className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
          >
            <td className="border px-4 py-2 text-center">{c.id}</td>
            <td className="border px-4 py-2 text-center">
              {/* noOfStudents is optional so we cast safely */}
              {(c as ClassFormData).noOfStudents ?? '-'}
            </td>
            <td className="border px-4 py-2 text-center">
              {(c as ClassFormData).noOfSubjects ?? '-'}
            </td>
            <td className="border px-4 py-2 text-center">
              {(c as ClassFormData).fees}
            </td>
          </tr>
        ))}
      </>
    );
  }

  // Otherwise fall back to your existing multi‑column logic
  return (
    <>
      {data.map((person, i) => (
        <tr
          key={person.id ?? (person as Teacher).email ?? i}
          className={`${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-300`}
        >
          {/* ID or email */}
          <td className="border px-4 py-2 text-center">
            {'studentId' in person ? person.studentId : person.id ?? (person as Teacher).email}
          </td>

          {/* Name / avatar */}
          <td 
             onClick={()=>{
           // console.log("profileShowFlag: ",profileShowFlag)
            setProfileShowFlag(true)
            setSendData(person)
          }}
            className="border px-4 py-2 text-center flex justify-center items-center gap-2">
            {console.log("person.image: ",person.image)}
            {person.image && (
              
              <img src={`http://localhost:3000/images/${person.image}`} className="h-6 w-6 rounded-full" />
            )}
            {person.name}
          </td>

          {/* Phone */}
          <td className="border px-4 py-2 text-center">
            {person.phone ?? '-'}
          </td>

          {/* Then render the rest based on type */}
          {type === 'teacher' && (
            <>
              <td className="border px-4 py-2 text-center">
                {(person as Teacher).qualification}
              </td>
              <td className="border px-4 py-2 text-center">
                {(person as Teacher).subjectSpecialization}
              </td>
              <td className="border px-4 py-2 text-center">
                {(person as Teacher).salary}
              </td>
            </>
          )}

          {type === 'student' && (
            <>
              {console.log("students person: ",person)}
              <td className="border px-4 py-2 text-center">
                {(person as Student).gender}
              </td>
              <td className="border px-4 py-2 text-center">
                {(person as Student).className}
              </td>
              <td className="border px-4 py-2 text-center">
                {(person as Student).status}
              </td>
              <td className="border px-4 py-2 text-center">
                 <button onClick={()=>{payFees(person._id)}} className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition">
                    Paid
                  </button>
              </td>
            </>
          )}
        {
          type === 'subjects' && (
            <>
             {console.log("person.teacherId: ",person.teacherId)}
            
              <td className="border relative right-[15rem] px-4 py-2 text-center">
                {(person as Subjects).className}
              </td>
              <td className="border relative right-[10rem] px-4 py-2 text-center">
                {(person as Subjects).teacherID}
              </td>
            </>
          )}
        </tr>
      ))}
      {
        profileShowFlag && (
          <FullScreenProfile data={sendData} onClose={()=>{setProfileShowFlag(false)}} type={type}/>
        )
      }
    </>
  );
};

export default Rows;
