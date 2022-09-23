import { AnnouncementCard } from "./AnnouncementCard";

export const AnnouncementsContainer = () => {
  return (
    <div className="announcements">
      <h2 className="container-title">Announcements</h2>
      <div className="announcements-header-divider"></div>
      <div className="announcements-card-container">
        <div className="announcements-grid-container">
          <AnnouncementCard
            isLatest
            title="test_1"
          />
          <AnnouncementCard title="test_2"/>
          <AnnouncementCard title="test_3" />
          <AnnouncementCard title="test_4" />
        </div>
      </div>
    </div>
  );
};
