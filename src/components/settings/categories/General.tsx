import React, { useEffect, useState } from "react";
import { Setting } from "../Setting";

export const General = () => {

  const [autoStartChecked, setAutoStartChecked] = useState(false);
  const [hwAccChecked, setHwAccChecked] = useState(false);

  useEffect(() => {
    window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.general.autoStart).then(value => typeof value === "boolean" && setAutoStartChecked(value));
    window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.general.hwAcc).then(value => typeof value === "boolean" && setHwAccChecked(value));
  }, []);

  return (
    <>
      <Setting
        title="Auto Start"
        description="Automatically start the application when you computer boots."
        checked={autoStartChecked}
        setChecked={setAutoStartChecked}
        onStateChange={async () => {
          const oldValue = await window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.general.autoStart);
          window.api.settings.setSettingValue(window.api.settings.userSettingsKeys.general.autoStart, !oldValue);
        }}
      />
      <Setting
        title="Hardware Acceleration"
        description="Uses your GPU for certain tasks. Turn this off if you experience frame drops or lag."
        checked={hwAccChecked}
        setChecked={setHwAccChecked}
        onStateChange={async () => {
          const oldValue = await window.api.settings.getSettingValue(window.api.settings.userSettingsKeys.general.hwAcc);
          window.api.settings.setSettingValue(window.api.settings.userSettingsKeys.general.hwAcc, !oldValue);
        }}
      />
    </>
  );
};