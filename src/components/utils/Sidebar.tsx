import { Link } from "react-router-dom";

type ActiveItem = "home" | "subjects" | "settings";

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
              <Link to="/home">
                <li className="sidebar-list-item sidebar-item-active no">Home</li>
              </Link>
              <Link to="/subjects">
                <li className="sidebar-list-item">Subjects</li>
              </Link>
              <Link to="/settings">
                <li className="sidebar-list-item">Settings</li>
              </Link>
            </>
          ) : activeItem === "subjects" ? (
            <>
              <Link to="/home">
                <li className="sidebar-list-item">Home</li>
              </Link>
              <Link to="/subjects">
                <li className="sidebar-list-item sidebar-item-active">Subjects</li>
              </Link>
              <Link to="/settings">
                <li className="sidebar-list-item">Settings</li>
              </Link>
            </>
          ) : activeItem === "settings" ? (
            <>
              <Link to="/home">
                <li className="sidebar-list-item">Home</li>
              </Link>
              <Link to="/subjects">
                <li className="sidebar-list-item">Subjects</li>
              </Link>
              <Link to="/settings">
                <li className="sidebar-list-item sidebar-item-active">Settings</li>
              </Link>
            </>
          ) : null /* TODO: add error view */}
        </ul>
      </div>
    </>
  );
};
