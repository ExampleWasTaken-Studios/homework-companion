import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import GlobalErrorBoundary from "./renderer/components/errors/GlobalErrorBoundary";
import "./renderer/styles/main.css";
import { Home } from "./renderer/views/Home";
import { Settings } from "./renderer/views/Settings";
import { Welcome } from "./renderer/views/Welcome";


ReactDom.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <HashRouter>
        <Routes>

          <Route
            path="/"
            element={<App />}
          />
          <Route 
            path="home"
            element={<Home />}
          />
          <Route
            path="welcome"
            element={<Welcome />}
          />
          <Route
            path="settings"
          >
            <Route
              path="general"
              element={<Settings activeCategory="general" />}
            />
            <Route
              path="customization"
              element={<Settings activeCategory="customization" />}
            />
            <Route
              path="about"
              element={<Settings activeCategory="about" />}
            />
            <Route
              index
              element={<Settings activeCategory="general" />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"));