import { ipcRenderer } from "electron";
import { isEqual } from "lodash";
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
  CHANGE_CONTENT = "CHANGE_CONTENT",
  RESET_DATA = "RESET_DATA"
}

interface InputDataAction {
  type: INPUT_DATA_ACTION_TYPES,
  payload?: string | Date;
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
    case INPUT_DATA_ACTION_TYPES.RESET_DATA:
      return {
        title: "",
        date: new Date(0),
        priority: "Priority",
        subject: "Subject",
        content: ""
      };
    default:
      return state;
  }
};

export const Homework = () => {

  const [tasks, setTasks] = useState([NULL_TASK]);

  /* Create task modal START */
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createTaskModalPrio, setCreateTaskModalPrio] = useState("Priority");
  const [createTaskSubject, setCreateTaskSubject] = useState("Subject");
  const [createTaskInputIncomplete, setCreateTaskInputIncomplete] = useState(false);

  const [inputData, createTaskDispatch] = useReducer(inputDataReducer, { title: "", date: new Date(), priority: "Priority", subject: "Subject", content: "" });

  const submitHandler = () => {
    console.log("debug: submitHandler");
    if (inputData.title === "" 
          || inputData.date === null
          || inputData.priority === "Priority"
          /* || inputData.subject === "Subject" */
          || inputData.content === ""
    ) {
      setCreateTaskInputIncomplete(true);
      createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.RESET_DATA });
      return;
    }

    setCreateTaskInputIncomplete(false);
    // store task
    const newTask: Homework = {
      id: 999, // The next higher ID than the highest already existing ID should be stored in TaskStorage and be retrievable via IPC.
      title: inputData.title,
      color: "blue",
      dueDate: inputData.date,
      subject: {
        id: -1,
        name: "GEN_NULL_SUBJECT"
      },
      priority: inputData.priority as Priority,
      important: false,
      state: "open",
      content: inputData.content,
      metaInfo: {
        dateCreated: new Date()
      }
    };
    console.log("newTask", newTask);
    ipcRenderer.send(channels.addTask, newTask);
    setCreateTaskModalOpen(false);
  };

  const cancelHandler = () => {
    setCreateTaskModalOpen(false);
    setCreateTaskInputIncomplete(false);
    createTaskDispatch({ type: INPUT_DATA_ACTION_TYPES.RESET_DATA });
  };
  /* Create task modal END */
  


  /* Task modal START */
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  // Task that is currently displayed in the task modal
  const [selectedTask, setSelectedTask] = useState(NULL_TASK);

  const completeTaskHandler = () => {
    if (selectedTask.state === "open") {
      ipcRenderer.send(channels.completeTask, selectedTask);
      setTaskModalOpen(false);
    }
  };

  const incompleteTaskHandler = () => {
    if (selectedTask.state === "completed") {
      ipcRenderer.send(channels.incompleteTask, selectedTask);
      setTaskModalOpen(false);
    }
  };
  /* Task modal END */

  /* Delete modal START */
  const [taskToDelete, setTaskToDelete] = useState(NULL_TASK);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  const deleteTaskHandler = () => {
    if (isEqual(taskToDelete, NULL_TASK)) {
      setDeleteConfirmationModalOpen(false);
      return;
    }
    console.log("sending request to delete task:", taskToDelete);
    ipcRenderer.send(channels.deleteTask, taskToDelete);
    setDeleteConfirmationModalOpen(false);
    setTaskModalOpen(false);
  };
  /* Delete modal END */



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
  }, [createTaskModalOpen, taskModalOpen]);
  
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
              onClick={() => cancelHandler()}
              isSecondary
            >
                Cancel
            </Button>
            <Button
              className="create-task-create-btn"
              onClick={() => submitHandler()}
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
              onClick={() => {
                setDeleteConfirmationModalOpen(true);
                setTaskToDelete(selectedTask);
              }}
            >
                Delete
            </Button>
            {selectedTask.state === "open" ? (
              <Button
                className="task-create-btn"
                onClick={completeTaskHandler}
              >
                Mark as Complete
              </Button>
            ) : (
              <Button
                className="task-create-btn"
                onClick={incompleteTaskHandler}
              >
                Completed
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteConfirmationModalOpen}
        close={() => setDeleteConfirmationModalOpen(false)}
      >
        <div className="delete-task-confirmation-modal">
          <div className="delete-task-content">
            <h1 className="delete-task-title">Delete Task</h1>
            <p className="delete-task-description">Are you sure you want to delete that Task?<br/>This action cannot be undone.</p>
          </div>
          <div className="delete-task-action-bar">
            <Button
              onClick={() => {
                setTaskToDelete(NULL_TASK);
                setDeleteConfirmationModalOpen(false);
              }}
              isSecondary
              className="delete-task-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteTaskHandler()}
              className="delete-task-delete-btn"
            >
              Delete Task
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