import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
function Wallet() {
  const { getWallet } = useAuth();
  const { wallet } = useParams();
  const [selectedWallet, setSelectedWallet] = useState();
  const [walletEditada, setWalletEditada] = useState({
    name: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setWalletEditada((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    const app = async () => {
      setSelectedWallet(await getWallet(wallet));
    };
    return app;
  }, []);
  //   useEffect(() => {
  //     if (selectedWallet) setWalletEditada({ name: selectedWallet.name });
  //   }, [selectedWallet]);
  return (
    <div>
      <Header />
      {selectedWallet ? (
        <>
          <h1 className="text-center mb-20">{selectedWallet.name}</h1>
          <form
            className="access-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1>Editar Wallet</h1>
            <small>Nombre</small>
            <input
              type="text"
              id="name"
              value={walletEditada.name}
              onChange={handleChange}
              placeholder={selectedWallet.name}
            />
            <small>Direccion</small>
            <input
              type="text"
              //   value={wallet.wallet}
              //   onChange={handleChange}
              id="wallet"
              value={selectedWallet.wallet}
              placeholder="Direccion Publica de la Wallet"
            />
            <button type="submit" className="secondary-button w-100">
              Crear
            </button>
            {/* {error && <small className="error">{error}</small>} */}
            {/* {privKey && <ShowPrivateKey wallet={wallet} setPrivKey={setPrivKey} />} */}
            {/* {succcess && <CreationSucces wallet={wallet} />} */}
            {/* {loading && <Loading />} */}
          </form>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Wallet;
