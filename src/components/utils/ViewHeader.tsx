import React, { ReactNode } from "react";

/**
 * @title The title of the component.
 * @children Children of this component.
 */
interface ViewHeaderProps {
  title: string;
  children?: ReactNode;
}

/**
 * The header each view has. It takes the title of the view as a prop and optional children that will be displayed on the right side of the component.
 * @param props {@link ViewHeaderProps}
 */
export const ViewHeader = ({ title, children }: ViewHeaderProps) => {
  return (
    <div className="view-header">
      <h2 className="view-header-title">{title}</h2>
      <div className="view-header-children">{children}</div>
    </div>
  );
};