import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Loading from "../Loading";
function Login({ setAccessForm }) {
  const { logIn } = useAuth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loginUser = async (email, pass) => {
    setLoading(true);
    try {
      await logIn(email, pass);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [id]: id === "email" ? value.trim() : value,
    }));
  };
  return (
    <div className="access-form-container">
      <form
        className="access-form"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(login.email, login.password);
        }}
      >
        {loading && <Loading></Loading>}
        {error && <small className="error">{error}</small>}
        <h1>Ingresa</h1>
        <input
          type="text"
          id="email"
          value={login.email}
          onChange={handleChange}
          placeholder="Telefono o Correo"
        />
        <input
          type="password"
          value={login.password}
          onChange={handleChange}
          id="password"
          placeholder="Contraseña"
        />
        <button className="secondary-button w-100">Entrar</button>
        <p className="black">
          No tienes una cuenta aun?{" "}
          <span className="blue" onClick={() => setAccessForm(true)}>
            Registrate acá.
          </span>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
