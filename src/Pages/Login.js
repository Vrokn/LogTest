import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  const [state, setState] = useState({ email: "", password: "" });
  async function login(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post("/register", state);
    console.log("response", response);
    history.push("/");
  }
  return (
    <div className="App">
      <h1>Log In</h1>
      <div>
        <div class="bs-example">
          <form onSubmit={login}>
            <label class="col-sm-2 col-form-label" for="email">
              E-mail:
              <input
                class="form-control"
                id="email"
                type="email"
                onChange={(e) => setState({ ...state, email: e.target.value })}
                value={state.email}
                placeholder="Ingrese su Email"
                required
              />
            </label>
            <label class="col-sm-2 col-form-label" for="password">
              Contraseña:
              <input
                class="form-control"
                id="password"
                type="password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                value={state.password}
                placeholder="Ingrese su Password"
                required
              />
              <button class="btn btn-primary" type="submit">
                Ingresa
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
