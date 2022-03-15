import React, { useState } from "react";
import store from "../../../../../electron/settings/settings";
import userSettingsPath from "../../../../../electron/settings/userSettingsPath";
import { Setting } from "../Setting";

export const General = () => {

  const [autoStartChecked, setAutoStartChecked] = useState<boolean>(store.get(userSettingsPath.general.autoStart));
  const [hwAccChecked, setHwAccChecked] = useState<boolean>(store.get(userSettingsPath.general.hwAcc));

  return (
    <>
      <Setting
        title="Auto Start"
        description="Automatically start the application when you computer boots."
        checked={autoStartChecked}
        setChecked={setAutoStartChecked}
        onStateChange={() => {
          const oldValue: boolean = store.get(userSettingsPath.general.autoStart);
          store.set(userSettingsPath.general.autoStart, !oldValue);
        }}
      />
      <Setting
        title="Hardware Acceleration"
        description="Uses your GPU for certain tasks. Turn this off if you experience frame drops or lag."
        checked={hwAccChecked}
        setChecked={setHwAccChecked}
        onStateChange={() => {
          const oldValue: boolean = store.get(userSettingsPath.general.hwAcc);
          store.set(userSettingsPath.general.hwAcc, !oldValue);
        }}
      />
    </>
  );
};