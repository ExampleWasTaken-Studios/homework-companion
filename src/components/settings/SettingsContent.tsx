import { useEffect, useState } from "react";
import { Changelog } from "../modals/changelog/Changelog";
import { Button } from "../utils/Button";
import { ViewHeader } from "../utils/ViewHeader";
import { ToggleSetting } from "./controls/ToggleSetting";

export const SettingsContent = () => {

  const [changelogOpen, setChangelogOpen] = useState(false);
  const [version, setVersion] = useState("");
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      setVersion(await window.api.app.getVersion());
    })();
  });

  const licenseClickHandler = async () => {
    window.api.app.openPath(`${await window.api.app.getAssetsPath()}/3rd-party-licenses.md`);
  };

  return (
    <div className="settings-content">
      <ViewHeader title="Settings" />
      <ToggleSetting
        title="Open Homework Companion"
        description="Save yourself a few clicks and let Homework Companion greet you at computer startup."
        settingKey={window.api.settings.userSettingsKeys.general.autoStart}
      />
      <ToggleSetting
        title="Disable Hardware Acceleration"
        description="Turns on Hardware Acceleration, which uses your GPU to make Homework Companion smoother. Turn this off if you are experiencing frame drops. (Requires restart)"
        settingKey={window.api.settings.userSettingsKeys.general.hwAcc}
      />

      <div className="changelog-container">
        <Button
          onClick={() => setChangelogOpen(true)}
          className="about-section-btn"
        >
        What&apos;s new?
        </Button>
        <Button
          onClick={() => {
            setIsCheckingForUpdate(true);
            window.api.app.checkForUpdates().finally(() => setIsCheckingForUpdate(false));
          }}
          className="about-section-btn"
          disabled={isCheckingForUpdate}
        >
          Check for Updates
        </Button>
      </div>

      <div className="about-section">
        <div className="version-section">
          {version}
        </div>
        <div
          className="license-section"
          onClick={licenseClickHandler}
        >
          Third-Party Licenses
        </div>
      </div>

      <Changelog
        isOpen={changelogOpen}
        setOpen={setChangelogOpen}
      />
    </div>
  );
};
