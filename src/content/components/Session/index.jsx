import React from "react";
import Navbar from "./Navbar";
import "../../styles/session/index.css";
function Session({ children }) {
  return (
    <div className="session-wrapper">
      <div className="white session-container">{children}</div>
      <Navbar></Navbar>
    </div>
  );
}

export default Session;
