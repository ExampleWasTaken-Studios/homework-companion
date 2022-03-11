import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/styles.css";
import { getHTMLDateFormat } from "../../utils/DateUtils";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

export const CreateTaskModal = ({ isOpen, setOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const [prioritySelection, setPrioritySelection] = useState("Priority");
  const [subjectSelection, setSubjectSelection] = useState("Subject");

  return ReactDOM.createPortal(
    <>
      <div 
        className="modal-overlay"
        onClick={() => setOpen(false)}
      />
      <div className="modal">
        <div className="modal-children">
          <div className="create-task-modal-container">
            <h1 className="create-task-heading">Create new Task</h1>
            <div className="create-task-property-container">
              <input
                type="text"
                id="create-task-title"
                className="create-task-title"
                placeholder="Title"
                autoComplete="off"
              />

              <input
                type="date"
                id="create-task-date"
                className="create-task-date"
                defaultValue={getHTMLDateFormat()}
                min={getHTMLDateFormat()}
                max={getHTMLDateFormat(new Date(9999, 11, 31))}
              />

              <Dropdown
                selection={prioritySelection}
                className="create-task-priority"
              >
                <DropdownItem
                  value="Urgent"
                  setSelection={setPrioritySelection}
                  key={0}
                />
                <DropdownItem
                  value="High"
                  setSelection={setPrioritySelection}
                  key={1}
                />
                <DropdownItem
                  value="Normal"
                  setSelection={setPrioritySelection}
                  key={2}
                />
                <DropdownItem
                  value="Low"
                  setSelection={setPrioritySelection}
                  key={3}
                />
              </Dropdown>
              <Dropdown
                selection={subjectSelection}
                className="create-task-subject"
              >
                <DropdownItem
                  value="placeholder_subject_1"
                  setSelection={setSubjectSelection}
                  key={0}
                />
              </Dropdown>
            </div>

            <textarea
              id="create-task-content"
              rows={20}
              className="create-task-content"
              placeholder="Description"
              autoComplete="off"
            />
            <div className="modal-button-container">
              <Button
                className="cancel-task-button"
                onClick={() => setOpen(false)}
                isSecondary
              >
                Cancel
              </Button>
              <Button
                className="create-task-button"
                onClick={() => setOpen(false)}
              >Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("create-task-portal") as Element);
};