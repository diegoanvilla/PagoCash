import React, { useState } from "react";
import Header from "./Header";
import WalletButton from "./WalletButton";
import Botones from "./Operaciones/Botones";
import Balance from "./Balance";

function Main() {
  return (
    <div>
      <Header />
      <Balance />
      <Botones />
      <WalletButton />
    </div>
  );
}

export default Main;
