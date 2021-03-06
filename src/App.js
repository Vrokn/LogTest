import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import Account from "./Pages/Account/Account";
import Courses from "./Pages/Courses/Courses";
import CreateCourse from "./Pages/CreateCourse/CreateCourse";

import { useAuth } from "./utils/auth";

export default function App() {
  const { user } = useAuth();

  const admin = user?.admin;

  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/account" component={Account} />
        <Route path="/courses" component={Courses} />
        {admin && <Route path="/createCourse" component={CreateCourse} />}
        {admin && <Route path="/users" component={Users} />}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
