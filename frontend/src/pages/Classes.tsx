import { useState } from "react";
import TableActionsBar from "../components/Table/TableActionsBar";
import Table from "../components/Table/Table";
import CreateProfile from "../components/CreateProfile/CreateProfile";

const Classes = () => {
  const [createProfileFlag, setCreateProfileFlag] = useState(false);
  const [updateProfileFlag, setUpdateProfileFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const characterStyles = {
    character: "Class",
    bgColor: "#055266",
    textColor: "#ffffff",
  };

  const headers = ["Class ID", "No of Students", "No of Subjects", "Fees", "Actions"];

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={{ setCreateProfile_Flag: setCreateProfileFlag }}
        profileUpdateActions={{
          setupdateProfile_Flag: setUpdateProfileFlag,
          updateText: "Promote Students",
        }}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Table headers={headers} resource="class" searchTerm={searchTerm} />
      {createProfileFlag ? (
        <CreateProfile onClose={() => setCreateProfileFlag(false)} type="Class" />
      ) : null}
      {updateProfileFlag ? (
        <CreateProfile onClose={() => setUpdateProfileFlag(false)} type="ClassUpdate" />
      ) : null}
    </div>
  );
};

export default Classes;
