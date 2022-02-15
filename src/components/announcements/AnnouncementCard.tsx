import React from "react";
import cardImage from "../../assets/img/960x540.png";

interface AnnouncementCardProps {
  isLatest: boolean;
  authors: string;
}

export const AnnouncementCard = ({ isLatest, authors }: AnnouncementCardProps) => {
  return (
    <div className="announcement-card-container">
      <img
        draggable={false}
        src={cardImage}
        alt="placeholder"
        className="announcement-card-image"
      />
      <div className="card-stats-container">
        <p className="announcement-card-category"></p>
        {isLatest &&
          <span className="latest-batch">LATEST</span>
        }
        <em className="announcement-card-reading-time">8 min read</em>
      </div>
      <h1>Homework Companion Announcements and Updates</h1>
      <p className="announcement-card-authors">Written by {authors}</p>
      <em>Posted: 02/15/2022</em>
    </div>
  );
};