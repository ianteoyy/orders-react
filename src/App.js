import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Order from "./components/Order";
import CheckOrder from "./components/CheckOrder";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route exact path="/check">
          <CheckOrder />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
