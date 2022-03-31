import React, { useState } from "react";
import Operaciones from "./Operaciones";
function Botones() {
  const [operaciones, setOperaciones] = useState();

  return (
    <>
      <div className="transaction-buttons mb-20">
        <button
          className="secondary-button"
          onClick={() => setOperaciones("Cargar")}
        >
          <span className="material-icons-outlined">add_circle_outline</span>{" "}
          <h2>Cargar $</h2>
        </button>
        <button
          className="secondary-button"
          onClick={() => setOperaciones("Retirar")}
        >
          <span className="material-icons-outlined">remove_circle_outline</span>{" "}
          <h2>Retirar $</h2>
        </button>
      </div>
      {operaciones && (
        <Operaciones
          setOperaciones={setOperaciones}
          operaciones={operaciones}
        />
      )}
    </>
  );
}

export default Botones;
