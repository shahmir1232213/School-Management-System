import React from 'react'
import Button from '../Button'
import SearchBar from './SearchBar'

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
  setupdateProfile_Flag?: (flag: boolean) => void;
  updateText:string
}

interface Prop {
  characterStyles: CharacterStyles;
  profileActions: ProfileActions;
  profileUpdateActions?: ProfileUpdateActions;
}
const TableActionsBar: React.FC<Prop> = ({ characterStyles, profileActions,additionalButton,profileUpdateActions,updateText }) => {
  return (
    <div className="flex ml-8 items-center flex-wrap gap-2 fixed w-[53.6rem] h-[13.6rem]">
     <Button
      characterStyles={characterStyles}
      profileActions={profileActions}
      nextMonth={characterStyles.nextMonth}
      profileUpdateActions={profileUpdateActions}
      updateText={updateText}
      text={`Add ${characterStyles.character}`}
    />
      <SearchBar character={characterStyles.character} />
    </div>
  );
};


export default TableActionsBar