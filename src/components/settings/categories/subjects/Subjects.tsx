import React from "react";
import { useEffect, useState } from "react";
import { NULL_SUBJECT } from "../../../../constants";
import { AddSubjectModal } from "../../../modals/AddSubjectModal";
import { DeleteConfirmationModal } from "../../../modals/DeleteConfirmationModal";
import { MsgModal } from "../../../modals/MsgModal";
import { Button } from "../../../utils/Button";
import { Subject } from "./Subject";

export const Subjects = () => {

  const [subjects, setSubjects] = useState([NULL_SUBJECT]);
  const [selectedSubject, setSelectedSubject] = useState(NULL_SUBJECT);
  const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [deleteConfimModalOpen, setDeleteConfimModalOpen] = useState(false);

  useEffect(() => {
    window.api.subjects.get().then(subjects => setSubjects(subjects));
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
                  if(subjects.length < 2) {
                    setMsgModalOpen(true);
                    return;
                  }
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

        <MsgModal
          isOpen={msgModalOpen}
          setOpen={setMsgModalOpen}
          title="Hold on!"
          message={<p>You need at least one subject!<br/>Add a new one before deleting this one.</p>}
        />
      </div>
    </>
  );
};
