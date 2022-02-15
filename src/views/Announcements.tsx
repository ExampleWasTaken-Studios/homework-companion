import React from "react";
import { AnnouncementCard } from "../components/announcements/AnnouncementCard";
import { Sidebar } from "../components/utils/Sidebar";
import "../styles/styles.css";

export const Announcements = () => {
  return (
    <div className="container">
      <Sidebar activeItem="announcements" />
      <div className="announcement-container">
        <header className="announcement-header">
          <h2 className="container-title">Announcements</h2>
        </header>
        <div className="announcement-card-list">
          <AnnouncementCard
            authors="Homework Companion Development Team"
            isLatest
          />
        </div>
      </div>
    </div>
  );
};