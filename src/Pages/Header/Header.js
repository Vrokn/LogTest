import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";

import { useAuth } from "../../utils/auth";

const removeCookies = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

const UserLink = ({ children, to, onClick, onMouseOver, onMouseLeave }) => {
  return (
    <Link
      className={"userLink"}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      to={to}
    >
      <button className="signUpBtn">{children}</button>
    </Link>
  );
};

const NotUserLinks = ({ onMouseOver, onMouseLeave }) => {
  return (
    <>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        to={"./login"}
      >
        Log in
      </UserLink>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        to={"./register"}
      >
        Sign in
      </UserLink>
    </>
  );
};

const AdminLinks = ({ onMouseOver, onMouseLeave }) => {
  return (
    <>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={"userLink"}
        to={"./createCourse"}
      >
        CreateCourse
      </UserLink>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={"userLink"}
        to={"./users"}
      >
        Users
      </UserLink>
    </>
  );
};

const UserLinks = ({ onMouseOver, onMouseLeave, onLogout }) => {
  return (
    <>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        to={"./"}
        onClick={onLogout}
      >
        Logout
      </UserLink>
      <UserLink
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        to={"./account"}
      >
        Account
      </UserLink>
    </>
  );
};

const Header = ({ history }) => {
  const { user, setUser } = useAuth();
  const [bgColor, setBgColor] = useState(false);

  const admin = user?.admin;

  return (
    <div className={bgColor ? "bgdark" : "bgligth"}>
      <div className={bgColor ? "hddark" : "hdligth"}>
        <div className="headLinks">
          <UserLink
            onMouseOver={() => setBgColor(true)}
            onMouseLeave={() => setBgColor(false)}
            to={"./"}
          >
            LOGTEST
          </UserLink>
          {user && (
            <UserLink
              onMouseOver={() => setBgColor(true)}
              onMouseLeave={() => setBgColor(false)}
              to={"./courses"}
            >
              Courses
            </UserLink>
          )}
        </div>

        <div className="headLinks">
          {!user && (
            <NotUserLinks
              onMouseOver={() => setBgColor(true)}
              onMouseLeave={() => setBgColor(false)}
            />
          )}
          {user && (
            <>
              {admin && (
                <AdminLinks
                  onMouseOver={() => setBgColor(true)}
                  onMouseLeave={() => setBgColor(false)}
                />
              )}
              <UserLinks
                onMouseOver={() => setBgColor(true)}
                onMouseLeave={() => setBgColor(false)}
                onLogout={() => {
                  removeCookies();
                  setUser(null);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
