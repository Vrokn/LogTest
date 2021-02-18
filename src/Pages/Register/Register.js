import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [state, setState] = useState({ email: "", name: "", password: "" });
  async function register(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post("/register", state);
    console.log("response", response);
    history.push("/login");
  }
  return (
    <div className={"register"}>
      <h1>Registrate</h1>
      <div className={"formContainer"}>
        <form className={"registerForm"} onSubmit={register}>
          <label className={"formLabel"} for="name">
            Nombre:
            <input
              onChange={(e) => setState({ ...state, name: e.target.value })}
              value={state.name}
              className={"formInput"}
              id="name"
              type="text"
              placeholder="Ingrese su nombre"
              required=""
            />
          </label>
          <label className={"formLabel"} for="email">
            Email:
            <input
              onChange={(e) => setState({ ...state, email: e.target.value })}
              value={state.email}
              className={"formInput"}
              id="email"
              type="email"
              placeholder="Ingrese su Email"
              required=""
            />
          </label>
          <label className={"formLabel"} for="password">
            Contraseña:
            <input
              onChange={(e) => setState({ ...state, password: e.target.value })}
              value={state.password}
              className={"formInput"}
              id="password"
              type="password"
              placeholder="Ingrese su Password"
              required=""
            />
          </label>
          <p>
            ¿Ya tienes una cuenta? <Link to={"./login"}> Ingresa</Link>{" "}
          </p>
          <div>
            <button className={"registerBtn"} type="submit">
              Registrarse
            </button>
            <Link to={"./"}> Volver </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
