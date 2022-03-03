import React from "react";
import { SettingsContainer } from "../components/settings/SettingsContainer";
import { Sidebar } from "../components/utils/Sidebar";

interface SettingsProps {
  activeCategory: SettingsCategory;
}

export const Settings = ({ activeCategory }: SettingsProps) => {
  return (
    <div className="container">
      <Sidebar activeItem="settings" />
      <SettingsContainer activeCategory={activeCategory} />
    </div>
  );
};