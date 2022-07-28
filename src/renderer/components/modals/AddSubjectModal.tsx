import { ipcRenderer } from "electron";
import React, { SetStateAction, useEffect, useState } from "react";
import Channels from "../../../common/channels";
import { CloseIcon } from "../svg/CloseIcon";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";

interface AddSubjectModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

let nextSubjectId = 0;

export const AddSubjectModal = ({ isOpen, setOpen }: AddSubjectModalProps) => {
  const [subjectName, setSubjectName] = useState("");

  const [inputIncomplete, setInputIncomplete] = useState(false);

  const createSubject = () => {
    ipcRenderer.send(Channels.ADD_SUBJECT, {
      id: nextSubjectId,
      name: subjectName
    } as Subject);
  };

  const resetData = () => {
    setSubjectName("");
    setInputIncomplete(false);
  };

  const createHandler = () => {
    if (subjectName === "") {
      setInputIncomplete(true);
      return;
    }
    createSubject();
    setOpen(false);
    resetData();
  };

  const closeHandler = () => {
    setOpen(false);
    resetData();
  };

  useEffect(() => {
    ipcRenderer.on(Channels.GET_NEXT_SUBJECT_ID_RESPONSE, (_event, sentId: number) => {
      nextSubjectId = sentId;
    });
    ipcRenderer.send(Channels.GET_NEXT_SUBJECT_ID);

    return () => {
      ipcRenderer.removeAllListeners(Channels.GET_NEXT_SUBJECT_ID_RESPONSE);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="overlay"
          onClick={closeHandler}
        >
          <div 
            className="add-subject-modal"
            onClick={event => event.stopPropagation()}
          >
            { /* design of add subject modal modal */ }
            <div className="add-subject-modal-header">
              <h2 className="add-subject-modal-title">Add Subject</h2>
              <CloseIcon onClick={closeHandler} />
            </div>

            <label className="label">
              SUBJECT
              <input 
                type="text"
                className="input"
                autoComplete="off"
                autoFocus
                onChange={event => setSubjectName(event.target.value)}
              />
            </label>

            {inputIncomplete && (
              <Alert
                severity="error"
                content="Subject can't be nothing."
              />
            )}

            <div className="add-subject-modal-button-container">
              <Button
                className="add-subject-modal-btn"
                isSecondary
                onClick={closeHandler}
              >
                Cancel
              </Button>
              <Button
                className="add-subject-modal-btn"
                onClick={createHandler}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};