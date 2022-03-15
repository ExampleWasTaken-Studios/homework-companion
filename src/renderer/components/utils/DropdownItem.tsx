import React from "react";
import "../../styles/styles.css";

interface DropdownItemProps {
  value: string;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
}


export const DropdownItem = ({ value, setSelection }: DropdownItemProps) => {
  return (
    <div
      className="dropdown-item"
      onClick={() => {console.log("fired"); setSelection(value);}}
    >
      {value}
    </div>
  );
};