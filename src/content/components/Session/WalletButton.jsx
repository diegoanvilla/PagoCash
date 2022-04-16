import React, { useState } from "react";
import WalletsList from "./WalletsList";
import { useAuth } from "../context/authContext";
function WalletButton() {
  const { userMainWallet } = useAuth();
  const [walletList, setWalletList] = useState(false);
  return (
    <>
      <div
        className="secondary-button text-center"
        onClick={() => setWalletList(true)}
      >
        <h1 className="wallet-selected-button">
          {userMainWallet ? (
            <>
              <span className="material-icons-outlined orange">
                account_balance_wallet
              </span>
              {userMainWallet.name}
            </>
          ) : (
            "Crear Wallet"
          )}
        </h1>
      </div>
      {walletList && <WalletsList setWalletList={setWalletList}></WalletsList>}
    </>
  );
}

export default WalletButton;
