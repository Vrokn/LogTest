import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="App">
        <h1>Project Home</h1>
        {/* Link to List.js */}
        <Link to={"./login"}>
          <button variant="raised">Log In</button>
        </Link>
        <Link to={"./register"}>
          <button variant="raised">Sing In</button>
        </Link>
      </div>
    );
  }

export default Home;
