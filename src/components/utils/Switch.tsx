import React, { SetStateAction } from "react";

interface SwitchProps {
  checked: boolean;
  setChecked: React.Dispatch<SetStateAction<boolean>>;
  onStateChange: () => void;
}

/**
 * Switch component.
 * The state of the component needs to live in the parent component.
 * @param checked First item of corresponding state.
 * @param setChecked Second item of corresponding state.
 * @param onStateChanged Called AFTER the state has changed.
 */
export const Switch = ({ checked, setChecked, onStateChange }: SwitchProps) => {

  const clickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setChecked(prevState => !prevState);
    onStateChange();
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
      onClick={event => clickHandler(event)}
      className={cssTrack}
    >
      <div
        onClick={event => clickHandler(event)}
        className={cssHandle}
      >

      </div>
    </div>
  );
};
