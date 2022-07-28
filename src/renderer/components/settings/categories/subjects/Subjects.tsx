import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Channels from "../../../../../common/channels";
import { NULL_SUBJECT } from "../../../../../common/constants";
import { AddSubjectModal } from "../../../modals/AddSubjectModal";
import { DeleteConfirmationModal } from "../../../modals/DeleteConfirmationModal";
import { Button } from "../../../utils/Button";
import { Subject } from "./Subject";

export const Subjects = () => {

  const [subjects, setSubjects] = useState([NULL_SUBJECT]);
  const [selectedSubject, setSelectedSubject] = useState(NULL_SUBJECT);
  const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
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
      <div className="subjects-container">
        <div className="subject-list-header">
          <p className="subject-list-header-line">Click to delete</p>
          <Button
            onClick={() => setAddSubjectModalOpen(true)}
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

        <AddSubjectModal
          isOpen={addSubjectModalOpen}
          setOpen={setAddSubjectModalOpen}
        />

        <DeleteConfirmationModal
          isOpen={deleteConfimModalOpen}
          setOpen={setDeleteConfimModalOpen}
          actionType="subject"
          data={selectedSubject}
        />
      </div>
    </>
  );
};