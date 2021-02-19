import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

const Login = ({ history }) => {
  const [state, setState] = useState({ email: "", password: "" });
  
  function seeCookie(data) {
    Cookies.set("token", data.token)
    Cookies.set("user", data.user)
  }

  async function login(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post("http://localhost:3030/login", state);
    console.log("response", response);
    if (response.data.token) {
      seeCookie(response.data);
      history.push("/");
    } else {
      console.error(response.data);
    }
  }
  return (
    <div className="login">
      <h1>Inicio de sesión</h1>
      <div className="formContainer">
        <form className={"loginForm"} onSubmit={login}>
          <label className="formLabel" for="email">
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
          <label className="formLabel" for="password">
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
