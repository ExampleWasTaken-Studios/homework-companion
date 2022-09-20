import React from "react";
import { useEffect, useState } from "react";
import { NULL_TASK } from "../../constants";
import { CreateTaskModal } from "../modals/CreateTaskModal";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import { TaskModal } from "../modals/TaskModal";
import { Button } from "../utils/Button";
import { ViewHeader } from "../utils/ViewHeader";
import { HomeworkListItem } from "./HomeworkListItem";


export const Homework = () => {

  const [tasks, setTasks] = useState([NULL_TASK]);
  const [selectedTask, setSelectedTask] = useState(NULL_TASK);

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  const homeworkListItemClickHandler = (newTask: Homework) => {
    setSelectedTask(newTask);
    setTaskModalOpen(true);
  };

  useEffect(() => {
    window.api.tasks.get().then(tasks => {
      setTasks(tasks);
    });
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
            contextMenuDeleteHandler={() => {
              window.api.tasks.deleteTask(current);
              setTasks(tasks.filter(data => data.id !== current.id));
            }}
            contextMenuCompleteHandler={() => {
              const tempTasks = tasks.map((i): Homework => {
                if (i.id === current.id) {
                  const tempTask = { ...current, state: "completed" as TaskState };
                  window.api.tasks.updateTask(tempTask);
                  return tempTask;
                } else {
                  return i;
                }
              });
              setTasks(tempTasks);
            }}
            contextMenuIncompleteHandler={() => {
              const tempTasks = tasks.map((i): Homework => {
                if (i.id === current.id) {
                  const tempTask = { ...current, state: "open" as TaskState };
                  window.api.tasks.updateTask(tempTask);
                  return tempTask;
                } else {
                  return i;
                }
              });
            }}
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

      <DeleteConfirmationModal
        isOpen={deleteConfirmationModalOpen}
        setOpen={setDeleteConfirmationModalOpen}
        actionType="task"
        data={selectedTask}
      />
    </div>
  );
};