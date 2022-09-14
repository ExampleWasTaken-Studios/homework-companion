import React, { useState } from "react";
import { Setting } from "../Setting";


/*

IMPORTANT: For any questions that could arise from this code, please refer to ./Customization.tsx. The comments made there apply here as well!

*/


export const General = () => {

  /* const [autoStartChecked, setAutoStartChecked] = useState<boolean>(store.get(userSettingsPath.general.autoStart));
  const [hwAccChecked, setHwAccChecked] = useState<boolean>(store.get(userSettingsPath.general.hwAcc)); */

  const [dummy, setDummy] = useState(true);

  return (
    <>
      <Setting
        title="Auto Start"
        description="Automatically start the application when you computer boots."
        checked={/* autoStartChecked */ dummy}
        setChecked={/* setAutoStartChecked */ setDummy}
        onStateChange={() => {
          /* const oldValue: boolean = store.get(userSettingsPath.general.autoStart);
          store.set(userSettingsPath.general.autoStart, !oldValue); */
        }}
      />
      <Setting
        title="Hardware Acceleration"
        description="Uses your GPU for certain tasks. Turn this off if you experience frame drops or lag."
        checked={/* hwAccChecked */ dummy}
        setChecked={/* setHwAccChecked */ setDummy}
        onStateChange={() => {
          /* const oldValue: boolean = store.get(userSettingsPath.general.hwAcc);
          store.set(userSettingsPath.general.hwAcc, !oldValue); */
        }}
      />
    </>
  );
};