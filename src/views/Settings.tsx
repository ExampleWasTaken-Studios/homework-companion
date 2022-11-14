import { SettingsWrapper } from "../components/settings/SettingsContainer";
import { Sidebar } from "../components/utils/Sidebar";
import { ViewHeader } from "../components/utils/ViewHeader";

export const Settings = () => {
  return (
    <div className="container">
      <Sidebar activeItem="settings" />
      <SettingsWrapper />
    </div>
  );
};
