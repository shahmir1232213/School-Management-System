import { useState } from "react";
import TableActionsBar from "../components/Table/TableActionsBar";
import Table from "../components/Table/Table";
import CreateProfile from "../components/CreateProfile/CreateProfile";

const Students = () => {
  const [createProfileFlag, setCreateProfileFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const characterStyles = {
    character: "Student",
    bgColor: "#055266",
    textColor: "#ffffff",
    nextMonth: "Next Month",
  };

  const headers = ["Student ID", "Name", "Phone", "Gender", "Class", "Fees Status", "Actions"];

  return (
    <div className="relative flex">
      <TableActionsBar
        profileActions={{ setCreateProfile_Flag: setCreateProfileFlag }}
        characterStyles={characterStyles}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Table headers={headers} resource="student" searchTerm={searchTerm} />
      {createProfileFlag ? (
        <CreateProfile onClose={() => setCreateProfileFlag(false)} type="Students" />
      ) : null}
    </div>
  );
};

export default Students;
