import React, { SetStateAction } from "react";

interface SwitchProps {
  checked: boolean;
  setChecked: React.Dispatch<SetStateAction<boolean>>;
}

/**
 * Switch component.  
 * The state of the component needs to live in the parent component.
 * @param checked First item of corresponding state.
 * @param setChecked Second item of corresponding state.
 */
export const Switch = ({ checked, setChecked }: SwitchProps) => {

  const clickHandler = () => {
    setChecked(!checked);
  };

  let cssTrack;
  let cssHandle;
  if (checked) {
    cssTrack = "switch-track-on";
    cssHandle = "switch-handle-on";
  } else {
    cssTrack = "switch-track-off";
    cssHandle = "switch-handle-off";
  }

  return (
    <div 
      onClick={clickHandler}
      className={cssTrack}  
    >
      <div
        onClick={clickHandler}
        className={cssHandle}
      >

      </div>
    </div>
  );
};