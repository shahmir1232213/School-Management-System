import { useState } from "react";
import axios from "axios";
import ErrorComponent from "../ErrorComponent";
import type { StudentRecord } from "../../types/entities";

interface StudentFormsProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: StudentRecord;
  onSuccess?: () => void;
}

interface StudentFormValues {
  name: string;
  fatherName: string;
  phone: number;
  age: number;
  className: string;
  gender: string;
  admissionDATE: string;
}

const defaultStudentForm: StudentFormValues = {
  name: "",
  fatherName: "",
  phone: 0,
  age: 0,
  className: "",
  gender: "",
  admissionDATE: "",
};

const StudentForms: React.FC<StudentFormsProps> = ({
  onClose,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [studentForm, setStudentForm] = useState<StudentFormValues>({
    name: initialData?.name ?? defaultStudentForm.name,
    fatherName: initialData?.fatherName ?? defaultStudentForm.fatherName,
    phone: initialData?.phone ?? defaultStudentForm.phone,
    age: initialData?.age ?? defaultStudentForm.age,
    className: initialData?.className ?? defaultStudentForm.className,
    gender: initialData?.gender ?? defaultStudentForm.gender,
    admissionDATE: initialData?.admissionDATE ?? defaultStudentForm.admissionDATE,
  });

  function handleChange<Key extends keyof StudentFormValues>(
    key: Key,
    value: StudentFormValues[Key]
  ): void {
    setStudentForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleFormSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (mode === "create" && !imageFile) {
      setErrMsg("Please select an image before submitting.");
      setErrorFlag(true);
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("student", JSON.stringify(studentForm));

    try {
      if (mode === "edit" && initialData?._id) {
        await axios.put(`http://localhost:5000/student/${initialData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:5000/student/register", formData, {
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
          : "Unknown error occurred";
      setErrorFlag(true);
      setErrMsg(message);
    }
  }

  const previewSrc = imageFile
    ? URL.createObjectURL(imageFile)
    : initialData?.image
    ? `http://localhost:5000/images/${initialData.image}`
    : "/images/studentpic.png";

  return (
    <>
      <div className="absolute right-16 top-16 h-[10rem] w-[10rem]">
        <img src={previewSrc} alt="Student" className="h-full w-full rounded object-cover" />
      </div>

      <form className="mt-[1rem] flex flex-col" onSubmit={(event) => void handleFormSubmit(event)}>
        <div className="flex flex-wrap gap-6 p-4">
          <div className="flex flex-col">
            <label className="mb-1">Name</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="text"
              value={studentForm.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Father Name</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="text"
              value={studentForm.fatherName}
              onChange={(event) => handleChange("fatherName", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Phone</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="number"
              value={studentForm.phone}
              onChange={(event) => handleChange("phone", Number(event.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Age</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="number"
              value={studentForm.age}
              onChange={(event) => handleChange("age", Number(event.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Class</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="text"
              value={studentForm.className}
              onChange={(event) => handleChange("className", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Gender</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="text"
              value={studentForm.gender}
              onChange={(event) => handleChange("gender", event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Admission Date</label>
            <input
              className="h-[3rem] w-[13rem] rounded-md border-2 border-gray-300 p-2"
              type="date"
              value={studentForm.admissionDATE}
              onChange={(event) => handleChange("admissionDATE", event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <label className="font-semibold">Upload Student Image</label>
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

export default StudentForms;
