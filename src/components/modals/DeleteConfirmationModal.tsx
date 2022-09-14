/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { isEqual } from "lodash"; TODO: handle with preload 
import React, { SetStateAction, useState } from "react";
import { NULL_TASK } from "../../constants";
import { Subject } from "../settings/categories/subjects/Subject";
import { Button } from "../utils/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  actionType: "task" | "subject";
  data: Homework | Subject;
}

export const DeleteConfirmationModal = ({ isOpen, setOpen, actionType, data }: DeleteConfirmationModalProps) => {

  const placeholder = false;
  if (
    // TODO: check that correct type is supplied to 'data' this should be based on 'actionType'
    placeholder
  ) {
    throw new Error("Action type does not match type of received data");
  }

  const [target, _setTarget] = useState(actionType);

  const deleteHandler = () => {

    // FIXME: preload
    /* switch (actionType) {
      case "task":
        if (isEqual(data, NULL_TASK)) {
          return;
        }
        ipcRenderer.send(Channels.DELETE_TASK, data);
        break;
      case "subject":
        if (isEqual(data, NULL_SUBJECT)) {
          return;
        }
        ipcRenderer.send(Channels.DELETE_SUBJECT, data);
    }
    setOpen(false); */
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
              <h1 className="delete-task-title">Delete {target}?</h1>
              <p className="delete-task-description">Are you sure you want to delete this {target}?<br/>This action cannot be undone!</p>
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