import React, { SetStateAction } from "react";
import { CloseIcon } from "../../svg/CloseIcon";
import { DiscordIcon } from "../../svg/DiscordIcon";
import { TwitterIcon } from "../../svg/TwitterIcon";
import { GroupContainer } from "./GroupContainer";
import { NewItem } from "./NewItem";

interface ChangelogProps {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  showSocials?: boolean;
}

export const Changelog = ({ isOpen, setOpen, showSocials }: ChangelogProps) => {

  const closeHandler = async () => {
    window.api.settings.setSettingValue("metaInfo.lastChangelogViewed", await window.api.app.getVersion());
    setOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="overlay"
            onClick={() => closeHandler()}
          >
            <div
              className="changelog-modal"
              onClick={event => event.stopPropagation()}
            >

              <div className="changelog-modal-header">
                <h2 className="changelog-modal-title">What&apos;s New</h2>
                <CloseIcon onClick={() => closeHandler()} />
              </div>

              <div
                onClick={() => {
                  const platform = window.api.app.getPlatform;
                  if (platform === "darwin") {
                    window.api.app.openExternal("https://bit.ly/3Gt3RS3");
                  } else if (platform === "win32") {
                    window.api.app.openExternal("https://bit.ly/3XdW5l9");
                  }
                }}
                className="changelog-hero"
              >
                <h2>GET&nbsp;THE LATEST&nbsp;NEWS</h2>
              </div>

              <GroupContainer type="new-features">

              </GroupContainer>

              <GroupContainer type="bug-fixes">
                <NewItem
                  name="BETA VERSION:"
                  description="This release is not a release candidate. We only release this version for internal testing purposes."
                />
              </GroupContainer>

              {showSocials && (
                <div className="changelog-footer">
                  <TwitterIcon
                    className="changelog-footer-twitter-icon"
                    onClick={() => {
                      const platform = window.api.app.getPlatform;
                      if (platform === "darwin") {
                        window.api.app.openExternal("https://bit.ly/3Oj1JOU");
                      } else if (platform === "win32") {
                        window.api.app.openExternal("http://bit.ly/3hRELlG");
                      }
                    }}
                  />
                  <DiscordIcon
                    className="changelog-footer-discord-icon"
                    onClick={() => {
                      const platform = window.api.app.getPlatform;
                      if (platform === "darwin") {
                        window.api.app.openExternal("https://bit.ly/3gczXXw");
                      } else if (platform === "win32") {
                        window.api.app.openExternal("https://bit.ly/3UP5Lkk");
                      }
                    }}
                  />
                  <p>Join for more updates!</p>
                </div>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
};
