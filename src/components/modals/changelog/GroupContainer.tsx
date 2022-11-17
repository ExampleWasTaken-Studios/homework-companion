import { ReactNode } from "react";

interface GroupContainerProps {
  type: "new-features" | "bug-fixes";
  children: ReactNode;
}

export const GroupContainer = ({ type, children }: GroupContainerProps) => {

  if (!children) {
    return null;
  }

  return (
    <div className="group-container">
      {type === "new-features" ? (
        <h2 className="group-type-new-feature-container-title">New&nbsp;Features</h2>
      ) : (
        <h2 className="group-type-bug-fixes-container-title">Bug Fixes</h2>
      )}
      <ul className="group-list">
        {children}
      </ul>
    </div>
  );
};
