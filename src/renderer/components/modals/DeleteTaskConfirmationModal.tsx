import { ipcRenderer } from "electron";
import React, { SetStateAction } from "react";
import CHANNELS from "../../../common/channels";
import { Button } from "../utils/Button";

interface DeleteTaskConfirmationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: Homework;
}

export const DeleteTaskConfirmationModalProps = ({ isOpen, setOpen, data }: DeleteTaskConfirmationModalProps) => {

  const deleteHandler = () => {
    ipcRenderer.send(CHANNELS.DELETE_TASK, data);
    setOpen(false);
  };

  const abortHandler = () => {
    setOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        >

          <div
            className="delete-task-modal"
            onClick={event => event.stopPropagation()}
          >

            <div className="delete-content">
              <h1 className="delete-task-title">Delete Task</h1>
              <p className="delete-task-description">Are you sure you want to this Task?<br/>This action cannot be undone.</p>
            </div>

            <div className="delete-task-action-bar">
              <Button
                className="delete-btn"
                onClick={abortHandler}
                isSecondary
              >
                Cancel
              </Button>

              <Button
                className="delete-btn"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </div>

          </div>

        </div>
      )}
    </>
  );
};