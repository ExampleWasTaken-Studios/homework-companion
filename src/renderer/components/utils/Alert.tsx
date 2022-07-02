import React from "react";
import { ErrorIcon } from "../svg/ErrorIcon";

interface AlertProps {
  severity: "error" | "warn" | "success";
  content: string;
}

export const Alert = ({ severity, content }: AlertProps) => {
  return (
    <div className="alert">
      {severity === "error" ? (
        <ErrorIcon />
      ) : function() {throw new Error("Other severities than 'error' are not yet implemented!");}()}
      <div className="alert-content">{content}</div>
    </div>
  );
};