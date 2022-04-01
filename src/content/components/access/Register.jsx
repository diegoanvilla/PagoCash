import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Loading from "../Loading";
function Register({ setAccessForm }) {
  const { signIn } = useAuth();
  const [register, setRegister] = useState({
    email: "",
    nombre: "",
    telefono: "",
    userName: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      // [id]: value,
      [id]: id === "email" ? value.trim() : value,
    }));
  };
  const signInUser = async () => {
    setLoading(true);
    if (register.confirmPass === register.password) {
      try {
        return await signIn(
          register.email,
          register.password,
          register.nombre,
          register.userName,
          register.telefono
        );
      } catch (err) {
        setLoading(false);
        return setError(err.message);
      }
    }
    setLoading(false);
    setError("Las contraseñas no coinciden");
  };
  return (
    <div className="access-form-container">
      <form
        className="access-form"
        onSubmit={async (e) => {
          e.preventDefault();
          await signInUser();
        }}
      >
        {error && <small className="error">{error}</small>}
        {loading && <Loading />}
        <h1>Registrate</h1>
        <input
          type="number"
          value={register.telefono}
          id="telefono"
          onChange={handleChange}
          placeholder="Telefono"
        />
        <input
          required
          type="email"
          placeholder="Correo"
          value={register.email}
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={register.nombre}
          id="nombre"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={register.userName}
          id="userName"
          onChange={handleChange}
          placeholder="Nombre de Usuario"
        />
        <input
          required
          minLength="5"
          type="password"
          id="password"
          value={register.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <input
          required
          minLength="5"
          type="password"
          id="confirmPass"
          value={register.confirmPass}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <button className="secondary-button w-100">Entrar</button>

        <p className="black">
          Ya tienes cuenta?{" "}
          <span className="blue" onClick={() => setAccessForm(false)}>
            Inicia Sesión acá.
          </span>{" "}
        </p>
      </form>
    </div>
  );
}

export default Register;
