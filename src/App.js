import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import Cookies from "js-cookie";

export default function App() {
  const user = Cookies.get("user");
  const admin = user ? JSON.parse(user)?.role === "Admin" : false;
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {admin && <Route path="/users" component={Users} />}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
