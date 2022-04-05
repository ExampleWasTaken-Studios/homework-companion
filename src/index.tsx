import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./renderer/views/Home";
import { Announcements } from "./renderer/views/Announcements";
import { Settings } from "./renderer/views/Settings";
import { WelcomeComplete, Welcome } from "./renderer/views/Welcome";
import { ErrorView } from "./renderer/views/ErrorView";

window.onerror = (message, source, lineno, colno, error) => {
  ReactDom.render(
    <React.StrictMode>
      <ErrorView
        message={message as string}
        source={source as string}
        lineno={lineno as number}
        colno={colno as number}
        error={error as Error}
      />
    </React.StrictMode>,
    document.getElementById("root"));
};

ReactDom.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/announcements"
          element={<Announcements />}
        />
        <Route
          path="/settings/general"
          element={<Settings activeCategory="general" />}
        />
        <Route
          path="/settings/customization"
          element={<Settings activeCategory="customization" />}
        />
        <Route
          path="/settings/about"
          element={<Settings activeCategory="about" />}
        />
        
        <Route
          path="/welcome"
          element={<Welcome />}
        />
        <Route
          path="/welcome-complete"
          element={<WelcomeComplete />}
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root"));