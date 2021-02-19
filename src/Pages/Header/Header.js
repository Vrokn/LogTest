import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";

const Header = ({ history }) => {
  const [bgColor, setBgColor] = useState(false);
  const user = Cookies.get("user");
  const admin = user ? JSON.parse(user)?.role === "Admin" : false;
  const isauth = Cookies.get("token");

  const removeCookies = () => {
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <div className={bgColor ? "bgdark" : "bgligth"}>
      <div className={bgColor ? "hddark" : "hdligth"}>
        <div className={"headLinks"}>
          <Link
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./"}
          >
            <p>LOGTEST</p>
          </Link>
          <Link
            className={isauth ? "userLink" : "hidden"}
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./courses"}
          >
            <button className={"signUpBtn"}>Courses</button>
          </Link>
        </div>

        <div className={isauth ? "hidden" : "signUpLinks"}>
          <Link
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./login"}
          >
            <button className={"signUpBtn"}>Log in</button>
          </Link>
          <Link
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./register"}
          >
            <button className={"signUpBtn"}>Sign in</button>
          </Link>
        </div>
        <div className={isauth ? "logout" : "hidden"}>
          <Link
            className={admin ? "userLink" : "hidden"}
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./createCourse"}
          >
            <button className={"signUpBtn"}>CreateCourse</button>
          </Link>
          <Link
            className={admin ? "userLink" : "hidden"}
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./users"}
          >
            <button className={"signUpBtn"}>Users</button>
          </Link>
          <Link
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./"}
          >
            <button className={"signUpBtn"} onClick={removeCookies}>
              Logout
            </button>
          </Link>
          <Link
            onMouseOver={() => {
              setBgColor(true);
            }}
            onMouseLeave={() => {
              setBgColor(false);
            }}
            to={"./account"}
          >
            <button className={"signUpBtn"}>Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
