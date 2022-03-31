import React from "react";
import Header from "../Header";
import Balance from "../Balance";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const hash = queryParams.get("hash");

  return (
    <div>
      <Header></Header>
      <Balance></Balance>
      <div className="text-center mb-20">
        <span class="material-icons-outlined big-icon orange">price_check</span>
        <h1 className="mb-20">Transaccion aceptada</h1>
        <h4>Checkea el status de la transaccion presionando aca</h4>
      </div>
      <div className="secondary-button">
        <h1 className="dots word-break">
          <a
            className="white"
            href={`https://explorer.latam-blockchain.com/tx/${hash}`}
          >
            {hash}
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Success;
