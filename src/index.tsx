import React from "react";
import ReactDom from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";

ReactDom.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        {/* <Route path="/welcome"
          element={<Welcome />}
        /> */}
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root"));