import React from "react";
import { Setting } from "../Setting";

export const General = () => {
  return (
    <>
      <Setting
        title="Auto Start"
        description="Automatically start the application when you computer boots."
      />
      <Setting
        title="Hardware Acceleration"
        description="Uses your GPU for certain tasks."
      />
    </>
  );
};