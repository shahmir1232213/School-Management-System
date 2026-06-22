import { useEffect, useState } from "react";
import axios from "axios";
import Rows from "./Rows";
import LoadingComponent from "../Loading";
import CreateProfile from "../CreateProfile/CreateProfile";
import type {
  ClassRecord,
  CrudResource,
  ModalType,
  StudentRecord,
  SubjectRecord,
  TableRecord,
  TeacherRecord,
} from "../../types/entities";

interface Props {
  headers: string[];
  resource: CrudResource;
  searchTerm?: string;
}

const modalTypeByResource: Record<CrudResource, ModalType> = {
  student: "Students",
  teacher: "Teacher",
  subjects: "Subjects",
  class: "Class",
};

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

function matchesSearch(record: TableRecord, resource: CrudResource, searchTerm: string): boolean {
  const query = searchTerm.toLowerCase();

  if (!query) {
    return true;
  }

  if (resource === "student" && isStudentRecord(record)) {
    return [
      record.id,
      record.name,
      record.fatherName,
      record.phone,
      record.gender,
      record.className,
      record.status,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  }

  if (resource === "teacher" && isTeacherRecord(record)) {
    return [
      record.id,
      record.name,
      record.email,
      record.phone,
      record.qualification,
      record.subjectSpecialization,
      record.salary,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  }

  if (resource === "subjects" && isSubjectRecord(record)) {
    return [record.id, record.name, record.className, record.teacherID]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  }

  if (resource === "class" && isClassRecord(record)) {
    return [record.id, record.fees, record.noOfStudents, record.noOfSubjects]
      .filter((value) => value !== undefined && value !== null)
      .some((value) => String(value).toLowerCase().includes(query));
  }

  return true;
}

const Table: React.FC<Props> = ({ headers, resource, searchTerm = "" }) => {
  const [data, setData] = useState<TableRecord[]>([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TableRecord | null>(null);

  async function fetchData(): Promise<void> {
    setLoadingFlag(true);
    try {
      const { data: response } = await axios.get(
        `http://localhost:4000/${endpointByResource[resource]}/fetch`
      );
      setData(response as TableRecord[]);
    } catch (err) {
      console.log("Error fetching table data", err);
    } finally {
      setLoadingFlag(false);
    }
  }

  useEffect(() => {
    void fetchData();
  }, [resource]);

  const filteredData = data.filter((record) => matchesSearch(record, resource, searchTerm));

  return (
    <>
      <div className="bg-white overflow-auto h-[73.8vh] mt-[26vh] w-full">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-white text-black font-semibold">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border px-4 py-2 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Rows
              data={filteredData}
              resource={resource}
              onEdit={(record) => setEditingRecord(record)}
              onRefresh={fetchData}
            />
          </tbody>
        </table>
        {loadingFlag ? <LoadingComponent /> : null}
      </div>

      {editingRecord ? (
        <CreateProfile
          type={modalTypeByResource[resource]}
          mode="edit"
          initialData={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSuccess={() => {
            setEditingRecord(null);
            void fetchData();
          }}
        />
      ) : null}
    </>
  );
};

export default Table;
