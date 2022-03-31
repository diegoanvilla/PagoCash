import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import Loading from "../../Loading";
import zelle from "../../../images/zelle.png";
import { useNavigate } from "react-router-dom";

function Cargar({ setOperaciones, operaciones }) {
  const navigate = useNavigate();
  const { getOperacion } = useAuth();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const displayOptions = async () => {
    setLoading(true);
    let array = [];
    await getOperacion(operaciones).then((doc) => {
      doc.docs.map((doc) => {
        array.push({ uid: doc.id, ...doc.data() });
      });
    });
    console.log(array);
    setOptions(array);
    setLoading(false);
  };
  useEffect(() => {
    const app = async () => {
      await displayOptions();
    };
    return app();
  }, []);

  return (
    <div className="popup-overflow" onClick={() => setOperaciones()}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="blue text-center">{operaciones}</h1>
        <div className="wallet-list-box">
          {loading && <Loading />}
          {options.length > 0 ? (
            <>
              {options.map((index) => {
                return (
                  <div
                    className="wallet-list-item"
                    key={index.uid}
                    onClick={() =>
                      navigate(
                        `/operacion?operacion=${operaciones}&metodo=${index.uid}`
                      )
                    }
                  >
                    {index.uid === "Pago Movil" ? (
                      <p className="blue center-y">
                        <b>Pago Movil </b>
                        <span className="material-icons-outlined">
                          send_to_mobile
                        </span>
                      </p>
                    ) : (
                      <img src={zelle} className="wallet-list-item-image"></img>
                    )}
                    <p className="blue">
                      <b>{index.Cantidad}</b>{" "}
                      <span className="blue">
                        <b>{index.Moneda}</b>
                      </span>
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {!loading && (
                <div className="wallet-list-item">
                  Un error a ocurrido, vuelve a intentarlo
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cargar;
