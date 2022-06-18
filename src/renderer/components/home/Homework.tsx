import { ipcRenderer } from "electron";
import { isEqual } from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import CHANNELS from "../../../common/channels";
import { NULL_TASK } from "../../../common/constants";
import { Button } from "../utils/Button";
import { CreateTaskModal } from "../modals/CreateTaskModal";
import { DeleteTaskConfirmationModalProps } from "../modals/DeleteTaskConfirmationModal";
import { TaskModal } from "../modals/TaskModal";
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



export const Homework = () => {

  const [tasks, setTasks] = useState([NULL_TASK]);
  const [selectedTask, setSelectedTask] = useState(NULL_TASK);

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  const homeworkListItemClickHandler = (newTask: Homework) => {
    setSelectedTask(newTask);
    console.log("newTask:", newTask);
    setTaskModalOpen(true);
  };

  useEffect(() => {
    ipcRenderer.send(CHANNELS.GET_TASKS);
    ipcRenderer.on(CHANNELS.GET_TASKS_RESPONSE, (_event, sentTasks) => {
      console.log("received reply");  
      console.log("received data:", sentTasks);
      setTasks(sentTasks);
      console.log("set state");
    });

    return () => {
      ipcRenderer.removeAllListeners(CHANNELS.GET_TASKS_RESPONSE);
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