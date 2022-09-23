import { About } from "./categories/About";
import { Customization } from "./categories/Customization";
import { General } from "./categories/General";
import { Subjects } from "./categories/subjects/Subjects";

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
      ) : activeCategory === "subjects" ? (
        <Subjects />
      ) : activeCategory === "about" ? (
        <About />
      ) : <></>}
    </div>
  );
};