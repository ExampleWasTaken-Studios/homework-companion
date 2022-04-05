import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import channels from "../../common/channels";
import { Button } from "../components/utils/Button";
import "source-map-support/register";
import { log } from "../../../public/electron/main";

interface ErrorViewProps {
  message: string;
  source: string;
  lineno: number;
  colno: number;
  error: Error;
}

export const ErrorView = ({ message, source, lineno, colno, error }: ErrorViewProps) => {

  useEffect(() => {
    console.error("ErrorView was triggered due to:", "Message:", message, "\nSource:", source, "\nLine no.:", lineno, "\nColumn no.:", colno, "\n", error);
  }, []);

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
            ipcRenderer.send(channels.relaunchApp, {force: true});
          }}
        >
          Relaunch
        </Button>
      </div>
    </div>
  );
};