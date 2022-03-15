import React from "react";
import { About } from "./categories/About";
import { Customization } from "./categories/Customization";
import { General } from "./categories/General";

interface SettingsContentProps {
  activeCategory: SettingsCategory;
}

export const SettingsContent = ({ activeCategory }: SettingsContentProps) => {
  return (
    <div className="settings-content">
      {activeCategory === "general" ? (
        <General />
      ) : activeCategory === "customization" ? (
        <Customization />
      ) : activeCategory === "about" ? (
        <About />
      ) : <></>}
    </div>
  );
};