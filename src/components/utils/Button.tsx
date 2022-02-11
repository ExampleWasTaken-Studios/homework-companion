import React from "react";
import "../../styles/styles.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: string;
  isSecondary?: boolean;
}

export const Button = ({ className, onClick, children, isSecondary }: ButtonProps) => {
  let classes: string;

  if (isSecondary) {
    classes = `${className} button-secondary`;
  } else {
    classes = `${className} button`;
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