import React, { useState } from "react";
import store from "../../../../electron/settings/settings";
import userSettingsPath from "../../../../electron/settings/userSettingsPath";
import { Setting } from "../Setting";

export const Customization = () => {

  const [perfModeChecked, setPerfModeChecked] = useState<boolean>(store.get(userSettingsPath.customization.perfMode));

  return (
    <>
      <Setting
        title="Performance Mode"
        description="Replaces performance-heavy features and effects with less performance-intensive alternatives."
        checked={perfModeChecked}
        setChecked={setPerfModeChecked}
        onStateChange={() => {
          const oldValue: boolean = store.get(userSettingsPath.customization.perfMode);
          store.set(userSettingsPath.customization.perfMode, !oldValue);
        }}
      />
    </>
  );
};