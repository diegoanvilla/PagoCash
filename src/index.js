import React from "react";
import ReactDOM from "react-dom";
import { isMobile } from "react-device-detect";
import Router from "./content/components/router";
ReactDOM.render(
  <React.StrictMode>
    {isMobile ? <Router /> : "Entra con tu telefono"}
  </React.StrictMode>,
  document.getElementById("root")
);
