import React from "react";

interface SettingsSidebarItemProps {
  name: string;
  active: boolean;
}

export const SettingsSidebarItem = ({ name, active }: SettingsSidebarItemProps) => {
  return (
    <>
      {active ? (
        <li className="settings-sidebar-item active">
          {name}
        </li>
      ) : (
        <li className="settings-sidebar-item">
          {name}
        </li>
      )}
    </>
  );
};
