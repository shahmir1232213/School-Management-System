import { useState } from "react";
import TableActionsBar from "../components/Table/TableActionsBar";
import Table from "../components/Table/Table";
import CreateProfile from "../components/CreateProfile/CreateProfile";

const Subjects: React.FC = () => {
  const [createProfileFlag, setCreateProfileFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const characterStyles = {
    character: "Subjects",
    bgColor: "#055266",
    textColor: "#ffffff",
  };

  const headers = ["Subject ID", "Subject Name", "Class Name", "Teacher ID", "Actions"];

  return (
    <div className="relative flex">
      <TableActionsBar
        profileActions={{ setCreateProfile_Flag: setCreateProfileFlag }}
        characterStyles={characterStyles}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Table headers={headers} resource="subjects" searchTerm={searchTerm} />
      {createProfileFlag ? (
        <CreateProfile type="Subjects" onClose={() => setCreateProfileFlag(false)} />
      ) : null}
    </div>
  );
};

export default Subjects;
