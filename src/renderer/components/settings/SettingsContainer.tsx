import React from "react";
import { ViewHeader } from "../utils/ViewHeader";
import { SettingsCategoryList } from "./SettingsCategoryList";
import { SettingsContent } from "./SettingsContent";

interface SettingsContainerProps {
  activeCategory: SettingsCategory;
}

export const SettingsContainer = ({ activeCategory }: SettingsContainerProps) => {

  return (
    <div className="settings">
      {/* <h2 className="container-title">Settings</h2> */}
      <ViewHeader title="Settings" />
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