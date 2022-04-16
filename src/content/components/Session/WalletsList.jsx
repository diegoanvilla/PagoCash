import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import "../../styles/session/Popup.css";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
function WalletsList({ setWalletList }) {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserWallets, setNewMainWallet } = useAuth();
  const changeMainWallet = async (wallet) => {
    setLoading(true);
    try {
      setNewMainWallet(wallet).then(async () => {
        await displayWallets();
        setLoading(false);
      });
    } catch (err) {
      alert("algo salio mal");
      setLoading(false);
    }
  };
  const displayWallets = async () => {
    let array = [];
    await getUserWallets().then((doc) => {
      doc.docs.map((doc) => {
        array.push(doc.data());
      });
    });
    setWallets(array);
    setLoading(false);
  };
  useEffect(() => {
    const app = async () => {
      await displayWallets();
    };
    return app();
  }, []);
  return (
    <div className="popup-overflow" onClick={() => setWalletList(false)}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="blue text-center">Tus Wallets</h1>
        <button
          className="secondary-button w-100"
          onClick={() => navigate("/new-wallet")}
        >
          <h2>Agregar Wallet</h2>
        </button>
        <div className="wallet-list-box">
          <>
            {wallets.length > 0 ? (
              <>
                {wallets.map((doc) => {
                  return (
                    <div key={doc.name} className="wallet-list-item">
                      <p>{doc.name}</p>
                      {doc.main ? (
                        <span className="material-icons-outlined orange">
                          star
                        </span>
                      ) : (
                        <span
                          className="material-icons-outlined grey"
                          onClick={() => changeMainWallet(doc.wallet)}
                        >
                          star
                        </span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="wallet-list-item text-center h-100">
                <p>Crea una nueva Wallet</p>
              </div>
            )}
          </>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default WalletsList;
