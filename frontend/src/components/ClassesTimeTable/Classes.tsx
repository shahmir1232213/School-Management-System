import { useEffect, useState } from "react";
import axios from "axios";
import ClassSchedule from "./ClassSchedule";
import CreateProfile from "../CreateProfile/CreateProfile";
import ConfirmationModal from "../ConfirmationModal";
import ErrorComponent from "../ErrorComponent";
import type { TimetableRecord } from "../../types/entities";

const Classes: React.FC = () => {
  const [schedule, setSchedule] = useState<TimetableRecord[]>([]);
  const [selectedClass, setSelectedClass] = useState<TimetableRecord | null>(null);
  const [editingClass, setEditingClass] = useState<TimetableRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TimetableRecord | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchSchedules(): Promise<void> {
    try {
      const { data } = await axios.get("http://localhost:4000/timetable/fetch");
      setSchedule(data as TimetableRecord[]);
    } catch (err) {
      console.log("Unable to fetch timetable", err);
    }
  }

  useEffect(() => {
    void fetchSchedules();
  }, []);

  async function deleteClass(): Promise<void> {
    if (!pendingDelete) {
      return;
    }

    setDeleteLoading(true);

    try {
      const { data } = await axios.post("http://localhost:4000/timetable/class", {
        classID: pendingDelete.classID,
      });
      setSchedule(data as TimetableRecord[]);
      setPendingDelete(null);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? String(err.response.data.error)
          : "Unable to delete timetable";
      setErrorMessage(message);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="mt-[26vh] flex h-[73.8vh] w-full flex-wrap items-start justify-start gap-4 p-4">
        {schedule.map((klass, idx) => (
          <div
            key={klass._id}
            className="h-auto w-[15rem] overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              className={`${
                idx % 2 === 0 ? "bg-[#0d9488]" : "bg-[#07586b]"
              } mt-3 flex justify-between rounded-lg px-6 py-4 text-white`}
            >
              <h2 className="text-lg font-semibold">Class: {klass.classID}</h2>
              <button onClick={() => setPendingDelete(klass)}>x</button>
            </div>

            <div className="px-6 py-2 text-center">
              <div className="mb-2 flex justify-between text-sm text-gray-500">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              {klass.subjectDetails.length > 0 ? (
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <strong>Day:</strong> {klass.subjectDetails[0].dayOfWeek}
                  </p>
                  <p>
                    <strong>Room:</strong> {klass.subjectDetails[0].room || "-"}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex justify-around px-4 pb-4 pt-2">
              <button
                className="rounded-full bg-[#16a34a] px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-600"
                onClick={() => setSelectedClass(klass)}
              >
                View
              </button>
              <button
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                onClick={() => setEditingClass(klass)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedClass ? (
        <ClassSchedule Details={selectedClass} setClassView_Flag={() => setSelectedClass(null)} />
      ) : null}

      {editingClass ? (
        <CreateProfile
          type="Timetable"
          mode="edit"
          initialData={editingClass}
          onClose={() => setEditingClass(null)}
          onSuccess={() => {
            setEditingClass(null);
            void fetchSchedules();
          }}
        />
      ) : null}

      {pendingDelete ? (
        <ConfirmationModal
          title="Delete Timetable"
          message={`Are you sure you want to delete the timetable for class ${pendingDelete.classID}?`}
          isLoading={deleteLoading}
          onCancel={() => {
            if (!deleteLoading) {
              setPendingDelete(null);
            }
          }}
          onConfirm={() => void deleteClass()}
        />
      ) : null}

      {errorMessage ? (
        <ErrorComponent errMsg={errorMessage} onClose={() => setErrorMessage("")} />
      ) : null}
    </>
  );
};

export default Classes;
