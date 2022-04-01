import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import logo from "../../images/logo.png";
import { useAuth } from "../context/authContext";
import { useBlockChainContext } from "../context/BlockchainContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Header from "./Header";
function AddWallet() {
  const { currentUser, addNewWallet, setUserMain } = useAuth();
  const { createRandomWallet } = useBlockChainContext();
  const [wallet, setWallet] = useState({
    name: "",
    wallet: "",
    privKey: "",
  });
  const [error, setError] = useState();
  const [privKey, setPrivKey] = useState(false);
  const [succcess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const createWallet = async () => {
    setLoading(true);
    setError("");
    try {
      await addNewWallet(wallet);
      if (wallet.privKey) {
        setLoading(false);
        setPrivKey(true);
        return await setUserMain(currentUser);
      }
      await setUserMain(currentUser);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const generateWallet = () => {
    const newWallet = createRandomWallet();
    setWallet({
      ...wallet,
      wallet: newWallet.address,
      privKey: newWallet.privateKey,
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setWallet((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      <Header />
      <h1 className="text-center mb-20">Crea una nueva Wallet</h1>
      <div
        className="secondary-button text-center mb-20"
        onClick={() => generateWallet()}
      >
        <h2 className="">Generar Wallet</h2>
      </div>
      <form
        className="access-form"
        onSubmit={(e) => {
          e.preventDefault();
          createWallet();
        }}
      >
        <h1>Ingresar Wallet</h1>
        <input
          type="text"
          id="name"
          value={wallet.name}
          onChange={handleChange}
          placeholder="Nombre de la Wallet"
        />
        <input
          type="text"
          value={wallet.wallet}
          onChange={handleChange}
          id="wallet"
          placeholder="Direccion Publica de la Wallet"
        />
        <button type="submit" className="secondary-button w-100">
          Crear
        </button>
        {error && <small className="error">{error}</small>}
        {privKey && <ShowPrivateKey wallet={wallet} setPrivKey={setPrivKey} />}
        {succcess && <CreationSucces wallet={wallet} />}
        {loading && <Loading />}
      </form>
    </div>
  );
}

function ShowPrivateKey({ wallet, setPrivKey }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className="popup-overflow">
        <div className="popup-box" onClick={(e) => e.stopPropagation()}>
          <h1 className="blue mb-20 text-center">
            Anota la llave privada de tu nueva wallet
          </h1>
          <h3
            className="blue word-break"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(wallet.privKey);
            }}
          >
            {wallet.privKey}
          </h3>
          <p
            className="blue mb-20"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(wallet.privKey);
            }}
          >
            {copied ? (
              <span className="green">
                <b>Copiado</b>
              </span>
            ) : (
              "Presiona aca para copiar"
            )}
          </p>
          <small className="text-center mb-20">
            Pago Cash no almacena de ninguna forma tus llaves privadas
          </small>
          <button
            className="secondary-button w-100"
            onClick={() => navigate("/session")}
          >
            <h3>Listo</h3>
          </button>
        </div>
      </div>
    </>
  );
}

function CreationSucces({ wallet }) {
  const navigate = useNavigate();
  return (
    <div className="popup-overflow">
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="blue mb-20 text-center">
          Tu wallet a sido creada exitosamente
        </h1>
        <h3 className="blue text-center word-break mb-20">{wallet.name}</h3>
        <h3 className="blue text-center word-break mb-20">{wallet.wallet}</h3>
        <button
          className="secondary-button w-100"
          onClick={() => navigate("/session")}
        >
          <h3>Listo</h3>
        </button>
      </div>
    </div>
  );
}

export default AddWallet;
