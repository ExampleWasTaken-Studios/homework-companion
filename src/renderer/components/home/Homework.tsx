import { ipcRenderer } from "electron";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import channels from "../../../common/channels";
import { NULL_TASK } from "../../../common/constants";
import { getHTMLDateFormat } from "../../utils/DateUtils";
import { Button } from "../utils/Button";
import { Dropdown } from "../utils/Dropdown";
import { DropdownItem } from "../utils/DropdownItem";
import { Modal } from "../utils/Modal";
import { HomeworkListItem } from "./HomeworkListItem";
import { TimeframeSelector } from "./TimeframeSelector";


export const Homework = () => {

  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeSelection>("all");

  const [tasks, setTasks] = useState([NULL_TASK]);

  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createTaskModalPrio, setCreateTaskModalPrio] = useState("Priority");
  const [createTaskSubject, setCreateTaskSubject] = useState("Subject");

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(NULL_TASK);

  const homeworkListItemClickHandler = (newTask: Homework) => {
    setSelectedTask(newTask);
    console.log("newTask:", newTask);
    setTaskModalOpen(true);
  };

  useEffect(() => {
    ipcRenderer.on(channels.getTaskResponse, (_event, sentTasks) => {
      console.log("received reply");  
      console.log("received data:", sentTasks);
      setTasks(sentTasks);
      console.log("set state");
    });

    return () => {
      ipcRenderer.removeAllListeners(channels.getTaskResponse);
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send(channels.getTasks);
    console.log("send task request");
  }, []);
  
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
          onClick={() => setCreateTaskModalOpen(true)}
        >
          Create Task
        </Button>

        {/* Create new Task Modal */}
        <Modal
          isOpen={createTaskModalOpen}
          close={() => setCreateTaskModalOpen(false)}
        >
          <div className="create-task-container">
            <h1 className="create-task-title">
              Create new Task
            </h1>
            <div className="create-task-property-container">
              <input
                type="date"
                id="create-task-datepicker"
                className="create-task-datepicker"
                defaultValue={getHTMLDateFormat()} // TODO: change to ipc
                min={getHTMLDateFormat()}
                max={getHTMLDateFormat(new Date(9999, 11, 31))}
              />
              <Dropdown
                selection={createTaskModalPrio}
                className="create-task-prio"
              >
                <DropdownItem 
                  value="Urgent"
                  onClick={() => setCreateTaskModalPrio("Urgent")}
                />
                <DropdownItem
                  value="High"
                  onClick={() => setCreateTaskModalPrio("High")}
                />
                <DropdownItem
                  value="Normal"
                  onClick={() => setCreateTaskModalPrio("Normal")}
                />
                <DropdownItem
                  value="Low"
                  onClick={() => setCreateTaskModalPrio("Low")}
                />
              </Dropdown>
              <Dropdown
                selection={createTaskSubject}
                className="create-task-subject"
              >
                <DropdownItem
                  value="PLACEHOLDER_1"
                  onClick={() => console.warn("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
                />
                <DropdownItem
                  value="PLACEHOLDER_2"
                  onClick={() => console.warn("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
                />
              </Dropdown>
            </div>
            <textarea
              id="create-task-content"
              rows={20}
              className="create-task-content"
              placeholder="Description"
              autoComplete="off"
              onChange={(event) => setSelectedTask(prevState => ({ ...prevState, content: event.target.value }))}
            />
            <div className="create-task-btn-container">
              <Button
                className="create-task-cancel-btn"
                isSecondary
                onClick={() => setTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="create-task-create-btn"
                onClick={() => setTaskModalOpen(false)}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>

        {/* Task Modal */}
        <Modal
          isOpen={taskModalOpen}
          close={() => setTaskModalOpen(false)}
        >
          <div className="task-container">
            <h1 className="task-title">
              Task Modal
            </h1>
            <div className="task-property-container">
              <input
                type="date"
                id="task-datepicker"
                className="task-datepicker"
                defaultValue={getHTMLDateFormat()} // TODO: change to ipc
                min={getHTMLDateFormat()}
                max={getHTMLDateFormat(new Date(9999, 11, 31))}
              />
              <Dropdown
                selection={selectedTask.priority.substring(0, 1).toUpperCase() + selectedTask.priority.substring(1)}
                className="task-prio"
              >
                <DropdownItem 
                  value="Urgent"
                  onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "urgent" }))}
                />
                <DropdownItem
                  value="High"
                  onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "high" }))}
                />
                <DropdownItem
                  value="Normal"
                  onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "normal" }))}
                />
                <DropdownItem
                  value="Low"
                  onClick={() => setSelectedTask(prevState => ({ ...prevState, priority: "low" }))}
                />
              </Dropdown>
              <Dropdown
                selection={selectedTask.subject.name}
                className="task-subject"
              >
                <DropdownItem
                  value="PLACEHOLDER_1"
                  onClick={() => console.log("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
                />
                <DropdownItem
                  value="PLACEHOLDER_2"
                  onClick={() => console.log("LOGIC FOR SUBJECT LOADING NOT YET IMPLEMENTED")}
                />
              </Dropdown>
            </div>
            <textarea
              id="task-content"
              rows={20}
              className="task-content"
              placeholder="Description"
              autoComplete="off"
              defaultValue={selectedTask.content}
            />
            <div className="task-btn-container">
              <Button
                className="task-cancel-btn"
                isSecondary
                onClick={() => setCreateTaskModalOpen(false)}
              >
                Delete
              </Button>
              <Button
                className="task-create-btn"
                onClick={() => setCreateTaskModalOpen(false)}
              >
                Complete
              </Button>
            </div>
          </div>
        </Modal>
      </ul>
      <div className="home-homework-list">
        {selectedTimeframe === "all" ? (
          <>
            {!isEqual(tasks[0], NULL_TASK) ? tasks.map(current => (
              <HomeworkListItem
                onClick={homeworkListItemClickHandler}
                data={current}
                key={current.id}
              />
            )
            ) : (
              <p>emtpy state goes here</p>
            )}
          </>
        ) : (
          <HomeworkListItem
            onClick={homeworkListItemClickHandler}
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