import { ipcRenderer } from "electron";
import { identity } from "lodash";
import React, { SetStateAction, useEffect, useState } from "react";
import CHANNELS from "../../../common/channels";
import { CloseIcon } from "../svg/CloseIcon";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";


interface CreateTaskModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

let nextTaskId = 0;

export const CreateTaskModal = ({ isOpen, setOpen }: CreateTaskModalProps) => {

  const [title, setTitle] = useState("Oops! We've messed up! Please read the description!");
  const [dueDate, setDueDate] = useState(new Date(0));
  const [priority, setPriority] = useState<Priority>("Normal");
  const [subject, setSubject] = useState<Subject>({ id: -1, name: "placeholder" });
  const [content, setContent] = useState("Looks like something went wrong on our end while we tried to load your task. :/");

  const [inputIncomplete, setInputIncomplete] = useState(false);

  useEffect(() => {
    ipcRenderer.send(CHANNELS.GET_NEXT_TASK_ID);
    ipcRenderer.on(CHANNELS.GET_TASKS_RESPONSE, (_event, sentId) => {
      nextTaskId = sentId;
    });

    return () => {
      ipcRenderer.removeAllListeners(CHANNELS.GET_NEXT_TASK_ID_RESPONSE);
    };
  });

  const closeHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };

  const dataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, sender: "title" | "dueDate" | "priority" | "subject" | "content") => {
    switch (sender) {
      case "title":
        setTitle(event.target.value);
        break;
      case "dueDate":
        setDueDate(new Date(event.target.value));
        break;
      case "priority":
        setPriority(event.target.value as Priority);
        break;
      case "subject":
        console.log("Subject loading not yet implemented");
        setSubject({ id: -1, name: event.target.value });
        break;
      case "content":
        setContent(event.target.value);
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

  const generateTask = (title: string, dueDate: Date, priority: Priority, subject: Subject, content: string) => {

    const task: Homework = {
      id: nextTaskId,
      color: "blue",
      title: title,
      dueDate: dueDate,
      priority: priority,
      subject: subject,
      important: false,
      state: "open",
      content: content,
      metaInfo: {
        dateCreated: new Date()
      }
    };

    return task;
  };

  const submitTaskHandler = () => {

    if (title.length === 0
          || title === "Oops! We've messed up! Please read the description!"
          || !dueDate 
          || dueDate === new Date(0)
          /* || subject.id === -1 */ 
          || content === ""
          || content === "Looks like something went wrong on our end while we tried to load your task. :/") {
      setInputIncomplete(true);
      return;
    } else {
      setInputIncomplete(false);
    }

    ipcRenderer.send(CHANNELS.ADD_TASK, generateTask(title, dueDate, priority, subject, content));
    setOpen(false);
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
              <h2 className="modal-title">Create new Task</h2>
              <CloseIcon onClick={event => closeHandler(event)} />
            </div>

            <label className="label">
              TITLE
              <input
                type="text"
                className="input"
                autoComplete="off"
                autoFocus
                onChange={event => dataChangeHandler(event, "title")}
              />
            </label>

            <label className="label">
              DUE DATE
              <input
                type="date"
                className="input due-date"
                autoComplete="off"
                onChange={event => dataChangeHandler(event, "dueDate")}
              />
            </label>

            <div className="priority-subject-container">
              <label className="label inline">
                PRIORITY
                <select
                  className="input dropdown"
                  autoComplete="off"
                  defaultValue="Normal"
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
                  onChange={event => dataChangeHandler(event, "subject")}
                >
                  <option value="English">English</option>
                  <option value="German">German</option>
                </select>
              </label>
            </div>
  
            <label className="label">
            DESCRIPTION
              <textarea
                className="textarea"
                autoComplete="off"
                onChange={event => dataChangeHandler(event, "content")}
              />
            </label>

            {inputIncomplete && (
              <Alert
                severity="error"
                content="At least one required field is missing!"
              />
            )}

            <div className="button-container">
              <Button
                onClick={() => setOpen(false)}
                className="create-task-btn"
                isSecondary
              >
                Cancel
              </Button>

              <Button
                onClick={() => submitTaskHandler()}
                className="create-task-btn"
              >
                Create Task
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};