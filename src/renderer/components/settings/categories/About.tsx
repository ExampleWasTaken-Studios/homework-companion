import { shell } from "electron";
import React, { useState } from "react";
import thirdPartyLicenses from "../../../assets/3rd-party-licenses.md";
import logo from "../../../assets/img/80x80.png";
import { Changelog } from "../../changelog/Changelog";

export const About = () => {

  const [changelogOpen, setChangelogOpen] = useState(false);

  return (
    <div className="about-container">
      <div className="about">
        <div className="header">
          <img
            className="about-logo"
            src={logo}
            alt="Placeholder_logo"
            draggable={false}
            width={80}
            height={80}
          />
          <div className="title-and-version">
            <h1 className="about-title">Homework Companion</h1>
            <h3
              className="about-version"
              onClick={() => {
                setChangelogOpen(true);
              }}
            >
              v1.0.0-pre-alpha.1
            </h3> {/* TODO: add logic to open changelog */}
          </div>
        </div>
        <div className="license">
        Copyright &copy; 2022 ExampleWasTaken Studios and its contributors
          <br/>
        Licensed under the GNU General Public License Version 3
        </div>
        <div 
          className="third-party-licenses"
          onClick={() => {
            shell.openExternal(thirdPartyLicenses);
          }}
        >
          Third-Party Licenses {/* TODO: add logic to show licenses */}
        </div>
      </div>

      <Changelog
        isOpen={changelogOpen}
        setOpen={setChangelogOpen}
      />
    </div>
  );
};