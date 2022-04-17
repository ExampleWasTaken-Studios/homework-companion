import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, close, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  
  return ReactDOM.createPortal(
    <>
      <div 
        className="modal-overlay"
        onClick={() => close()}
      >
        <div
          className="modal"
          onClick={event => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
    , document.getElementById("portal") as HTMLDivElement
  );
};