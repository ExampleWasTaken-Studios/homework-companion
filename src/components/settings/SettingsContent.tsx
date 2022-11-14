import { ViewHeader } from "../utils/ViewHeader";
import { ToggleSetting } from "./controls/ToggleSetting";

export const SettingsContent = () => {
  return (
    <div className="settings-content">
      <ViewHeader title="Settings" />
      <ToggleSetting
        title="Open Homework Companion"
        description="Save yourself a few clicks and let Homework Companion greet you at computer startup."
        settingKey={window.api.settings.userSettingsKeys.general.autoStart}
      />
      <ToggleSetting
        title="Disable Hardware Acceleration"
        description="Turns on Hardware Acceleration, which uses your GPU to make Discord smoother. Turn this off if you are experiencing frame drops. (Requires restart)"
        settingKey={window.api.settings.userSettingsKeys.general.hwAcc}
      />
    </div>
  );
};
