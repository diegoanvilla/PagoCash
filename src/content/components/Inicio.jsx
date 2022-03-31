import React, { useState } from "react";
// import Register from "./Register";
// import Login from "./Login";
import logo from "../images/logo.png";
import "../styles/inicio.css";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();
  return (
    <div className="inicio">
      <img src={logo} alt="" />
      <h1 className="white">Bienvenido</h1>
      <button
        className="primary-button w-80"
        onClick={() => {
          navigate("/access?form=1");
        }}
      >
        <h1>Registrate</h1>
      </button>
      <button
        className="secondary-button w-80"
        onClick={() => {
          navigate("/access?form=0");
        }}
      >
        <h1>Ingresa</h1>
      </button>
    </div>
  );
}

export default Inicio;
