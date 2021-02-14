import React from "react";

const Form = () => {
  return (
    <div className="App">
      <h1>Project Formulario</h1>
      <div>
        <div class="bs-example">
          <form method="post">
            <label class="col-sm-2 col-form-label" for="name">
              Nombre:
              <input
                class="form-control"
                id="name"
                type="text"
                name="name"
                placeholder="Ingrese su nombre"
                required=""
              />
            </label>
            <label class="col-sm-2 col-form-label" for="email">
              Email:
              <input
                class="form-control"
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su Email"
                required=""
              />
            </label>
            <label class="col-sm-2 col-form-label" for="password">
              Contraseña:
              <input
                class="form-control"
                id="password"
                type="password"
                name="password"
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
