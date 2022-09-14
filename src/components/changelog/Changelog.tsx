import React, { SetStateAction } from "react";
import ReactDOM from "react-dom";
import { FixContainer } from "./FixContainer";
import { NewFeatureContainer } from "./NewFeatureContainer";
import { NewItem } from "./NewItem";

interface ChangelogProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const Changelog = ({ isOpen, setOpen }: ChangelogProps) => {

  if (!isOpen) {
    return null;
  }

  const rootElement = (document.getElementById("root") as HTMLDivElement);
  rootElement.style.filter = "blur(3px)";

  const modalCloseHandler = () => {
    setOpen(false);
    rootElement.removeAttribute("style");
  };

  return ReactDOM.createPortal(
    <>
      <div 
        className="modal-overlay"
        onClick={modalCloseHandler}
      />
      <div className="changelog-modal">
        <div className="changelog-modal-container">
          <div className="changelog-header">
            <div className="changelog-heading">
              <h1 className="changelog-title">Changelog</h1>
              <p className="changelog-date">{/* new Date(day of release).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}) */"ENTER DATE HERE"}</p>
            </div>
            <div className="changelog-close-btn-container">
              <div 
                className="changelog-close-btn"
                onClick={modalCloseHandler}
              >
                  X
              </div>  
            </div> {/* TODO: Maybe change to svg? */}
          </div>

          <div className="changelog-items">
            <NewFeatureContainer>
              <NewItem
                name="Placeholder"
                description="This is a placeholder to demonstrate the purpose of this component."
              />
            </NewFeatureContainer>

            <FixContainer>
              <NewItem
                name="Placeholder"
                description="This is a placeholder to demonstrate the purpose of this component."
              />
            </FixContainer>
          </div>
        </div>
      </div>
      
    </>,
    document.getElementById("changelog-portal") as Element);
};