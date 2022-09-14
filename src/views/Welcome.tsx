import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/utils/Alert";
import { Button } from "../components/utils/Button";

export const Welcome = () => {

  const [subjectsTextArea, setSubjectsTextArea] = useState("");
  const [inputIncomplete, setInputIncomplete] = useState(false);

  const navigate = useNavigate();

  const submitHandler = () => {

    // FIXME: preload
    /* if (subjectsTextArea.length === 0) {
      setInputIncomplete(true);
      return;
    }

    const subjectNames = subjectsTextArea.split(",");
    const subjects: Subject[] = [];

    for (let i = 0; i < subjectNames.length; i++) {
      subjects.push({ id: i, name: subjectNames[i].trim() });
    }

    ipcRenderer.send(Channels.SET_SUBJECTS, subjects);
    navigate("/home"); // TODO: this needs to be removed as such operations should be carried out with <Link /> */
  };

  return (
    <div className="welcome">
      <div className="welcome-wrapper">
        <div className="welcome-header">
          <h1 className="welcome-title">Welcome&nbsp;to<br />Homework&nbsp;Companion!</h1>
          <h4 className="welcome-subtitle">We need to get some things out of the way before we start.</h4>
        </div>
        <div className="welcome-input">
          <label htmlFor="welcome-subject-textarea">Enter your subjects</label>
          <textarea
            name="welcome-subject-textarea"
            id="welcome-subject-textarea"
            className="welcome-subject-textarea"
            value={subjectsTextArea}
            onChange={event => {
              setInputIncomplete(false);
              setSubjectsTextArea(event.target.value);
            }}
          >
          </textarea>
          <h6 className="welcome-textarea-alt">Separate subjects with a comma</h6>
          {inputIncomplete && (
            <Alert 
              severity="error"
              content="You need to enter at least one subject!"
            />
          )}
          <Button 
            className="welcome-btn"
            onClick={submitHandler}
          >
              Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export const WelcomeComplete = () => {
  return (
    <div className="welcome-wrapper">
      <h1 className="welcome welcome-title">We&apos;re&nbsp;setting&nbsp;Homework&nbsp;Companion&nbsp;up&nbsp;for&nbsp;you. <br /> Hang&nbsp;tight!</h1>  
    </div>
  );
};