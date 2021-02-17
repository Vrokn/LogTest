import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import List from "./Pages/List";
import Form from "./Pages/Form";
import Login from "./Pages/Login";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/register" component={Form} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}
