import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {

  const navigate = useNavigate();

  window.api.subjects.get();

  /* useEffect(() => {
    ipcRenderer.on(Channels.GET_SUBJECTS_RESPONSE, (_event, sentSubjects: Subject[]) => {
      if (sentSubjects.length === 0) {
        navigate("/welcome");
      } else {
        navigate("/home");
      }
    });

    ipcRenderer.send(Channels.GET_SUBJECTS);

    return () => {
      ipcRenderer.removeAllListeners(Channels.GET_SUBJECTS_RESPONSE);
    };
  }, []); */
  

  return (
    <>
      <div className="spinner-container">
        <div className="spinner"></div>
        <h1 className="loading-header">Loading...</h1>
      </div>
    </>
  );
};