import React, { SetStateAction, useEffect, useState } from "react";
import { CloseIcon } from "../svg/CloseIcon";
import { Alert } from "../utils/Alert";
import { Button } from "../utils/Button";

interface AddSubjectModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
let nextSubjectId = 0;

export const AddSubjectModal = ({ isOpen, setOpen }: AddSubjectModalProps) => {
  const [subjectName, setSubjectName] = useState("");

  const [inputIncomplete, setInputIncomplete] = useState(false);

  const createSubject = () => {
    window.api.subjects.addSubject({ id: nextSubjectId, name: subjectName });
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
    window.api.subjects.getNextId().then(sentId => {
      nextSubjectId = sentId;
    });
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