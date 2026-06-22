import { useState } from "react";
import axios from "axios";
import LoadingComponent from "../Loading";
import ErrorComponent from "../ErrorComponent";
import type { DayOfWeek, TimetableRecord, TimetableSubject } from "../../types/entities";

interface TimetableFormProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: TimetableRecord;
  onSuccess?: () => void;
}

interface TimetableFormState {
  classID: string;
  subjectDetails: TimetableSubject[];
}

const dayOptions: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const emptySubject = (): TimetableSubject => ({
  subjectID: "",
  dayOfWeek: "Monday",
  startTime: "",
  endTime: "",
  room: "",
});

const TimetableForm: React.FC<TimetableFormProps> = ({
  onClose,
  mode = "create",
  initialData,
  onSuccess,
}) => {
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formState, setFormState] = useState<TimetableFormState>({
    classID: initialData?.classID ?? "",
    subjectDetails:
      initialData?.subjectDetails.map((item) => ({
        ...item,
        room: item.room ?? "",
      })) ?? [emptySubject()],
  });

  function updateSubject(index: number, field: keyof TimetableSubject, value: string): void {
    setFormState((prev) => ({
      ...prev,
      subjectDetails: prev.subjectDetails.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoadingFlag(true);

    try {
      if (mode === "edit" && initialData?._id) {
        await axios.put(`http://localhost:4000/timetable/${initialData._id}`, formState);
      } else {
        await axios.post("http://localhost:4000/timetable/register", [formState]);
      }

      setLoadingFlag(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? String(err.response.data.error)
          : "Unable to save timetable";
      setLoadingFlag(false);
      setErrorFlag(true);
      setErrMsg(message);
    }
  }

  return (
    <>
      <form className="mt-[1rem] flex flex-col" onSubmit={(event) => void handleSubmit(event)}>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <label className="mb-1">Class ID</label>
            <input
              className="rounded-md border-2 border-gray-300 p-2"
              type="text"
              value={formState.classID}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, classID: event.target.value }))
              }
            />
          </div>

          {formState.subjectDetails.map((subject, index) => (
            <div key={subject._id ?? index} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[#055266]">Subject Slot {index + 1}</h3>
                {formState.subjectDetails.length > 1 ? (
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={() =>
                      setFormState((prev) => ({
                        ...prev,
                        subjectDetails: prev.subjectDetails.filter(
                          (_, subjectIndex) => subjectIndex !== index
                        ),
                      }))
                    }
                  >
                    Remove
                  </button>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <label className="mb-1">Subject ID</label>
                  <input
                    className="rounded-md border-2 border-gray-300 p-2"
                    value={subject.subjectID}
                    onChange={(event) => updateSubject(index, "subjectID", event.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">Day</label>
                  <select
                    className="rounded-md border-2 border-gray-300 p-2"
                    value={subject.dayOfWeek}
                    onChange={(event) => updateSubject(index, "dayOfWeek", event.target.value)}
                  >
                    {dayOptions.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">Start Time</label>
                  <input
                    className="rounded-md border-2 border-gray-300 p-2"
                    type="time"
                    value={subject.startTime}
                    onChange={(event) => updateSubject(index, "startTime", event.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">End Time</label>
                  <input
                    className="rounded-md border-2 border-gray-300 p-2"
                    type="time"
                    value={subject.endTime}
                    onChange={(event) => updateSubject(index, "endTime", event.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">Room</label>
                  <input
                    className="rounded-md border-2 border-gray-300 p-2"
                    value={subject.room ?? ""}
                    onChange={(event) => updateSubject(index, "room", event.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 px-4">
          <button
            type="submit"
            className="h-[3rem] w-56 rounded-md border-2 bg-[#055266] text-white"
          >
            {mode === "edit" ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                subjectDetails: [...prev.subjectDetails, emptySubject()],
              }))
            }
            className="h-[3rem] w-56 rounded-md border-2 bg-green-600 text-white"
          >
            Add Another Subject
          </button>
        </div>
      </form>
      {loadingFlag ? <LoadingComponent /> : null}
      {errorFlag ? <ErrorComponent errMsg={errMsg} onClose={() => setErrorFlag(false)} /> : null}
    </>
  );
};

export default TimetableForm;
