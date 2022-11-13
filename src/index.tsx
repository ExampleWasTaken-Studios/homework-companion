import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import GlobalErrorBoundary from "./components/errors/GlobalErrorBoundary";
import "./styles/main.css";
import { Home } from "./views/Home";
import { Settings } from "./views/Settings";
import { Welcome } from "./views/Welcome";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
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
              path="about"
              element={<Settings activeCategory="about" />}
            />
            <Route
              path="subjects"
              element={<Settings activeCategory="subjects" />}
            />
            <Route
              index
              element={<Settings activeCategory="general" />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalErrorBoundary>
  </React.StrictMode>
);
