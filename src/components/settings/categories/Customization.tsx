import React, { useState } from "react";
import { Setting } from "../Setting";

export const Customization = () => {

  /* const [perfModeChecked, setPerfModeChecked] = useState<boolean>(store.get(userSettingsPath.customization.perfMode)); */
  const [dummy, setDummy] = useState(true); // TODO: this only serves the purpose to remove the error in 'checked' and 'setChecke' props of <Setting> and should be removed once this file has been refactored

  return (
    <>
      <Setting
        title="Performance Mode"
        description="Replaces performance-heavy features and effects with less performance-intensive alternatives."
        checked={/* perfModeChecked */ dummy}
        setChecked={/* setPerfModeChecked */ setDummy}
        onStateChange={() => {
          // FIXME: use window.api.settings.get/set and window.api.settings.getUserSettingsPath

          /* const oldValue: boolean = store.get(userSettingsPath.customization.perfMode);
          store.set(userSettingsPath.customization.perfMode, !oldValue); */
        }}
      />
    </>
  );
};