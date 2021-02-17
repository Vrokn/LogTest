import React, { useState } from "react";
import axios from "axios";

const Form = ({ history }) => {
  const [state, setState] = useState({ email: "", name: "", password: "" });
  async function register(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post("/register", state);
    console.log("response", response);
    history.push("/login");
  }
  return (
    <div className="App">
      <h1>Project Formulario</h1>
      <div>
        <div class="bs-example">
          <form onSubmit={register}>
            <label class="col-sm-2 col-form-label" for="name">
              Nombre:
              <input
                onChange={(e) => setState({ ...state, name: e.target.value })}
                value={state.name}
                class="form-control"
                id="name"
                type="text"
                placeholder="Ingrese su nombre"
                required=""
              />
            </label>
            <label class="col-sm-2 col-form-label" for="email">
              Email:
              <input
                onChange={(e) => setState({ ...state, email: e.target.value })}
                value={state.email}
                class="form-control"
                id="email"
                type="email"
                placeholder="Ingrese su Email"
                required=""
              />
            </label>
            <label class="col-sm-2 col-form-label" for="password">
              Contraseña:
              <input
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                value={state.password}
                class="form-control"
                id="password"
                type="password"
                placeholder="Ingrese su Password"
                required=""
              />
              <button class="btn btn-primary" type="submit">
                Registrarse
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
