import React from "react";
import cardImage from "../../assets/img/960x540.png";

interface AnnouncementCardProps {
  isLatest?: boolean;
}

export const AnnouncementCard = ({ isLatest }: AnnouncementCardProps) => {

  let css: string;
  if (isLatest) {
    css = "announcement-card-latest";
  } else {
    css = "announcement-card";
  }

  return (
    <div className={css}>
      <img
        className="announcement-card-image"
        src={cardImage}
        alt="placeholder"
        draggable={false}
      />
      <div className="announcement-card-meta">
        <div className="announcement-card-stats">
          <p className="announcement-card-category">UPDATE</p>
          <span className="announcement-card-latest-field">LATEST</span>
          <em className="announcement-card-read-time">12 min read</em>
        </div>
        <h1 className="announcement-card-title">Homework Companion Announcements</h1>
        <p className="announcement-card-authors">Homework Companion Development-Team</p>
        <em className="announcement-card-date">Posted: 02/15/2022</em>
      </div>
    </div>
  );
};