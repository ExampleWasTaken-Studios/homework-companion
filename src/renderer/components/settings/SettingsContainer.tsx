import React from "react";
import { SettingsCategoryList } from "./SettingsCategoryList";
import { SettingsContent } from "./SettingsContent";

interface SettingsContainerProps {
  activeCategory: SettingsCategory;
}

export const SettingsContainer = ({ activeCategory }: SettingsContainerProps) => {

  return (
    <div className="settings">
      <h2 className="container-title">Settings</h2>
      <div className="settings-header-divider"></div>
      <div className="settings-content-container">
        <SettingsCategoryList
          activeCategory={activeCategory}
        />
        <SettingsContent
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
};