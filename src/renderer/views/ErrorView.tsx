import { ipcRenderer } from "electron";
import React from "react";
import "source-map-support/register";
import channels from "../../common/channels";
import { Button } from "../components/utils/Button";

export const ErrorView = () => {

  return (
    <div className="error-view">
      <div className="error-view-wrapper">
        <div className="error-view-header">
          <h1 className="error-view-title">Well, this is awkward :/</h1>
          <h4 className="error-view-subtitle">Looks like we&apos;ll have to do a little overtime....</h4>
        </div>
        <Button 
          className="error-view-relaunch-button"
          onClick={() => {
            ipcRenderer.send(channels.relaunchApp, { force: true });
          }}
        >
          Relaunch
        </Button>
      </div>
    </div>
  );
};