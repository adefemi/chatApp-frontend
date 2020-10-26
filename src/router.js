import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Home from "./Pages/home";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
