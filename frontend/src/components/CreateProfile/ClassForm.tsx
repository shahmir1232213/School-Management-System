import { useState } from "react";
import axios from "axios";
import ErrorComponent from "../ErrorComponent";
import type { ClassRecord } from "../../types/entities";

interface ClassFormProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: ClassRecord;
  onSuccess?: () => void;
}

interface ClassFormValues {
  id: string;
  fees: string;
}

const ClassForm: React.FC<ClassFormProps> = ({
  onClose,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState<ClassFormValues>({
    id: initialData?.id ?? "",
    fees: initialData?.fees ?? "",
  });

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    try {
      if (mode === "edit" && initialData?._id) {
        await axios.put(`http://localhost:4000/class/${initialData._id}`, formData);
      } else {
        await axios.post("http://localhost:4000/class/register", [formData]);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : "Submission failed";
      setErrorFlag(true);
      setErrMsg(message);
    }
  }

  return (
    <>
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="flex h-[85%] w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold text-[#055266]">
          {mode === "edit" ? "Update Class" : "Create Class"}
        </h2>

        <div className="flex flex-col">
          <label htmlFor="classID" className="mb-1 text-sm font-medium">
            Class ID
          </label>
          <input
            type="text"
            id="classID"
            value={formData.id}
            onChange={(event) => setFormData((prev) => ({ ...prev, id: event.target.value }))}
            required
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter Class ID"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="fees" className="mb-1 text-sm font-medium">
            Fees
          </label>
          <input
            type="text"
            id="fees"
            value={formData.fees}
            onChange={(event) => setFormData((prev) => ({ ...prev, fees: event.target.value }))}
            required
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter Fees"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-md bg-[#055266] py-2 text-white transition-all hover:bg-[#044151]"
        >
          {mode === "edit" ? "Update" : "Submit"}
        </button>
      </form>
      {errorFlag ? <ErrorComponent errMsg={errMsg} onClose={() => setErrorFlag(false)} /> : null}
    </>
  );
};

export default ClassForm;
