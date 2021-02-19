import React, { useState } from "react";
import axios from "axios";
import "./CreateCourse.css";
import { Link } from "react-router-dom";

const CreateCourse = ({ history }) => {
  const [state, setState] = useState({ title: "", description: "", image: "" });
  async function register(e) {
    //llamado a Axios
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3030/createCourse",
      state
    );
    console.log("response", response);
    history.push("/courses");
  }

  return (
    <div className={"register"}>
      <h1>Crea un curso</h1>
      <div className={"formContainer"}>
        <form className={"registerForm"} onSubmit={register}>
          <label className={"formLabel"} for="title">
            Nombre del curso:
            <input
              onChange={(e) => setState({ ...state, title: e.target.value })}
              value={state.name}
              className={"formInput"}
              id="title"
              type="text"
              placeholder="Ingrese el nombre del curso"
              required=""
            />
          </label>
          <label className={"formLabel"} for="description">
            Descripción del curso:
            <input
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              value={state.description}
              className={"formInput"}
              id="description"
              type="text"
              placeholder="Ingrese la descripción del curso"
              required=""
            />
          </label>
          <label className={"formLabel"} for="image">
            Imagen del curso:
            <input
              onChange={(e) => setState({ ...state, image: e.target.value })}
              value={state.image}
              className={"formInput"}
              id="image"
              type="url"
              placeholder="Ingrese link de la imagen del curso"
            />
          </label>
          <div>
            <button className={"registerBtn"} type="submit">
              Crear
            </button>
            <Link to={"./"}> Volver </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
