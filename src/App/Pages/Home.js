import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="App">
        <h1>Project Home</h1>
        {/* Link to List.js */}
        <Link to={"./list"}>
          <button variant="raised">My List</button>
        </Link>
        <Link to={"./register"}>
          <button variant="raised">Ir al formulario </button>
        </Link>
      </div>
    );
  }

export default Home;
