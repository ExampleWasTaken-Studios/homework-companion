import React, { useState } from "react";
import { Homework } from "../components/home/Homework";
import { Sidebar } from "../components/utils/Sidebar";
import "../styles/styles.css";

export const Home = () => {

  let css: string;
  const [openTaskCreationModal, setOpenTaskCreationModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  if (openTaskCreationModal || openTaskModal) {
    css = "container-blur";
  } else {
    css = "container";
  }

  return (
    <div className={css}>
      <Sidebar activeItem="home"/>
      <Homework 
        openTaskCreationModal={openTaskCreationModal}
        setOpenTaskCreationModal={setOpenTaskCreationModal}
        openTaskModal={openTaskModal}
        setOpenTaskModal={setOpenTaskModal}
      />
    </div>
  );
};