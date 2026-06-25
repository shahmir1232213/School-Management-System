import { useState } from "react";
import axios from "axios";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../Loading";

interface ClassUpdateFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const ClassUpdateForm: React.FC<ClassUpdateFormProps> = ({ onClose, onSuccess }) => {
  const [currentClassId, setCurrentClassId] = useState("");
  const [promotingClassId, setPromotingClassId] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setLoadingFlag(true);

    try {
      await axios.post("http://localhost:5000/class/promote", {
        currentClassId,
        promotingClassId,
      });
      setLoadingFlag(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Failed to promote students";
      setLoadingFlag(false);
      setErrorFlag(true);
      setErrMsg(message);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="flex h-[85%] w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold text-[#055266]">Promote Students</h2>

        <div className="flex flex-col">
          <label htmlFor="currentClassId" className="mb-1 text-sm font-medium">
            Current Class ID
          </label>
          <input
            type="text"
            id="currentClassId"
            value={currentClassId}
            onChange={(event) => setCurrentClassId(event.target.value)}
            required
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter Current Class ID"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="promotingClassId" className="mb-1 text-sm font-medium">
            Promoting Class ID
          </label>
          <input
            type="text"
            id="promotingClassId"
            value={promotingClassId}
            onChange={(event) => setPromotingClassId(event.target.value)}
            required
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter Promoting Class ID"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-md bg-[#055266] py-2 text-white transition-all hover:bg-[#044151]"
        >
          Submit
        </button>
      </form>
      {loadingFlag ? <LoadingComponent /> : null}
      {errorFlag ? <ErrorComponent errMsg={errMsg} onClose={() => setErrorFlag(false)} /> : null}
    </>
  );
};

export default ClassUpdateForm;
