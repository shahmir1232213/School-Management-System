import { useState } from "react";
import axios from "axios";
import ErrorComponent from "../ErrorComponent";
import type { TeacherRecord } from "../../types/entities";

interface TeacherFormsProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: TeacherRecord;
  onSuccess?: () => void;
}

interface TeacherFormValues {
  name: string;
  email: string;
  phone: string;
  hireDate: string;
  qualification: string;
  experienceYears: number;
  subjectSpecialization: string;
  gender: string;
  salary: number;
}

const TeacherForms: React.FC<TeacherFormsProps> = ({
  onClose,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [teacherForm, setTeacherForm] = useState<TeacherFormValues>({
    name: initialData?.name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    hireDate: initialData?.hireDate ? initialData.hireDate.slice(0, 10) : "",
    qualification: initialData?.qualification ?? "",
    experienceYears: initialData?.experienceYears ?? 0,
    subjectSpecialization: initialData?.subjectSpecialization ?? "",
    gender: initialData?.gender ?? "",
    salary: initialData?.salary ?? 0,
  });

  function handleChange<Key extends keyof TeacherFormValues>(
    key: Key,
    value: TeacherFormValues[Key]
  ): void {
    setTeacherForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleFormSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (mode === "create" && !imageFile) {
      setErrMsg("Please upload a teacher image.");
      setErrorFlag(true);
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("teacher", JSON.stringify(teacherForm));

    try {
      if (mode === "edit" && initialData?._id) {
        await axios.put(`http://localhost:4000/teacher/${initialData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:4000/teacher/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? String(err.response.data.error)
          : "Submission failed";
      setErrMsg(message);
      setErrorFlag(true);
    }
  }

  const previewSrc = imageFile
    ? URL.createObjectURL(imageFile)
    : initialData?.image
    ? `http://localhost:4000/images/${initialData.image}`
    : "/images/teacherPic.png";

  return (
    <>
      <div className="absolute right-16 top-16 h-[10rem] w-[10rem]">
        <img src={previewSrc} alt="Teacher" className="h-full w-full rounded object-cover" />
      </div>

      <form className="mt-[1rem] flex flex-col" onSubmit={(event) => void handleFormSubmit(event)}>
        <div className="flex flex-wrap gap-6 p-4">
          <div className="flex flex-col">
            <label className="mb-1">Name</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Email</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Phone</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Hire Date</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="date"
              value={teacherForm.hireDate}
              onChange={(event) => handleChange("hireDate", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Qualification</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.qualification}
              onChange={(event) => handleChange("qualification", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Experience Years</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="number"
              value={teacherForm.experienceYears}
              onChange={(event) => handleChange("experienceYears", Number(event.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Specialization</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.subjectSpecialization}
              onChange={(event) => handleChange("subjectSpecialization", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Gender</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              value={teacherForm.gender}
              onChange={(event) => handleChange("gender", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Salary</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="number"
              value={teacherForm.salary}
              onChange={(event) => handleChange("salary", Number(event.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <label className="font-semibold">Upload Teacher Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            className="w-[22rem] border p-2"
          />
        </div>

        <div className="flex flex-wrap gap-4 p-4">
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

export default TeacherForms;
