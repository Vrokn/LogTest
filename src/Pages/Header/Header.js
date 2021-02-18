import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = ({ history }) => {
  const [bgColor, setBgColor] = useState(false);

  return (
    <div className={bgColor ? "bgdark" : "bgligth"}>
      <div className={bgColor ? "hddark" : "hdligth"}>
        <p>MMLTEST</p>
        <div className={"signUpLinks"}>
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
            <button className={"signUpBtn"}>Sing in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
