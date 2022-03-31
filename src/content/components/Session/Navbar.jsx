import React from "react";
import "../../styles/session/Navbar.css";
import logo from "../../images/logo.png";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  return (
    <div className="navbar">
      <span
        className="material-icons-outlined"
        onClick={() => navigate("/session")}
      >
        attach_money
      </span>
      <span
        className="material-icons-outlined"
        onClick={() => navigate("/session")}
      >
        watch_later
      </span>
      {/* <span className="material-icons-outlined">send</span> */}
      <div className="blue-background" onClick={() => navigate("/session")}>
        <img className="logo-small " src={logo} alt="" />
      </div>
      <span
        className="material-icons-outlined"
        onClick={() => navigate("/session")}
      >
        person_add
      </span>
      <span
        className="material-icons-outlined"
        onClick={() => {
          logOut();
        }}
      >
        account_circle
      </span>
    </div>
  );
}

export default Navbar;
