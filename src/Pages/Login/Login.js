import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { useAuth } from "../../utils/auth";

function setCookie(data) {
  Cookies.set("token", data.token);
  Cookies.set("user", data.user);
}

async function login(state) {
  //llamado a Axios
  const response = await axios.post("/login", state);

  if (response.data.token) {
    setCookie(response.data);

    return response.data.user;
  } else {
    console.error(response.data);
    throw new Error(response.data);
  }
}

const Login = ({ history }) => {
  const [state, setState] = useState({ email: "", password: "" });
  const { setUser } = useAuth();

  return (
    <div className="login">
      <h1>Inicio de sesión</h1>
      <div className="formContainer">
        <form
          className={"loginForm"}
          onSubmit={(event) => {
            event.preventDefault();

            login(state).then((user) => {
              setUser(user);
              history.push("/");
            });
          }}
        >
          <label className="formLabel">
            E-mail:
            <input
              className="formInput"
              id="email"
              type="email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
              value={state.email}
              placeholder="Ingrese su correo electrónico..."
              required
            />
          </label>
          <label className="formLabel">
            Contraseña:
            <input
              className="formInput"
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
            <button className="loginBtn" type="submit">
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
