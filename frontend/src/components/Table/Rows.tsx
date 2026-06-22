import { useState } from "react";
import axios from "axios";
import FullScreenProfile from "../FullScreenProfile";
import ConfirmationModal from "../ConfirmationModal";
import ErrorComponent from "../ErrorComponent";
import type {
  ClassRecord,
  CrudResource,
  StudentRecord,
  SubjectRecord,
  TableRecord,
  TeacherRecord,
} from "../../types/entities";

interface Props {
  data: TableRecord[];
  resource: CrudResource;
  onEdit: (record: TableRecord) => void;
  onRefresh: () => Promise<void>;
}

const endpointByResource: Record<CrudResource, string> = {
  student: "student",
  teacher: "teacher",
  subjects: "subjects",
  class: "class",
};

function isStudentRecord(record: TableRecord): record is StudentRecord {
  return "fatherName" in record;
}

function isTeacherRecord(record: TableRecord): record is TeacherRecord {
  return "email" in record;
}

function isSubjectRecord(record: TableRecord): record is SubjectRecord {
  return "teacherID" in record;
}

function isClassRecord(record: TableRecord): record is ClassRecord {
  return "fees" in record && !("email" in record) && !("fatherName" in record);
}

const Rows: React.FC<Props> = ({ data, resource, onEdit, onRefresh }) => {
  const [profileRecord, setProfileRecord] = useState<StudentRecord | TeacherRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TableRecord | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getEntityLabel(record: TableRecord): string {
    if (resource === "student" && isStudentRecord(record)) {
      return `student ${record.name}`;
    }

    if (resource === "teacher" && isTeacherRecord(record)) {
      return `teacher ${record.name}`;
    }

    if (resource === "subjects" && isSubjectRecord(record)) {
      return `subject ${record.name}`;
    }

    if (resource === "class" && isClassRecord(record)) {
      return `class ${record.id}`;
    }

    return "record";
  }

  async function confirmDelete(): Promise<void> {
    if (!pendingDelete) {
      return;
    }

    setDeleteLoading(true);

    try {
      await axios.delete(`http://localhost:4000/${endpointByResource[resource]}/${pendingDelete._id}`);
      setPendingDelete(null);
      await onRefresh();
    } catch (err) {
      const message =
        axios.isAxiosError(err) &&
        (err.response?.data?.error || err.response?.data?.message)
          ? String(err.response?.data?.error || err.response?.data?.message)
          : "Delete failed. Please check if this record is linked to other data.";
      setErrorMessage(message);
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleFeesPaid(studentId: string): Promise<void> {
    try {
      await axios.post("http://localhost:4000/student/feesPaid", { id: studentId });
      await onRefresh();
    } catch (err) {
      console.log("Unable to update fee status", err);
    }
  }

  if (data.length === 0) {
    return (
      <tr>
        <td className="border px-4 py-6 text-center text-gray-500" colSpan={7}>
          No records found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((record, index) => (
        <tr
          key={record._id}
          className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
        >
          {resource === "student" && isStudentRecord(record) ? (
            <>
              <td className="border px-4 py-2 text-center">{record.id}</td>
              <td
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => setProfileRecord(record)}
              >
                <div className="flex items-center justify-center gap-2">
                  {record.image ? (
                    <img
                      src={`http://localhost:4000/images/${record.image}`}
                      alt={record.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : null}
                  <span>{record.name}</span>
                </div>
              </td>
              <td className="border px-4 py-2 text-center">{record.phone}</td>
              <td className="border px-4 py-2 text-center">{record.gender}</td>
              <td className="border px-4 py-2 text-center">{record.className}</td>
              <td className="border px-4 py-2 text-center">{record.status ?? "unpaid"}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="rounded bg-green-600 px-3 py-1 text-xs text-white"
                    onClick={() => void handleFeesPaid(record._id)}
                  >
                    Toggle Fee
                  </button>
                  <button
                    type="button"
                    className="rounded bg-sky-600 px-3 py-1 text-xs text-white"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={() => setPendingDelete(record)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </>
          ) : null}

          {resource === "teacher" && isTeacherRecord(record) ? (
            <>
              <td className="border px-4 py-2 text-center">{record.id}</td>
              <td
                className="border px-4 py-2 text-center cursor-pointer"
                onClick={() => setProfileRecord(record)}
              >
                <div className="flex items-center justify-center gap-2">
                  {record.image ? (
                    <img
                      src={`http://localhost:4000/images/${record.image}`}
                      alt={record.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : null}
                  <span>{record.name}</span>
                </div>
              </td>
              <td className="border px-4 py-2 text-center">{record.phone ?? "-"}</td>
              <td className="border px-4 py-2 text-center">{record.qualification ?? "-"}</td>
              <td className="border px-4 py-2 text-center">
                {record.subjectSpecialization ?? "-"}
              </td>
              <td className="border px-4 py-2 text-center">{record.salary}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="rounded bg-sky-600 px-3 py-1 text-xs text-white"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={() => setPendingDelete(record)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </>
          ) : null}

          {resource === "subjects" && isSubjectRecord(record) ? (
            <>
              <td className="border px-4 py-2 text-center">{record.id}</td>
              <td className="border px-4 py-2 text-center">{record.name}</td>
              <td className="border px-4 py-2 text-center">{record.className}</td>
              <td className="border px-4 py-2 text-center">{record.teacherID}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="rounded bg-sky-600 px-3 py-1 text-xs text-white"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={() => setPendingDelete(record)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </>
          ) : null}

          {resource === "class" && isClassRecord(record) ? (
            <>
              <td className="border px-4 py-2 text-center">{record.id}</td>
              <td className="border px-4 py-2 text-center">{record.noOfStudents ?? 0}</td>
              <td className="border px-4 py-2 text-center">{record.noOfSubjects ?? 0}</td>
              <td className="border px-4 py-2 text-center">{record.fees}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="rounded bg-sky-600 px-3 py-1 text-xs text-white"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={() => setPendingDelete(record)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </>
          ) : null}
        </tr>
      ))}

      {profileRecord ? (
        <FullScreenProfile
          data={profileRecord}
          type={isStudentRecord(profileRecord) ? "student" : "teacher"}
          onClose={() => setProfileRecord(null)}
        />
      ) : null}

      {pendingDelete ? (
        <ConfirmationModal
          title="Confirm Delete"
          message={`Are you sure you want to delete ${getEntityLabel(pendingDelete)}?`}
          isLoading={deleteLoading}
          onCancel={() => {
            if (!deleteLoading) {
              setPendingDelete(null);
            }
          }}
          onConfirm={() => void confirmDelete()}
        />
      ) : null}

      {errorMessage ? (
        <ErrorComponent errMsg={errorMessage} onClose={() => setErrorMessage("")} />
      ) : null}
    </>
  );
};

export default Rows;
