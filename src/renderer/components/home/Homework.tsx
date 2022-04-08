import { ipcRenderer } from "electron";
import React, { useState } from "react";
import channels from "../../../common/channels";
import { Button } from "../utils/Button";
import { CreateTaskModal } from "../utils/CreateTaskModal";
import { TaskModal } from "../utils/TaskModal";
import { HomeworkListItem } from "./HomeworkListItem";
import { TimeframeSelector } from "./TimeframeSelector";

interface HomeworkProps {
  openTaskCreationModal: boolean;
  setOpenTaskCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
  openTaskModal: boolean;
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Homework = ({ openTaskCreationModal, setOpenTaskCreationModal, openTaskModal, setOpenTaskModal }: HomeworkProps) => {

  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeSelection>("all");
  
  const tasks: TaskSchema = null;

  ipcRenderer.invoke(channels.getTasks)
    .then();

  return (
    <div className="home-homework">
      <h2 className="container-title">Homework</h2>
      <ul>
        <TimeframeSelector
          firstSelectorContent="All"
          secondSelectorContent="Tomorrow"
          setState={setSelectedTimeframe}
        />

        <Button
          className="home-create-task-button"
          onClick={() => setOpenTaskCreationModal(true)}
        >
          Create Task
        </Button>
        
        <CreateTaskModal
          isOpen={openTaskCreationModal}
          setOpen={setOpenTaskCreationModal}
        />
      </ul>
      <div className="home-homework-list">
        {selectedTimeframe === "all" ? (
          <>
            {}
          </>          
        ) : (
          <HomeworkListItem 
            openTaskModal={openTaskModal}
            setOpenTaskModal={setOpenTaskModal}
            data={{ 
              id: 0,
              color: "green",
              title: "Placeholder_2",
              dueDate: new Date(),
              subject: { id: 0, name: "subject_2" },
              priority:"normal",
              important: false,
              state: "open",
              content: "This is a placeholder." 
            }}
          />
        )}
      </div>
    </div>
  );
  

};