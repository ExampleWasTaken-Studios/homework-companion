import { app } from "electron";
import React from "react";
import { Button } from "../components/utils/Button";

interface ErrorViewProps {
  error: Error;
}

export const ErrorView = ({ error }: ErrorViewProps) => {
  return (
    <div className="error-view">
      <div className="error-view-wrapper">
        <div className="error-view-header">
          <h1 className="error-view-title">Oops, that&apos;s embarrasing!</h1>
          <h4 className="error-view-subtitle">To help us fix it, please send the following to support:</h4>
        </div>
        <textarea
          name="error-view-error-box"
          id="error-view-error-box"
          className="error-view-error-box"
          readOnly
          defaultValue={error.message}
        >
        </textarea>
        <Button 
          className="error-view-relaunch-button"
          onClick={() => {
            null; //TODO: impl. relaunch feature
          }}
        >
          Relaunch
        </Button>
      </div>
    </div>
  );
};