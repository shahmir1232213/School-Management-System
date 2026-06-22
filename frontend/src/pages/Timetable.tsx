import { useState } from "react";
import TableActionsBar from "../components/Table/TableActionsBar";
import CreateProfile from "../components/CreateProfile/CreateProfile";
import Classes from "../components/ClassesTimeTable/Classes";

const Timetable = () => {
  const [createTimetableFlag, setCreateTimetableFlag] = useState(false);

  const characterStyles = {
    character: "Timetable",
    bgColor: "#055266",
    textColor: "#ffffff",
  };

  return (
    <div className="flex">
      <TableActionsBar
        characterStyles={characterStyles}
        profileActions={{ setCreateProfile_Flag: setCreateTimetableFlag }}
      />
      {createTimetableFlag ? (
        <CreateProfile type="Timetable" onClose={() => setCreateTimetableFlag(false)} />
      ) : null}
      <Classes />
    </div>
  );
};

export default Timetable;
