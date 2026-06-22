import TeacherForms from "./TeacherForms";
import StudentForms from "./StudentForms";
import SubjectForms from "./SubjectForms";
import TimetableForm from "./TimetableForm";
import ClassForm from "./ClassForm";
import ClassFormUpdate from "./ClassFromUpdate";
import CreateProfileFooter from "./CreateProfileFooter";
import type {
  ClassRecord,
  ModalType,
  StudentRecord,
  SubjectRecord,
  TeacherRecord,
  TimetableRecord,
} from "../../types/entities";

interface Props {
  onClose: () => void;
  type: ModalType;
  mode?: "create" | "edit";
  initialData?: StudentRecord | TeacherRecord | SubjectRecord | ClassRecord | TimetableRecord;
  onSuccess?: () => void;
}

const CreateProfile: React.FC<Props> = ({
  onClose,
  type,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const titlePrefix = mode === "edit" ? "Update" : "Add";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative z-60 ml-[10rem] h-[40rem] w-[60rem] overflow-y-auto rounded-xl bg-white p-[1.5rem] shadow-lg">
        <h1 className="mb-5 ml-4 text-2xl font-bold">
          {titlePrefix} {type}
        </h1>

        {type === "Teacher" ? (
          <TeacherForms
            onClose={onClose}
            mode={mode}
            initialData={initialData as TeacherRecord | undefined}
            onSuccess={onSuccess}
          />
        ) : type === "Subjects" ? (
          <SubjectForms
            onClose={onClose}
            mode={mode}
            initialData={initialData as SubjectRecord | undefined}
            onSuccess={onSuccess}
          />
        ) : type === "Students" ? (
          <StudentForms
            onClose={onClose}
            mode={mode}
            initialData={initialData as StudentRecord | undefined}
            onSuccess={onSuccess}
          />
        ) : type === "Timetable" ? (
          <TimetableForm
            onClose={onClose}
            mode={mode}
            initialData={initialData as TimetableRecord | undefined}
            onSuccess={onSuccess}
          />
        ) : type === "Class" ? (
          <ClassForm
            onClose={onClose}
            mode={mode}
            initialData={initialData as ClassRecord | undefined}
            onSuccess={onSuccess}
          />
        ) : (
          <ClassFormUpdate onClose={onClose} onSuccess={onSuccess} />
        )}

        <CreateProfileFooter onClose={onClose} />
      </div>
    </div>
  );
};

export default CreateProfile;
