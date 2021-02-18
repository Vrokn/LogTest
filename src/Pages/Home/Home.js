import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Home.css";

const Home = ({ history }) => {
  return (
    <>
      <Header />
      <div className="home">HOME DEL PROYECTO</div>
    </>
  );
};

export default Home;
