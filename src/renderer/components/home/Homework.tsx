import { ipcRenderer } from "electron";
import { isEqual } from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import CHANNELS from "../../../common/channels";
import { NULL_TASK } from "../../../common/constants";
import { getHTMLDateFormat } from "../../../common/utils/DateUtils";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";
import { CreateTaskModal } from "../utils/CreateTaskModal";
import { DeleteTaskConfirmationModalProps } from "../utils/DeleteTaskConfirmationModal";
import { Dropdown } from "../utils/Dropdown";
import { DropdownItem } from "../utils/DropdownItem";
import { Modal } from "../utils/Modal";
import { TaskModal } from "../utils/TaskModal";
import { ViewHeader } from "../utils/ViewHeader";
import { HomeworkListItem } from "./HomeworkListItem";

enum INPUT_DATA_ACTION_TYPES {
  CHANGE_TITLE = "CHANGE_TITLE",
  CHANGE_DATE = "CHANGE_DATE",
  CHANGE_PRIORITY = "CHANGE_PRIORITY",
  CHANGE_SUBJECT = "CHANGE_SUBJECT",
  CHANGE_CONTENT = "CHANGE_CONTENT",
  RESET_DATA = "RESET_DATA",
  RESET_TASK = "RESET_TASK"
}

interface InputDataAction {
  type: INPUT_DATA_ACTION_TYPES;
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
    case INPUT_DATA_ACTION_TYPES.RESET_TASK:
      return state;
    default:
      return state;
  }
};

let nextTaskId = 0;

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
      id: nextTaskId, // The next higher ID than the highest already existing ID should be stored in TaskStorage and be retrievable via IPC.
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
    ipcRenderer.send(CHANNELS.ADD_TASK, newTask);
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
  const [taskInputData, taskDispatch] = useReducer(inputDataReducer, { title: selectedTask.title, date: selectedTask.dueDate, priority: selectedTask.priority, subject: selectedTask.subject.name, content: selectedTask.content });
  const [taskInputIncomplete, setTaskInputIncomplete] = useState(false);
  const [taskModified, setTaskModified] = useState(false);
  

  const openDeleteConfirmationHandler = () => {
    setDeleteConfirmationModalOpen(true);
    setTaskModalOpen(false);
    setTaskToDelete(selectedTask);
  };

  const completeTaskHandler = () => {
    if (selectedTask.state === "open") {
      ipcRenderer.send(CHANNELS.COMPLETE_TASK, selectedTask);
      setTaskModalOpen(false);
    }
  };

  const incompleteTaskHandler = () => {
    if (selectedTask.state === "completed") {
      ipcRenderer.send(CHANNELS.INCOMPLETE_TASK, selectedTask);
      setTaskModalOpen(false);
    }
  };

  const updateTaskHandler = () => {
    if (taskInputData.title === "" || taskInputData.date === null || taskInputData.content === "") {
      setTaskInputIncomplete(true);
      return;
    }
    setTaskInputIncomplete(false);

    const updatedTask: Homework = {
      id: selectedTask.id,
      color: selectedTask.color,
      title: taskInputData.title,
      dueDate: taskInputData.date,
      subject: selectedTask.subject,
      priority: taskInputData.priority as Priority,
      important: selectedTask.important,
      state: selectedTask.state,
      content: taskInputData.content,
      metaInfo: selectedTask.metaInfo
    };
    ipcRenderer.send(CHANNELS.UPDATE_TASK, updatedTask);
    setTaskModalOpen(false);
    taskDispatch({ type: INPUT_DATA_ACTION_TYPES.RESET_DATA });
    setTaskModified(false);
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
    ipcRenderer.send(CHANNELS.DELETE_TASK, taskToDelete);
    setDeleteConfirmationModalOpen(false);
    setTaskModalOpen(false);
  };

  const deleteTaskAbortHandler = () => {
    setTaskToDelete(NULL_TASK);
    setTaskModalOpen(true);
    setDeleteConfirmationModalOpen(false);
  };
  /* Delete modal END */


  const homeworkListItemClickHandler = (newTask: Homework) => {
    setSelectedTask(newTask);
    setTaskModified(false);
    console.log("newTask:", newTask);
    setTaskModalOpen(true);
  };

  useEffect(() => {
    ipcRenderer.on(CHANNELS.GET_TASKS_RESPONSE, (_event, sentTasks) => {
      console.log("received reply");  
      console.log("received data:", sentTasks);
      setTasks(sentTasks);
      console.log("set state");
    });

    ipcRenderer.on(CHANNELS.GET_NEXT_TASK_ID_RESPONSE, (_event, sentId) => {
      console.log("recieved reply");
      console.log("received data:", sentId);
      nextTaskId = sentId;
    });

    return () => {
      ipcRenderer.removeAllListeners(CHANNELS.GET_TASKS_RESPONSE);
      ipcRenderer.removeAllListeners(CHANNELS.GET_NEXT_TASK_ID_RESPONSE);
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send(CHANNELS.GET_TASKS);
    console.log("sent task request");

    ipcRenderer.send(CHANNELS.GET_NEXT_TASK_ID);
    console.log("sent next ID request");
  }, [createTaskModalOpen, taskModalOpen, deleteConfirmationModalOpen]);

  useEffect(() => {
    ipcRenderer.send(CHANNELS.SHORTCUT_REGISTER_ESC);
    ipcRenderer.send(CHANNELS.SHORTCUT_REGISTER_ENTER);
    ipcRenderer.send(CHANNELS.SHORTCUT_REGISTER_CMD_CTRL_ENTER);

    ipcRenderer.on(CHANNELS.SHORTCUT_FIRED_ESC, () => {

      console.log("[SHORTCUT] ESC");
      console.log(createTaskModalOpen, taskModalOpen, deleteConfirmationModalOpen);

      if (createTaskModalOpen) {
        cancelHandler();
      }

      if (taskModalOpen) {
        setTaskModalOpen(false);
      }

      if (deleteConfirmationModalOpen) {
        deleteTaskAbortHandler();
      }
    });

    ipcRenderer.on(CHANNELS.SHORTCUT_FIRED_ENTER, () => {
      if (deleteConfirmationModalOpen) {
        deleteTaskHandler();
      }
    });

    ipcRenderer.on(CHANNELS.SHORTCUT_FIRED_CMD_CTRL_ENTER, () => {
      if (createTaskModalOpen) {
        submitHandler();
      }

      if (taskModalOpen) {
        if (taskModified) {
          console.info("[UPDATING TASK]");
          updateTaskHandler();
        } else {
          if (selectedTask.state === "open") {
            console.info("[COMPLETING TASK]");
            completeTaskHandler();
          } else if (selectedTask.state === "completed") {
            console.info("[INCOMPLETING TASK]");
            incompleteTaskHandler();
          }
        }
      }
    });

    return () => {
      ipcRenderer.removeAllListeners(CHANNELS.SHORTCUT_FIRED_ESC);
      ipcRenderer.removeAllListeners(CHANNELS.SHORTCUT_FIRED_ENTER);
      ipcRenderer.removeAllListeners(CHANNELS.SHORTCUT_UNREGISTER_CMD_CTRL_ENTER);

      ipcRenderer.send(CHANNELS.SHORTCUT_UNREGISTER_ESC);
      ipcRenderer.send(CHANNELS.SHORTCUT_UNREGISTER_ENTER);

    };
  }, [createTaskModalOpen, taskModalOpen, deleteConfirmationModalOpen]);
  
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
      
      <CreateTaskModal
        isOpen={createTaskModalOpen}
        setOpen={setCreateTaskModalOpen}
      />

      <TaskModal
        isOpen={taskModalOpen}
        setOpen={setTaskModalOpen}
        data={selectedTask}
      />

      <DeleteTaskConfirmationModalProps
        isOpen={deleteConfirmationModalOpen}
        setOpen={setDeleteConfirmationModalOpen}
        data={selectedTask}
      />
    </div>
  );
};