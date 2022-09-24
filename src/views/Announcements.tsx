import { AnnouncementsContainer } from "../components/announcements/AnnouncementsContainer";
import { Sidebar } from "../components/utils/Sidebar";

export const Announcements = () => {
  return (
    <div className="container">
      <Sidebar activeItem="announcements" />
      <AnnouncementsContainer />
    </div>
  );
};
