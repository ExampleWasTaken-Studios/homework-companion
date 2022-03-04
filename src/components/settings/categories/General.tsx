import React, { useState } from "react";
import { Setting } from "../Setting";

export const General = () => {

  const [autoStartChecked, setAutoStartChecked] = useState(true);
  const [hwAccChecked, setHwAccChecked] = useState(false);

  return (
    <>
      <Setting
        title="Auto Start"
        description="Automatically start the application when you computer boots."
        checked={autoStartChecked}
        setChecked={setAutoStartChecked}
        onStateChange={() => {
          console.log("autostart has changed to", autoStartChecked);
        }}
      />
      <Setting
        title="Hardware Acceleration"
        description="Uses your GPU for certain tasks."
        checked={hwAccChecked}
        setChecked={setHwAccChecked}
        onStateChange={() => {
          console.log("hw acc has changed to", hwAccChecked);
        }}
      />
    </>
  );
};