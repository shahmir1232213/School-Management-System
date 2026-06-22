import Button from "../Button";
import SearchBar from "./SearchBar";

export interface CharacterStyles {
  character: string;
  bgColor: string;
  textColor: string;
  nextMonth?: string;
}

export interface ProfileActions {
  setCreateProfile_Flag: (flag: boolean) => void;
}

export interface ProfileUpdateActions {
  setupdateProfile_Flag: (flag: boolean) => void;
  updateText: string;
}

interface Props {
  characterStyles: CharacterStyles;
  profileActions: ProfileActions;
  profileUpdateActions?: ProfileUpdateActions;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const TableActionsBar: React.FC<Props> = ({
  characterStyles,
  profileActions,
  profileUpdateActions,
  searchValue,
  onSearchChange,
}) => {
  return (
    <div className="flex ml-8 items-center flex-wrap gap-2 fixed w-[53.6rem] h-[13.6rem]">
      <Button
        characterStyles={characterStyles}
        profileActions={profileActions}
        nextMonth={characterStyles.nextMonth}
        profileUpdateActions={profileUpdateActions}
        text={`Add ${characterStyles.character}`}
      />
      {searchValue !== undefined && onSearchChange ? (
        <SearchBar
          character={characterStyles.character}
          value={searchValue}
          onDebouncedChange={onSearchChange}
        />
      ) : null}
    </div>
  );
};

export default TableActionsBar;
