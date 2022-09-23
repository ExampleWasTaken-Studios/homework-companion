import { ReactNode } from "react";

interface NewFeatureContainerProps {
  children: ReactNode;
}

export const NewFeatureContainer = ({ children }: NewFeatureContainerProps) => {

  if (!children) {
    return null;
  }

  return (
    <div className="changelog-container">
      <h2 className="changelog-new-feature-container-title">New Features</h2>
      <ul className="changelog-list">
        {children}  
      </ul>
    </div>
  );
};