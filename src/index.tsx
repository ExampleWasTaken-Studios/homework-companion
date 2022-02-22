import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Announcements } from "./views/Announcements";
import { Settings } from "./views/Settings";

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
          path="/settings"
          element={<Settings />}
        />
        {/* <Route path="/welcome"
          element={<Welcome />}
        /> */}
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root"));