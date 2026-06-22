import { useState } from "react";
import axios from "axios";
import ErrorComponent from "../ErrorComponent";
import type { SubjectRecord } from "../../types/entities";

interface SubjectFormsProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: SubjectRecord;
  onSuccess?: () => void;
}

interface SubjectFormValues {
  id: string;
  name: string;
  teacherId: number;
  className: string;
}

const SubjectForms: React.FC<SubjectFormsProps> = ({
  onClose,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [subjectForm, setSubjectForm] = useState<SubjectFormValues>({
    id: initialData?.id ?? "",
    name: initialData?.name ?? "",
    teacherId: initialData?.teacherID ?? 0,
    className: initialData?.className ?? "",
  });

  function handleChange<Key extends keyof SubjectFormValues>(
    key: Key,
    value: SubjectFormValues[Key]
  ): void {
    setSubjectForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleFormSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    try {
      if (mode === "edit" && initialData?._id) {
        await axios.put(`http://localhost:4000/subjects/${initialData._id}`, subjectForm);
      } else {
        await axios.post("http://localhost:4000/subjects/register", [subjectForm]);
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? String(err.response.data.error)
          : "Unable to save subject";
      setErrorFlag(true);
      setErrMsg(message);
    }
  }

  return (
    <>
      <form className="mt-[1rem] flex flex-col" onSubmit={(event) => void handleFormSubmit(event)}>
        <div className="flex flex-wrap gap-6 p-4">
          <div className="flex flex-col">
            <label className="mb-1">Subject ID</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={subjectForm.id}
              onChange={(event) => handleChange("id", event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Subject Name</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={subjectForm.name}
              onChange={(event) => handleChange("name", event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Teacher ID</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="number"
              value={subjectForm.teacherId}
              onChange={(event) => handleChange("teacherId", Number(event.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Class Name</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={subjectForm.className}
              onChange={(event) => handleChange("className", event.target.value)}
              required
            />
          </div>
        </div>

        <div className="ml-4 flex gap-4">
          <button
            type="submit"
            className="h-[3rem] w-56 rounded-md border-2 bg-[#055266] text-white"
          >
            {mode === "edit" ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      {errorFlag ? <ErrorComponent errMsg={errMsg} onClose={() => setErrorFlag(false)} /> : null}
    </>
  );
};

export default SubjectForms;
