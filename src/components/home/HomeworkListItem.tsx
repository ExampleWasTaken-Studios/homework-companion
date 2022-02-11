import React from "react";
import { TaskModal } from "../utils/TaskModal";

interface HomeworkListItemProps {
  openTaskModal: boolean;
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    color: Color;
    title: string;
    dueDate: Date;
    subject: Subject;
    priority: Priority;
    important: boolean;
    state: TaskState;
    content: string;
  }
}

export const HomeworkListItem = ({ openTaskModal, setOpenTaskModal, data }: HomeworkListItemProps) => {
  const css = `home-homework-list-item-bull ${data.color}`;

  const clickHandler = () => {
    setOpenTaskModal(true);
  };

  return (
    <>
      <div
        className="home-homework-list-item"
        onClick={clickHandler}
      >
        <div className="home-homework-list-item-left-column">
          <span className={css}>&bull;</span>
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
          <p className="home-homework-list-item-date">{data.dueDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <TaskModal
        isOpen={openTaskModal}
        setOpen={setOpenTaskModal}
        data={{
          id: data.id,
          color: data.color,
          title: data.title,
          dueDate: data.dueDate,
          subject: data.subject,
          priority: data.priority,
          important: data.important,
          state: data.state,
          content: data.content
        }}
      />
    </>
  );
};