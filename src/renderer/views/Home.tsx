import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Channels from "../../common/channels";
import { Homework } from "../components/home/Homework";
import { Sidebar } from "../components/utils/Sidebar";

export const Home = () => {

  const [subjectsExist, setSubjectsExist] = useState(false);

  useEffect(() => {
    ipcRenderer.send(Channels.GET_SUBJECTS);
    ipcRenderer.on(Channels.GET_SUBJECTS_RESPONSE, (_event, sentSubjects: Subject[]) => {
      if (sentSubjects.length > 0) {
        setSubjectsExist(true);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners(Channels.GET_SUBJECTS_RESPONSE);
    };
  });
  
  return (
    <div className="container">
      <Sidebar activeItem="home"/>
      <Homework/>
    </div>
  );
};