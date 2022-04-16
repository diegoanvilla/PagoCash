import React, { useEffect, useState } from "react";
import Header from "./Header";
import WalletButton from "./WalletButton";
import Loading from "../Loading";
import { useAuth } from "../context/authContext";
import "../../styles/session/Wallet.css";
import { useNavigate } from "react-router-dom";

function Wallets() {
  const navigate = useNavigate();
  const { getUserWallets, setNewMainWallet, deleteWallet } = useAuth();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const deleteSelectedWallet = async (wallet) => {
    setLoading(true);
    try {
      deleteWallet(wallet).then(async () => {
        await displayWallets();
        setLoading(false);
      });
    } catch (err) {
      alert("algo salio mal");
      console.log(err);
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
    <div>
      <Header />
      <h1 className="text-center mb-20">Tus Wallets</h1>
      <WalletButton />
      <div className="wallet-list-box-page">
        <>
          {wallets.length > 0 ? (
            <>
              {wallets.map((doc) => {
                return (
                  <div
                    key={doc.name}
                    className="wallet-list-item-page"
                    onClick={() => navigate(`/wallet/${doc.wallet}`)}
                  >
                    <p>{doc.name}</p>
                    <div className="wallet-buttons">
                      <span
                        className="material-icons-outlined grey"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSelectedWallet(doc.wallet);
                        }}
                      >
                        delete
                      </span>
                      {doc.main ? (
                        <span className="material-icons-outlined orange">
                          star
                        </span>
                      ) : (
                        <span
                          className="material-icons-outlined grey"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeMainWallet(doc.wallet);
                          }}
                        >
                          star
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="wallet-list-item-page text-center h-100">
              <p>Crea una nueva Wallet</p>
            </div>
          )}
        </>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Wallets;
