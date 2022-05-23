import React from "react";

interface HomeworkListItemProps {
  onClick: (newTask: Homework) => void;
  data: Homework;
}

export const HomeworkListItem = ({ onClick, data }: HomeworkListItemProps) => {
  const css = `home-homework-list-item-bull ${data.color}`;

  return (
    <>
      <div
        className="home-homework-list-item"
        onClick={() => onClick(data)}
      >
        <div className="home-homework-list-item-left-column">
          <span 
            className={css}
          >
            &bull;
          </span>
        </div>
        <div className="home-homework-list-item-center-column">
          <div className="home-homework-list-item-top-line">
            <p className="home-homework-list-item-title">{data.title}</p>
          </div>
          <div className="home-homework-list-item-bottom-line">
            <p className="home-homework-list-item-subject">{data.subject.name}</p>
          </div>
        </div>
        <div className="home-homework-list-item-right-column">
          {<p className="home-homework-list-item-date">{new Date(data.dueDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>}
        </div>
      </div>
    </>
  );
};