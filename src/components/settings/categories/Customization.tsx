import { useEffect, useState } from "react";
import { Setting } from "../Setting";

export const Customization = () => {
  const [perfModeChecked, setPerfModeChecked] = useState(false);

  useEffect(() => {
    window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.customization.perfMode).then(value => typeof value === "boolean" && setPerfModeChecked(value));
  }, []);

  return (
    <>
      <Setting
        title="Performance Mode"
        description="Replaces performance-heavy features and effects with less performance-intensive alternatives."
        checked={perfModeChecked}
        setChecked={setPerfModeChecked}
        onStateChange={async () => {
          const oldValue =  await window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.customization.perfMode);
          window.api.settings.setSettingValue(window.api.settings.userSettingsKeys.customization.perfMode, !oldValue);
        }}
      />
    </>
  );
};
