import React from "react";

interface DropdownItemProps {
  value: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: () => void;
}

export const DropdownItem = ({ value, onClick }: DropdownItemProps) => {
  return (
    <div
      className="dropdown-item"
      onClick={() => {
        onClick();
      }}
    >
      {value}
    </div>
  );
};