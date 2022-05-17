import { ipcRenderer } from "electron";
import { Action } from "history";
import React, { useEffect, useReducer, useState } from "react";
import channels from "../../../common/channels";
import { NULL_TASK } from "../../../common/constants";
import { getHTMLDateFormat } from "../../../common/utils/DateUtils";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";
import { Dropdown } from "../utils/Dropdown";
import { DropdownItem } from "../utils/DropdownItem";
import { Modal } from "../utils/Modal";
import { ViewHeader } from "../utils/ViewHeader";
import { HomeworkListItem } from "./HomeworkListItem";

enum INPUT_DATA_ACTION_TYPES {
  CHANGE_TITLE = "CHANGE_TITLE",
  CHANGE_DATE = "CHANGE_DATE",
  CHANGE_PRIORITY = "CHANGE_PRIORITY",
  CHANGE_SUBJECT = "CHANGE_SUBJECT",
  CHANGE_CONTENT = "CHANGE_CONTENT"
}

interface InputDataAction {
  type: INPUT_DATA_ACTION_TYPES,
  payload: string | Date;
}

interface InputDataState {
  title: string;
  date: Date;
  priority: string;
  subject: string;
  content: string;
}

const inputDataReducer = (state: InputDataState, action: InputDataAction): InputDataState => {
  switch (action.type) {
    case INPUT_DATA_ACTION_TYPES.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload as string
      };
    case INPUT_DATA_ACTION_TYPES.CHANGE_DATE:
      return {
        ...state,
        date: action.payload as Date
      };
    case INPUT_DATA_ACTION_TYPES.CHANGE_PRIORITY:
      return {
        ...state,
        priority: action.payload as string
      };
    case INPUT_DATA_ACTION_TYPES.CHANGE_SUBJECT:
      return {
        ...state,
        subject: action.payload as string
      };
    case INPUT_DATA_ACTION_TYPES.CHANGE_CONTENT:
      return {
        ...state,
        content: action.payload as string
      };
    default:
      return state;
  }
};

export const Homework = () => {

  const [tasks, setTasks] = useState([NULL_TASK]);

  // Create Task Modal
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createTaskModalPrio, setCreateTaskModalPrio] = useState("Priority");
  const [createTaskSubject, setCreateTaskSubject] = useState("Subject");
  const [createTaskInputIncomplete, setCreateTaskInputIncomplete] = useState(false);

  const [inputData, createTaskDispatch] = useReducer(inputDataReducer, { title: "", date: new Date(), priority: "Priority", subject: "Subject", content: "" });

  const submitHandler = () => {
    console.log("inputData:", inputData);
  };
  


  // Task Modal
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(NULL_TASK);


  const homeworkListItemClickHandler = (newTask: Homework) => {
    setSelectedTask(newTask);
    console.log("newTask:", newTask);
    setTaskModalOpen(true);
  };

  useEffect(() => {
    ipcRenderer.on(channels.getTaskResponse, (_event, sentTasks) => {
      console.log("received reply");  
      console.log("received data:", sentTasks);
      setTasks(sentTasks);
      console.log("set state");
    });

    return () => {
      ipcRenderer.removeAllListeners(channels.getTaskResponse);
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send(channels.getTasks);
    console.log("send task request");
  }, []);
  
  return (
    <div className="home-homework">
      <ViewHeader title="Homework">
        <Button
          className="home-create-task-button"
          onClick={() => setCreateTaskModalOpen(true)}
        >
          Create Task
        </Button>
      </ViewHeader>

      {/* Create new Task Modal */}
      <Modal
        isOpen={createTaskModalOpen}
        close={() => setCreateTaskModalOpen(false)}
      >
        <div className="create-task-container">
          <h1 className="create-task-header">
              Create new Task
          </h1>

          {createTaskInputIncomplete && (
            <Alert
              severity="error"
              content="At least one required field is missing!"
            />
          )}

          <div className="create-task-property-container">
            <input
              type="text"
              id="create-task-title"
              className="create-task-title"
              autoComplete="off"
              placeholder="Title"
              onChange={event => {
                createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_TITLE, payload: event.target.value });
              }}
            />
            <input
              type="date"
              id="create-task-datepicker"
              className="create-task-datepicker"
              defaultValue={getHTMLDateFormat()} // TODO: change to ipc
              min={getHTMLDateFormat()}
              max={getHTMLDateFormat(new Date(9999, 11, 31))}
              onChange={event => {
                createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_DATE, payload: event.target.value });
              }}
            />
            <Dropdown
              selection={createTaskModalPrio}
              className="create-task-prio"
            >
              <DropdownItem 
                value="Urgent"
                onClick={() => {
                  setCreateTaskModalPrio("Urgent");
                  createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_PRIORITY, payload: "urgent" });
                }}
              />
              <DropdownItem
                value="High"
                onClick={() => {
                  setCreateTaskModalPrio("High");
                  createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_PRIORITY, payload: "high" });
                }}
              />
              <DropdownItem
                value="Normal"
                onClick={() => {
                  setCreateTaskModalPrio("Normal");
                  createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_PRIORITY, payload: "normal" });
                }}
              />
              <DropdownItem
                value="Low"
                onClick={() => {
                  setCreateTaskModalPrio("Low");
                  createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_PRIORITY, payload: "low" });
                }}
              />
            </Dropdown>
            <Dropdown
              selection={createTaskSubject}
              className="create-task-subject"
            >
              <DropdownItem
                value="PLACEHOLDER_1"
                onClick={() => console.warn("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
              />
              <DropdownItem
                value="PLACEHOLDER_2"
                onClick={() => console.warn("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
              />
            </Dropdown>
          </div>
          <textarea
            id="create-task-content"
            rows={20}
            className="create-task-content"
            placeholder="Description"
            autoComplete="off"
            onChange={event => createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.CHANGE_CONTENT, payload: event.target.value })}
          />
          <div className="create-task-btn-container">
            <Button
              className="create-task-cancel-btn"
              onClick={() => null}
              isSecondary
            >
                Cancel
            </Button>
            <Button
              className="create-task-create-btn"
              onClick={submitHandler}
            >
                Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Task Modal */}
      <Modal
        isOpen={taskModalOpen}
        close={() => setTaskModalOpen(false)}
      >
        <div className="task-container">
          <input 
            className="task-title"
            defaultValue={selectedTask.title}
          />
          <div className="task-property-container">
            <input
              type="date"
              id="task-datepicker"
              className="task-datepicker"
              defaultValue={getHTMLDateFormat()} // TODO: change to ipc
              min={getHTMLDateFormat()}
              max={getHTMLDateFormat(new Date(9999, 11, 31))}
            />
            <Dropdown
              selection={selectedTask.priority.substring(0, 1).toUpperCase() + selectedTask.priority.substring(1)}
              className="task-prio"
            >
              <DropdownItem 
                value="Urgent"
                onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "urgent" }))}
              />
              <DropdownItem
                value="High"
                onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "high" }))}
              />
              <DropdownItem
                value="Normal"
                onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "normal" }))}
              />
              <DropdownItem
                value="Low"
                onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "low" }))}
              />
            </Dropdown>
            <Dropdown
              selection={selectedTask.subject.name}
              className="task-subject"
            >
              <DropdownItem
                value="PLACEHOLDER_1"
                onClick={() => console.log("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
              />
              <DropdownItem
                value="PLACEHOLDER_2"
                onClick={() => console.log("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
              />
            </Dropdown>
          </div>
          <textarea
            id="task-content"
            rows={20}
            className="task-content"
            placeholder="Description"
            autoComplete="off"
            defaultValue={selectedTask.content}
          />
          <div className="task-btn-container">
            <Button
              className="task-cancel-btn"
              isSecondary
              onClick={() => setCreateTaskModalOpen(false)}
            >
                Delete
            </Button>
            <Button
              className="task-create-btn"
              onClick={() => setCreateTaskModalOpen(false)}
            >
                Complete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="home-homework-list">
        {tasks.length > 0 ? tasks.map(current => (
          <HomeworkListItem
            onClick={homeworkListItemClickHandler}
            data={current}
            key={current.id}
          />
        )
        ) : (
          <p>emtpy state goes here</p>
        )}
      </div>
    </div>
  );
};