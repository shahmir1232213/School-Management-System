import type { CharacterStyles, ProfileActions, ProfileUpdateActions } from "./Table/TableActionsBar";
import axios from "axios";

interface Props {
  characterStyles: CharacterStyles;
  profileActions: ProfileActions;
  profileUpdateActions?: ProfileUpdateActions;
  nextMonth?: string;
  text: string;
}

const Button: React.FC<Props> = ({
  characterStyles,
  profileActions,
  profileUpdateActions,
  nextMonth,
  text,
}) => {
  const baseButtonStyles =
    "rounded-lg font-bold py-2 px-4 text-center h-[4rem] min-w-[9rem] cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-105";

  const sharedStyle = {
    backgroundColor: characterStyles.bgColor,
    color: characterStyles.textColor,
  };

  return (
    <>
      <button
        type="button"
        className={baseButtonStyles}
        style={sharedStyle}
        onClick={() => profileActions.setCreateProfile_Flag(true)}
      >
        {text}
      </button>

      {nextMonth ? (
        <button
          type="button"
          className={baseButtonStyles}
          style={sharedStyle}
          onClick={async () => {
            await axios.post("http://localhost:5000/student/feeStatusRenew");
          }}
        >
          {nextMonth}
        </button>
      ) : null}

      {profileUpdateActions ? (
        <button
          type="button"
          className={baseButtonStyles}
          style={sharedStyle}
          onClick={() => profileUpdateActions.setupdateProfile_Flag(true)}
        >
          {profileUpdateActions.updateText}
        </button>
      ) : null}
    </>
  );
};

export default Button;
