import React, { SetStateAction, useEffect, useState } from "react";
import { getHTMLDateFormat } from "../../../common/utils/DateUtils";
import { CloseIcon } from "../svg/CloseIcon";

interface TaskModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  data: Homework;
}

export const TaskModal = ({ isOpen, setOpen, onOpen, onClose, data }: TaskModalProps) => {

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<Priority>("Normal");
  const [subject, setSubject] = useState<Subject>({ id: -1, name: "placeholder" });
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isOpen) {
      openHandler();
    }
  }, [isOpen]);

  const openHandler = () => {
    onOpen && onOpen();
  };

  const closeHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="overlay"
          onClick={event => closeHandler(event)}
        >
          <div className="task-modal">
  
            <div className="task-header">
              <h2 className="modal-title">Edit Task</h2>
              <CloseIcon onClick={event => closeHandler(event)}/>
            </div>
  
            <label className="task-title-label">
            TITLE
              <input
                type="text"
                className="input"
                autoComplete="off"
                defaultValue={data.title}
              />
            </label>
  
            <label className="due-date-label">
            DUE DATE
              <input
                type="date"
                name="due-date"
                id="due-date"
                className="input"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={getHTMLDateFormat(data.dueDate)}
              />
            </label>
  
            <label className="priority-label">
            PRIORITY
              <select
                name="priority"
                id="priority"
                className="input"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={data.priority}
              > 
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </label>
  
            <label className="subject-label">
            SUBJECT
              <select
                name="subject"
                id="subject"
                className="input"
              >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value={data.subject.name}>{data.subject.name}</option>
              </select>
            </label>
  
            <label className="content-label">
            DESCRIPTION
              <textarea
                name="content"
                id="content"
                className="textarea"
                autoComplete="off"
                autoCorrect="off"
                defaultValue={data.content}
              />
            </label>
  
          </div>
        </div>
      )}
    </>
  );
};