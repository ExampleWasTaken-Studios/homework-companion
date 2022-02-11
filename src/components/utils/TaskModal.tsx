import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getHTMLDateFormat } from "../../utils/DateUtils";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

interface TaskModalProps {
  isOpen?: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    color: Color;
    title: string;
    dueDate: Date;
    subject: Subject;
    priority: Priority;
    important: boolean;
    state: TaskState;
    content: string;
  };
}

export const TaskModal = ({ isOpen, setOpen, data }: TaskModalProps) => {
  const [prioritySelection, setPrioritySelection] = useState(data.priority.charAt(0).toUpperCase() + data.priority.substring(1));
  const [subjectSelection, setSubjectSelection] = useState(data.subject.name);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-overlay"
        onClick={() => setOpen(false)}
      >
        <div
          className="modal"
          onClick={event => event.stopPropagation()} // needs investigation as to why that is needed because CreateTaskModal.tsx does not require it
        >
          <div className="task-modal-container">
            <div className="task-header">
              <input
                type="text"
                name="task-title"
                placeholder="Title" 
                autoComplete="off" 
                defaultValue={data.title}
                id="task-title"
                className="task-title"
              />
            </div>
            <div className="task-property-container">
              <input
                type="date"
                name="task-due-date"
                id="task-due-date" 
                className="task-due-date"
                defaultValue={getHTMLDateFormat(data.dueDate)}
                min={getHTMLDateFormat()}
                max={getHTMLDateFormat(new Date(9999, 11, 31))}
              />
              <Dropdown 
                selection={prioritySelection}
                className="task-priority"
              >
                <DropdownItem 
                  setSelection={setPrioritySelection}
                  value="Urgent"
                />
                <DropdownItem 
                  setSelection={setPrioritySelection}
                  value="High"
                />
                <DropdownItem
                  setSelection={setPrioritySelection}
                  value="Normal"
                />
                <DropdownItem
                  setSelection={setPrioritySelection}
                  value="Low"
                />
              </Dropdown>
              <Dropdown 
                selection={subjectSelection}
                className="task-subject"
              >
                {/* TODO: add logic to load all subjects from disk */}
                <DropdownItem
                  setSelection={setSubjectSelection}
                  value="Placeholder"
                />
              </Dropdown>
            </div>
            <textarea
              name="task-content"
              id="task-content"
              className="task-content"
              rows={20}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("task-portal") as Element
  );
};