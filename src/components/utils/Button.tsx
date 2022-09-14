import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: string;
  isSecondary?: boolean;
}

export const Button = ({ className, onClick, children, isSecondary }: ButtonProps) => {
  let classes: string;

  if (isSecondary) {
    classes = `button-secondary ${className}`;
  } else {
    classes = `button ${className} `;
  }

  return (
    <a
      onClick={onClick}
      className={classes}
    >
      {children}
    </a>
  );
};