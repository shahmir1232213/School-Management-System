import type { StudentRecord, TeacherRecord } from "../types/entities";

type ProfileData = StudentRecord | TeacherRecord;

interface FullScreenProfileProps {
  data: ProfileData;
  type: "student" | "teacher";
  onClose: () => void;
}

const FullScreenProfile: React.FC<FullScreenProfileProps> = ({ data, type, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div
        className="relative w-[90%] max-w-4xl rounded-lg bg-white p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          x
        </button>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="relative h-[10rem] w-[10rem]">
            <img
              src={
                data.image ? `http://localhost:5000/images/${data.image}` : "/images/studentpic.png"
              }
              alt="Profile"
              className="h-full w-full rounded border object-cover"
            />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 text-[16px] text-gray-800 sm:grid-cols-2">
            {type === "student" ? (
              <>
                <div>
                  <strong>Name:</strong> {(data as StudentRecord).name}
                </div>
                <div>
                  <strong>Father's Name:</strong> {(data as StudentRecord).fatherName}
                </div>
                <div>
                  <strong>Age:</strong> {(data as StudentRecord).age}
                </div>
                <div>
                  <strong>Class:</strong> {(data as StudentRecord).className}
                </div>
                <div>
                  <strong>Gender:</strong> {(data as StudentRecord).gender}
                </div>
                <div>
                  <strong>Phone:</strong> {(data as StudentRecord).phone}
                </div>
                <div>
                  <strong>Status:</strong> {(data as StudentRecord).status ?? "unpaid"}
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Name:</strong> {(data as TeacherRecord).name}
                </div>
                <div>
                  <strong>Email:</strong> {(data as TeacherRecord).email}
                </div>
                <div>
                  <strong>Phone:</strong> {(data as TeacherRecord).phone || "N/A"}
                </div>
                <div>
                  <strong>Qualification:</strong> {(data as TeacherRecord).qualification || "N/A"}
                </div>
                <div>
                  <strong>Experience:</strong> {(data as TeacherRecord).experienceYears ?? 0} years
                </div>
                <div>
                  <strong>Specialization:</strong>{" "}
                  {(data as TeacherRecord).subjectSpecialization || "N/A"}
                </div>
                <div>
                  <strong>Hire Date:</strong>{" "}
                  {(data as TeacherRecord).hireDate
                    ? new Date((data as TeacherRecord).hireDate as string).toLocaleDateString()
                    : "N/A"}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenProfile;
