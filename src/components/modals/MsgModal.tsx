import React, { ReactNode, SetStateAction } from "react";
import { CloseIcon } from "../svg/CloseIcon";
import { Button } from "../utils/Button";

interface MsgModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  message: ReactNode;
}

export const MsgModal = ({ isOpen, setOpen, title, message }: MsgModalProps) => {

  return (
    <>
      {isOpen && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="msg-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="msg-modal-header">
              <h2 className="modal-title">{title}</h2>
              <CloseIcon onClick={() =>setOpen(false)} />
            </div>

            <div className="msg-content">
              {message}
            </div>

            <Button
              className="msg-modal-btn"
              onClick={() => setOpen(false)}
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
