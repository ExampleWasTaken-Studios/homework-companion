import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/utils/Button";

export const Welcome = () => {

  const navigate = useNavigate();

  useEffect(() => {
    //navigate("/");
  }, []);

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
          >
          </textarea>
          <h6 className="welcome-textarea-alt">Separate subjects with a comma</h6>
          <Button 
            className="welcome-btn"
            onClick={() => null}
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