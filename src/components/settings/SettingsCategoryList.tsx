import { Link } from "react-router-dom";
import { SettingsCategoryListItem } from "./SettingsCategoryListItem";


interface SettingsCategoryListProps {
  activeCategory: SettingsCategory;
}

export const SettingsCategoryList = ({ activeCategory }: SettingsCategoryListProps) => {

  return (
    <div className="settings-category-list">
      <Link to="/settings/general">
        <SettingsCategoryListItem
          name="General"
          isActive={activeCategory === "general"}
        />
      </Link>
      <Link to="/settings/customization">
        <SettingsCategoryListItem
          name="Customization"
          isActive={activeCategory === "customization"}
        />
      </Link>
      <Link to="/settings/subjects">
        <SettingsCategoryListItem
          name="Subjects"
          isActive={activeCategory === "subjects"}
        />
      </Link>
      <Link to="/settings/about">
        <SettingsCategoryListItem
          name="About"
          isActive={activeCategory === "about"}
        />
      </Link>
    </div>
  );
};
