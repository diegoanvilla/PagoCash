import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useBlockChainContext } from "../../context/BlockchainContext";
import Header from "../Header";
import WalletButton from "../WalletButton";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
import Balance from "../Balance";

function Operacion({ type, ammount, method, price }) {
  const { userMainWallet } = useAuth();
  const queryParams = new URLSearchParams(window.location.search);
  const [operacion, setOperacion] = useState({
    operacion: queryParams.get("operacion"),
    metodo: queryParams.get("metodo"),
  });
  const [success, setSuccess] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  return (
    <div>
      <Header />
      <h1 className="text-center mb-20">
        {operacion.operacion} con {operacion.metodo}
      </h1>
      <Balance center={true} />
      <p className="text-center mb-20">
        Selecciona la wallet que quieres {operacion.operacion}
      </p>
      <WalletButton />
      <div className="mb-20"></div>
      {operacion.operacion === "Cargar" ? (
        <CargarForm metodo={operacion.metodo} />
      ) : (
        <RetiroForm metodo={operacion.metodo} />
      )}
      {error && <small className="error">{error}</small>}
      {loading && <Loading />}
    </div>
  );
}

const RetiroForm = ({ metodo }) => {
  const [success, setSuccess] = useState(false);
  const [retiro, setRetiro] = useState({
    ammount: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRetiro((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <>
      <form
        className="access-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(retiro);
          if (!retiro.ammount) return alert("Selecciona una cantidad valida");
          setSuccess(true);
        }}
      >
        <h1>{metodo}</h1>
        {metodo === "Zelle" ? (
          <>
            <input
              type="number"
              required
              placeholder="Cantdiad a Retirar"
              value={retiro.ammount}
              onChange={handleChange}
              id="ammount"
            />
            <input type="email" required placeholder="Correo del Zelle" />
            <input
              type="text"
              required
              placeholder="Nombre del propietario del Zelle"
            />
          </>
        ) : (
          <>
            <input
              type="number"
              required
              placeholder="Cantdiad a Retirar"
              value={retiro.ammount}
              onChange={handleChange}
              id="ammount"
            />
            <input
              type="number"
              required
              placeholder="Numero de telefono del Pago Movil"
            />
            <input type="number" required placeholder="Cedula" />
            <input type="text" required placeholder="Banco" />
          </>
        )}
        <button type="submit" className="secondary-button w-100">
          Retirar
        </button>
      </form>
      {success && <RetiroSuccess ammount={retiro.ammount} />}
    </>
  );
};
const CargarForm = ({ metodo }) => {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <form
        className="access-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>{metodo}</h1>
        {metodo === "Zelle" ? (
          <>
            <input type="number" required placeholder="Cantdiad a Cargar" />
            <input type="email" required placeholder="Correo del Zelle" />
            <input
              type="text"
              required
              placeholder="Nombre del propietario del Zelle"
            />
          </>
        ) : (
          <>
            <input type="number" required placeholder="Cantdiad a Cargar" />
            <input
              type="number"
              required
              placeholder="Numero de telefono del Pago Movil"
            />
            <input type="number" required placeholder="Cedula" />
            <input type="text" required placeholder="Banco" />
          </>
        )}
        <button type="submit" className="secondary-button w-100">
          Cargar
        </button>
      </form>
      {success && <ProximamenteSuccess />}
    </>
  );
};
const ProximamenteSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="popup-overflow">
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="blue mb-20 text-center">
          Esta funcion esta aun en desarrollo!
        </h1>

        <button
          className="secondary-button w-100"
          onClick={() => navigate("/session")}
        >
          <h3>Listo</h3>
        </button>
      </div>
    </div>
  );
};
const RetiroSuccess = ({ ammount }) => {
  const { userMainWallet } = useAuth();
  const navigate = useNavigate();
  const { confirmPrivKey, retiro } = useBlockChainContext();
  const [privKey, setPrivKey] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPrivKey(value);
  };
  return (
    <div className="popup-overflow">
      <div className="popup-box">
        <h1 className="blue mb-20 text-center">Ya casi!</h1>
        <h3 className="mb-20 text-center">
          Por ultimo, por favor introduzca la llave privada de su cartera:
        </h3>
        <p className="text-center orange">
          <b>{userMainWallet.name}</b>
        </p>
        <p className="text-center mb-20 word-break">{userMainWallet.wallet}</p>
        <input
          type="text"
          value={privKey}
          required
          id="privKey"
          onChange={handleChange}
          className="mb-20"
          placeholder="Llave privada"
        />
        <small className="text-center mb-20">
          Pago Cash no almacena de ninguna forma tus llaves privadas
        </small>
        <button
          className="secondary-button mb-20 w-100"
          onClick={async (e) => {
            e.stopPropagation();
            setLoading(true);
            setError("");
            if (!confirmPrivKey(privKey)) {
              setLoading(false);
              return setError("Llave privada no coincide con la wallet");
            }
            try {
              const transaction = await retiro(privKey, ammount);
              console.log(transaction);
              navigate(`/success?hash=${transaction.hash}`);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setError(error.message);
            }
          }}
        >
          <h3>Listo</h3>
        </button>
        {error && <div className="error">{error}</div>}
        {loading && <Loading />}
      </div>
    </div>
  );
};
export default Operacion;
