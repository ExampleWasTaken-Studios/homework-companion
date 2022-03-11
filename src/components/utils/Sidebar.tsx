import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.css";

type ActiveItem = "home" | "announcements" | "settings";

interface SidebarProps {
  activeItem: ActiveItem;
}

export const Sidebar = ({ activeItem }: SidebarProps) => {
  return (
    <>
      <div className="sidebar">
        <h1 id="application-name">Homework<sup>&nbsp;&trade;&nbsp;</sup></h1>
        <ul className="sidebar-list">
          {activeItem === "home" ? (
            <>
              <Link to="/">
                <li className="sidebar-list-item sidebar-item-active no">Home</li>
              </Link>
              {/* <Link to="/announcements">
                <li className="sidebar-list-item">Announcements</li>
              </Link> */}
              <Link to="/settings/general">
                <li className="sidebar-list-item">Settings</li>
              </Link>
            </>
          ) : activeItem === "announcements" ? (
            <>
              <Link to="/">
                <li className="sidebar-list-item">Home</li>
              </Link>
              {/* <Link to="/announcements">
                <li className="sidebar-list-item sidebar-item-active">Announcements</li>
              </Link> */}
              <Link to="/settings/general">
                <li className="sidebar-list-item">Settings</li>
              </Link>
            </>
          ) : activeItem === "settings" ? (
            <>
              <Link to="/">
                <li className="sidebar-list-item">Home</li>
              </Link>
              {/* <Link to="/announcements">
                <li className="sidebar-list-item">Announcements</li>
              </Link> */}
              <Link to="/settings/general">
                <li className="sidebar-list-item sidebar-item-active">Settings</li>
              </Link>
            </>
          ) : null /* TODO: add error view */}
        </ul>
      </div>
    </>
  );
};