import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [state, setState] = useState({ email: "", password: "" });
  async function login(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post("/login", state);
    console.log("response", response);
    history.push("/");
  }
  return (
    <div className="login">
      <h1>Inicio de sesión</h1>
      <div class="formContainer">
        <form className={"loginForm"} onSubmit={login}>
          <label class="formLabel" for="email">
            E-mail:
            <input
              class="formInput"
              id="email"
              type="email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
              value={state.email}
              placeholder="Ingrese su correo electrónico..."
              required
            />
          </label>
          <label class="formLabel" for="password">
            Contraseña:
            <input
              class="formInput"
              id="password"
              type="password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
              value={state.password}
              placeholder="Ingrese su contraseña..."
              required
            />
          </label>
          <p>
            ¿No tienes una cuenta? <Link to={"./register"}> Registrate</Link>
          </p>
          <div>
            <button class="loginBtn" type="submit">
              Ingresa
            </button>
              <Link to={"./"}> Volver </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
