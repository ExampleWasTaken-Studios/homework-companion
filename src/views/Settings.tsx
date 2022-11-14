import { SettingsContent } from "../components/settings/SettingsContent";
import { Sidebar } from "../components/utils/Sidebar";

export const Settings = () => {
  return (
    <div className="container">
      <Sidebar activeItem="settings" />
      <SettingsContent />
    </div>
  );
};
