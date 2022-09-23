import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ContextMenu } from "../contextmenu/ContextMenu";

interface HomeworkListItemProps {
  onClick: (newTask: Homework) => void;
  contextMenuDeleteHandler: () => void;
  contextMenuCompleteHandler: () => void;
  contextMenuIncompleteHandler: () => void;
  data: Homework;
}

export const HomeworkListItem = ({ onClick, contextMenuDeleteHandler, contextMenuCompleteHandler, contextMenuIncompleteHandler, data }: HomeworkListItemProps) => {
  const css = `home-homework-list-item-bull ${data.color}`;

  const parentRef = useRef<HTMLDivElement>(null);

  const [subject, setSubject] = useState<Subject>({ id: -3, name: "Loading subject..." });

  useEffect(() => {
    window.api.subjects.getById(data.subject).then(subject => {
      setSubject(subject);
    });
  }, [data.subject]);

  return (
    <>
      <div
        className="home-homework-list-item"
        ref={parentRef}
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
            <p className="home-homework-list-item-subject">{subject.name}</p>
          </div>
        </div>
        <div className="home-homework-list-item-right-column">
          {<p className="home-homework-list-item-date">{new Date(data.dueDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>}
        </div>
      </div>

      {data.state === "completed" ? (
        <ContextMenu
          parentRef={parentRef}
          items={[
            {
              id: 0,
              type: "Delete",
              clickHandler: contextMenuDeleteHandler
            },
            {
              id: 1,
              type: "Mark as Incomplete",
              clickHandler: contextMenuIncompleteHandler
            }
          ]}
        />
      ) : (
        <ContextMenu
          parentRef={parentRef}
          items={[
            {
              id: 0,
              type: "Delete",
              clickHandler: contextMenuDeleteHandler
            },
            {
              id: 1,
              type: "Mark as Complete",
              clickHandler: contextMenuCompleteHandler
            }
          ]}
        />
      )}
    </>
  );
};