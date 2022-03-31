import React from "react";
import { useAuth } from "../context/authContext";
import logo from "../../images/logo.png";

function Header() {
  const { userName } = useAuth();

  return (
    <div className="session-header">
      <h3>
        <img src={logo} alt="" className="logo-small" />
        {userName}
      </h3>
      <span className="material-icons-outlined">qr_code_2</span>
    </div>
  );
}

export default Header;
