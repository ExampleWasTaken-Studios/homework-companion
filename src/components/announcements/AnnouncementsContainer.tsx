import React from "react";
import { AnnouncementCard } from "./AnnouncementCard";

export const AnnouncementsContainer = () => {
  return (
    <div className="announcements">
      <h2 className="container-title">Announcements</h2>
      <div className="announcements-header-divider"></div>
      <div className="announcements-card-container">
        <AnnouncementCard />
      </div>
    </div>
  );
};