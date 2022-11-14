import React from "react";
import { ViewHeader } from "../utils/ViewHeader";
import { SettingsContent } from "./SettingsContent";
import { SettingsSidebar } from "./sidebar/SettingsSidebar";

export const SettingsWrapper = () => {
  return (
    <div className="settings-wrapper">
      <ViewHeader title="Settings" />
      <div className="settings-container">
        <SettingsSidebar />
        <SettingsContent />
      </div>
    </div>
  );
};
