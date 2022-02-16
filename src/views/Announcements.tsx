import React from "react";
import { AnnouncementsContainer } from "../components/announcements/AnnouncementsContainer";
import { Sidebar } from "../components/utils/Sidebar";
import "../styles/styles.css";

export const Announcements = () => {
  return (
    <div className="container">
      <Sidebar activeItem="announcements" />
      <AnnouncementsContainer />
    </div>
  );
};