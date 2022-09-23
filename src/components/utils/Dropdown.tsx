import { ReactNode, useState } from "react";
import { DownChevronIcon } from "../svg/DownChevronIcon";

interface DropdownProps {
  selection: string;
  children: ReactNode;
  className: string;
}

/**
 * The selection state of this component must be lifted up into the parent component.
 * @param DropdownProps props {@link DropdownProps}
 * @returns Dropdown component
 */
export const Dropdown = ({ selection, children, className }: DropdownProps) => {
  
  const [open, setOpen] = useState(false);

  const classes = `${className} dropdown`;

  return (
    <div
      className={classes}
      onClick={() => setOpen(!open)}
    >
      <div className="dropdown-selection">
        {selection}
      </div>
      <DownChevronIcon />
      {open && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
};