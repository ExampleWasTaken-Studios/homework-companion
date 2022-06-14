import { ipcRenderer } from "electron";
import React, { SetStateAction, useEffect, useState } from "react";
import CHANNELS from "../../../common/channels";
import { getHTMLDateFormat } from "../../../common/utils/DateUtils";
import { CloseIcon } from "../svg/CloseIcon";

interface TaskModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: Homework;
}

export const TaskModal = ({ isOpen, setOpen, data }: TaskModalProps) => {

  const [title, setTitle] = useState("Oops! We've messed up! Please read the description!");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<Priority>("Normal");
  const [subject, setSubject] = useState<Subject>({ id: -1, name: "placeholder" });
  const [content, setContent] = useState("Looks like something went wrong on our end while we tried to load your task. :/");

  useEffect(() => {
    if (isOpen) {
      openHandler();
    }
  }, [isOpen]);

  const openHandler = () => {
    setTitle(data.title);
    setDueDate(data.dueDate);
    setPriority(data.priority);
    setSubject(data.subject);
    setContent(data.content);
  };

  const closeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);

    data = { ...data, title, dueDate, priority, subject, content };
    ipcRenderer.send(CHANNELS.UPDATE_TASK, data);
  };

  const dataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, sender: "title" | "dueDate" | "priority" | "subject" | "content") => {
    switch (sender) {
      case "title":
        setTitle(event.target.value);
        return;
      case "dueDate":
        setDueDate(new Date(event.target.value));
        return;
      case "priority":
        setPriority(event.target.value as Priority);
        return;
      case "subject":
        console.log("Subject loading not yet implemented");
        setSubject({ id: -1, name: event.target.value });
        return;
      case "content":
        setContent(event.target.value);
        return;
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="overlay"
          onClick={event => closeHandler(event)}
        >
          <div
            className="task-modal"
            onClick={event => event.stopPropagation()} // needed to prevent the modal from closing when clicked 
          >
  
            <div className="task-header">
              <h2 className="modal-title">Edit Task</h2>
              <CloseIcon onClick={event => closeHandler(event)}/>
            </div>
  
            <label className="label">
            TITLE
              <input
                type="text"
                className="input"
                autoComplete="off"
                defaultValue={data.title}
                onChange={event => dataChangeHandler(event, "title")}
              />
            </label>
  
            <label className="label">
            DUE DATE
              <input
                type="date"
                id="due-date"
                className="input due-date"
                autoComplete="off"
                defaultValue={getHTMLDateFormat(data.dueDate)}
                onChange={event => dataChangeHandler(event, "dueDate")}
              />
            </label>

            <div className="priority-subject-container">
              <label className="label inline">
                PRIORITY
                <select
                  className="input dropdown"
                  autoComplete="off"
                  defaultValue={data.priority}
                  onChange={event => dataChangeHandler(event, "priority")}
                > 
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </label>
  
              <label className="label inline">
                SUBJECT
                <select
                  className="input dropdown"
                  defaultValue={data.subject.name}
                  onChange={event => dataChangeHandler(event, "subject")}
                >
                  <option value="English">English</option>
                  <option value="German">German</option>
                  <option value={data.subject.name}>{data.subject.name}</option>
                </select>
              </label>
            </div>
  
            <label className="label">
            DESCRIPTION
              <textarea
                className="textarea"
                autoComplete="off"
                defaultValue={data.content}
                onChange={event => dataChangeHandler(event, "content")}
              />
            </label>
  
          </div>
        </div>
      )}
    </>
  );
};