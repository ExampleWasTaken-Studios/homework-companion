import React, { ReactNode } from "react";

interface FixesContainerProps {
  children: ReactNode;
}

export const FixContainer = ({ children }: FixesContainerProps) => {
  return (
    <div className="changelog-container">
      <h2 className="changelog-fix-container-title">Fixes</h2>  
      <ul className="changelog-list">
        {children}
      </ul>
    </div>
  );
};