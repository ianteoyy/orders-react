import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Order from "./components/Order";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
