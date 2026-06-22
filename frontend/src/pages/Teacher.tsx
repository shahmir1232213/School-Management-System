import { useState } from "react";
import TableActionsBar from "../components/Table/TableActionsBar";
import Table from "../components/Table/Table";
import CreateProfile from "../components/CreateProfile/CreateProfile";

const Teacher = () => {
  const [createProfileFlag, setCreateProfileFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const characterStyles = {
    character: "Teacher",
    bgColor: "#055266",
    textColor: "#ffffff",
  };

  const headers = ["ID", "Name", "Phone", "Qualification", "Specialization", "Salary", "Actions"];

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={{ setCreateProfile_Flag: setCreateProfileFlag }}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Table headers={headers} resource="teacher" searchTerm={searchTerm} />
      {createProfileFlag ? (
        <CreateProfile onClose={() => setCreateProfileFlag(false)} type="Teacher" />
      ) : null}
    </div>
  );
};

export default Teacher;
