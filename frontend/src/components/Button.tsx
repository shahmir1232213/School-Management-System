import React, { useState } from 'react';
import type { ProfileActions } from './Table/TableActionsBar';
import type { ProfileUpdateActions } from './Table/TableActionsBar';
import axios from 'axios';

interface CharacterStyles {
  bgColor: string;
  textColor: string;
}

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
  text
}) => {
  const { bgColor, textColor } = characterStyles;
  const setCreateProfile_Flag = profileActions?.setCreateProfile_Flag;
  const setupdateProfile_Flag = profileUpdateActions?.setupdateProfile_Flag;
  const updateText = profileUpdateActions?.updateText;

  const [isHovering, setIsHovering] = useState(false);
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

  const baseButtonStyles = `rounded-lg font-bold py-2 px-4 text-center h-[4rem] w-[9rem] cursor-pointer flex items-center justify-center 
    transition-all duration-300 transform hover:scale-105`;

  const getButtonStyle = (index: number) => ({
    backgroundColor: hoveringIndex === index ? '#74b0bb' : bgColor,
    color: hoveringIndex === index ? bgColor : textColor,    
   // color: textColor,
  });

  return (
    <>
      <div
        className={baseButtonStyles}
        style={getButtonStyle(0)}
        onMouseEnter={() => setHoveringIndex(0)}
        onMouseLeave={() => setHoveringIndex(null)}
        onClick={() => setCreateProfile_Flag?.(true)}
      >
        {text}
      </div>

      {nextMonth && (
        <div
          className={baseButtonStyles}
          style={getButtonStyle(1)}
          onMouseEnter={() => setHoveringIndex(1)}
          onMouseLeave={() => setHoveringIndex(null)}
          onClick={async () => {
            await axios.post('http://localhost:4000/student/feeStatusRenew');
          }}
        >
          {nextMonth}
        </div>
      )}

      {profileUpdateActions && (
        <div
          className={baseButtonStyles}
          style={getButtonStyle(2)}
          onMouseEnter={() => setHoveringIndex(2)}
          onMouseLeave={() => setHoveringIndex(null)}
          onClick={() => setupdateProfile_Flag?.(true)}
        >
          {updateText}
        </div>
      )}
    </>
  );
};

export default Button;
