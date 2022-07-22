import React from "react";

interface SubjectProps {
  name: string;
}

export const Subject = ({ name }: SubjectProps) => {
  return (
    <li className="subject-list-item">{name}</li>
  );
};