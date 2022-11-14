import { useEffect, useState } from "react";
import { Switch } from "../../utils/Switch";

interface ToggleSettingProps {
  /**
   * The name of the setting.
   */
  title: string;

  /**
   * The description of the setting.
   */
  description: string;

  /**
   * The setting this toggle should control.
   */
  settingKey: string;

  /**
   * Function to be executed when the state is changed to `checked`.
   */
  onSetChecked?: () => void;

  /**
   * Functino to be executed when the state is changed to `unchecked`.
   */
  onSetUnchecked?: () => void;
}

/**
 * A normal toggle setting.
 * @param param0 {@link ToggleSettingProps}
 */
export const ToggleSetting = ({ title, description, settingKey, onSetChecked, onSetUnchecked }: ToggleSettingProps) => {

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    window.api.settings.getSettingValue(settingKey).then(value => typeof value === "boolean" && setChecked(value));
  }, [settingKey]);

  return (
    <div className="toggle-setting">
      <div className="toggle-setting-header">
        <div className="toggle-setting-title">
          {title}
        </div>
        <div className="toggle-setting-switch">
          <Switch
            checked={isChecked}
            setChecked={setChecked}
            onStateChange={async () => {
              const oldValue = await window.api.settings.getSettingValue(settingKey);
              window.api.settings.setSettingValue(settingKey, !oldValue);

              if (oldValue) {
                onSetUnchecked && onSetUnchecked();
              } else {
                onSetChecked && onSetChecked();
              }

            }}
          />
        </div>
      </div>
      <div className="toggle-setting-description">
        {description}
      </div>
    </div>
  );
};
