import React, { useState } from "react";
import { Homework } from "../components/home/Homework";
import { Sidebar } from "../components/utils/Sidebar";
import "../styles/styles.css";

export const Home = () => {
  
  return (
    <div className="container">
      <Sidebar activeItem="home"/>
      <Homework/>
    </div>
  );
};