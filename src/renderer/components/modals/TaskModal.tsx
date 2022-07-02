import { ipcRenderer } from "electron";
import React, { SetStateAction, useEffect, useState } from "react";
import CHANNELS from "../../../common/channels";
import { getHTMLDateFormat } from "../../../common/utils/DateUtils";
import { CloseIcon } from "../svg/CloseIcon";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";

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
  const [state, setState] = useState<TaskState>("open");

  const [inputIncomplete, setInputIncomplete] = useState(false);

  const [buttonContent, setButtonContent] = useState<"Mark as Complete" | "Complete">("Mark as Complete");

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
    setState(data.state);
    if (data.state === "open" || data.state === "overdue") {
      setButtonContent("Mark as Complete");
    } else {
      setButtonContent("Complete");
    }
  };

  const closeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (title === "" || content === "") {
      setInputIncomplete(true);
      return;
    }
    
    data = { ...data, title, dueDate, priority, subject, content, state };
    ipcRenderer.send(CHANNELS.UPDATE_TASK, data);

    setOpen(false);

    setTitle("Oops! We've messed up! Please read the description!");
    setDueDate(new Date());
    setPriority("Normal");
    setSubject({ id: -1, name: "placeholder" });
    setContent("Looks like something went wrong on our end while we tried to load your task. :/");
    setState("open");
  };

  const dataChangeHandler = (value: string, sender: "title" | "dueDate" | "priority" | "subject" | "content" | "state") => {
    switch (sender) {
      case "title":
        setTitle(value);
        break;
      case "dueDate":
        setDueDate(new Date(value));
        break;
      case "priority":
        setPriority(value as Priority);
        break;
      case "subject":
        console.log("Subject loading not yet implemented");
        setSubject({ id: -1, name: value });
        break;
      case "content":
        setContent(value);
        break;
      case "state":
        setState(value as TaskState);
        break;
    }
    if (title.length !== 0
      && title !== "Oops! We've messed up! Please read the description!"
      && dueDate 
      && dueDate !== new Date(0)
      /* && subject.id !== -1 */ 
      && content !== ""
      && content !== "Looks like something went wrong on our end while we tried to load your task. :/") { // this is for UX to remove the incomple alert once all required fields are correctly entered
      setInputIncomplete(false);
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
                onChange={event => dataChangeHandler(event.target.value, "title")}
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
                onChange={event => dataChangeHandler(event.target.value, "dueDate")}
              />
            </label>

            <div className="priority-subject-container">
              <label className="label inline">
                PRIORITY
                <select
                  className="input dropdown"
                  autoComplete="off"
                  defaultValue={data.priority}
                  onChange={event => dataChangeHandler(event.target.value, "priority")}
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
                  onChange={event => dataChangeHandler(event.target.value, "subject")}
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
                onChange={event => dataChangeHandler(event.target.value, "content")}
              />
            </label>

            {inputIncomplete && (
              <Alert
                severity="error"
                content="At least one required field missing!"
              />
            )}

            <Button
              onClick={() => {
                if (state === "open" || state === "overdue") {
                  dataChangeHandler("completed", "state");
                  setButtonContent("Complete");
                } else if (state === "completed") {
                  dataChangeHandler("open", "state");
                  setButtonContent("Mark as Complete");
                }
              }}
              className="completion-btn"
            >
              {buttonContent}
            </Button>
  
          </div>
        </div>
      )}
    </>
  );
};