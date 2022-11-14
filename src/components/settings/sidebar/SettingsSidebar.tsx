import React from "react";
import { useLocation } from "react-router-dom";
import { SettingsSidebarItem } from "./SettingsSidebarItem";

export const SettingsSidebar = () => {

  const location = useLocation();

  return (
    <div className="settings-sidebar">
      <ul className="settings-sidebar-list">
        <SettingsSidebarItem
          name="General"
          active={location.pathname.endsWith("/general")}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
        <SettingsSidebarItem
          name="Customize"
          active={true}
        />
      </ul>
    </div>
  );
};
