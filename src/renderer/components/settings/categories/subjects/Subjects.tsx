import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Channels from "../../../../../common/channels";
import { NULL_SUBJECT } from "../../../../../common/constants";
import { DeleteConfirmationModal } from "../../../modals/DeleteConfirmationModal";
import { Button } from "../../../utils/Button";
import { Subject } from "./Subject";

export const Subjects = () => {

  const [subjects, setSubjects] = useState([NULL_SUBJECT]);
  const [selectedSubject, setSelectedSubject] = useState(NULL_SUBJECT);
  const [deleteConfimModalOpen, setDeleteConfimModalOpen] = useState(false);

  useEffect(() => {
    ipcRenderer.on(Channels.GET_SUBJECTS_RESPONSE, (_event, sentSubjects: Subject[]) => {
      setSubjects(sentSubjects);
    });
    ipcRenderer.send(Channels.GET_SUBJECTS);

    return () => {
      ipcRenderer.removeAllListeners(Channels.GET_SUBJECTS_RESPONSE);
    };
  }, [subjects, deleteConfimModalOpen]);

  return (
    <>
      <div className="subject-list-header">
        <p className="subject-list-header-line">Click the subject you would like to delete</p>
        <Button
          onClick={() => console.log("Create subject button clicked")}
          className="add-subject-btn"
        >
            Add Subject
        </Button>
      </div>
      <ul className="subject-list">
        {subjects.map(current => {
          return (
            <Subject
              key={current.id}
              data={current}
              onClick={() => {
                setSelectedSubject(current);
                setDeleteConfimModalOpen(true);
              }}
            />
          );
        })}
      </ul>

      <DeleteConfirmationModal
        isOpen={deleteConfimModalOpen}
        setOpen={setDeleteConfimModalOpen}
        actionType="subject"
        data={selectedSubject}
      />
    </>
  );
};