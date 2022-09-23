import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { NULL_SUBJECT, NULL_TASK } from "../../constants";
import { CloseIcon } from "../svg/CloseIcon";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";

interface TaskModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: Homework;
}

let openHandlerExecuted = false;

export const TaskModal = ({ isOpen, setOpen, data }: TaskModalProps) => {

  const [subjects, setSubjects] = useState([NULL_SUBJECT]);

  const [title, setTitle] = useState("Oops! We've messed up! Please read the description!");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<Priority>("Normal");
  const [subject, setSubject] = useState<Subject>({ id: -3, name: "Loading subject..." });
  const [content, setContent] = useState("Looks like something went wrong on our end while we tried to load your task. :/");
  const [state, setState] = useState<TaskState>("open");

  const [inputIncomplete, setInputIncomplete] = useState(false);

  const [buttonContent, setButtonContent] = useState<"Mark as Complete" | "Complete">("Mark as Complete");

  const openHandler = useCallback(async () => {

    console.log("openHandler");

    setSubjects(await window.api.subjects.get());

    setTitle(data.title);
    setDueDate(data.dueDate);
    setPriority(data.priority);
  
    const subjectById = await window.api.subjects.getById(data.subject); // get the subject by the id, stored on the task object
    console.log("subjectById", subjectById);
    if (subjectById.id < 0) { // check if the id is smaller than zero which would indicate that the subject is not valid (loading, null_subject, deleted subject)
      console.log("inside if");
      setSubject(subjects[0]); // if true set the subject to the first one subject in the array of all subjects
    } else {
      console.log("inside else");
      setSubject(subjectById); // if false set the subject to the one that is stored on the task object
    }

    setContent(data.content);
    setState(data.state);
    if (data.state === "open" || data.state === "overdue") {
      setButtonContent("Mark as Complete");
    } else {
      setButtonContent("Complete");
    }

    openHandlerExecuted = true;
  }, [data, subjects]);

  useEffect(() => {
    if (isOpen && !openHandlerExecuted) {
      openHandler();
    }
  }, [isOpen, openHandler]);

  const closeHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("closeHandler");

    if (title === "" || content === "") {
      setInputIncomplete(true);
      return;
    }

    data = { ...data, title: title, dueDate: dueDate, priority: priority, subject: await window.api.subjects.getId(subject), content, state };
    console.log("Data before save:", data);
    window.api.tasks.updateTask(data);

    setOpen(false);

    setTitle("Oops! We've messed up! Please read the description!");
    setDueDate(new Date());
    setPriority("Normal");
    setSubject({ id: -1, name: "placeholder" });
    setContent("Looks like something went wrong on our end while we tried to load your task. :/");
    setState("open");

    openHandlerExecuted = false;
  };

  const dataChangeHandler = (value: string, sender: "title" | "dueDate" | "priority" | "subject" | "content" | "state") => {
    switch (sender) {
      case "title":
        console.log("data changed to", value, "for sender", sender);
        setTitle(value);
        break;
      case "dueDate":
        setDueDate(new Date(value));
        break;
      case "priority":
        setPriority(value as Priority);
        break;
      case "subject":
        subjects.forEach(current => {
          if (current.name === value) {
            setSubject({ id: current.id, name: current.name });
          }
        });
        break;
      case "content":
        setContent(value);
        break;
      case "state":
        setState(value as TaskState);
        break;
    }
    if (title.length !== 0
      && title !== NULL_TASK.title
      && dueDate 
      && dueDate !== new Date(0)
      && subject.id !== NULL_TASK.id
      && content !== ""
      && content !== NULL_TASK.content) {
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
                value={title}
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
                defaultValue={window.api.util.getHTMLDateFormat(data.dueDate)}
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
                  value={subject.name}
                  onChange={event => {
                    dataChangeHandler(event.target.value, "subject");
                  }}
                >
                  {subjects.map(current => (
                    <option key={current.id}>{current.name}</option>
                  ))}
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