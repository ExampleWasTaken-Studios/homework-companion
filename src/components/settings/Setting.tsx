import React, { useState } from "react";
import { Switch } from "../utils/Switch";

interface SettingProps {
  title: string;
  description?: string;
}

export const Setting = ({ title, description }: SettingProps) => {

  const [autoStartChecked, setAutoStartChecked] = useState(false);

  return (
    <div className="setting">
      <div className="setting-title">
        {title}
        <Switch
          checked={autoStartChecked}
          setChecked={setAutoStartChecked}
        />
      </div>
      {description && (
        <p className="setting-description">{description}</p>
      )}
    </div>
  );
};