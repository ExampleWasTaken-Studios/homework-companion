import React, { Dispatch, SetStateAction } from "react";
import { Switch } from "../utils/Switch";

interface SettingProps {
  title: string;
  description?: string;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  onStateChange: () => void;
}

/**
 * One setting that represents on setting of the application.
 * @param title - The title of the switch.
 * @param description - (optional) The description of the title.
 * @param checked - The checked state.
 * @param setChecked - Method of the checked state.
 * @param onStateChange - Callback that gets called AFTER the state has changed, due to a click on the switch component.
 */
export const Setting = ({ title, description, checked, setChecked, onStateChange }: SettingProps) => {

  return (
    <div className="setting">
      <div className="setting-title">
        {title}
        <Switch
          checked={checked}
          setChecked={setChecked}
          onStateChange={onStateChange}
        />
      </div>
      {description && (
        <p className="setting-description">{description}</p>
      )}
    </div>
  );
};