import React from "react";
import { useBlockChainContext } from "../context/BlockchainContext";
function Balance({ center }) {
  const { balance } = useBlockChainContext();

  return (
    <>
      <h1 className={`account-balance ${center && "text-center"}`}>
        {balance ? balance : "0"}
      </h1>
      {center || <p className="grey mb-20 word-break">Disponible</p>}
    </>
  );
}

export default Balance;
