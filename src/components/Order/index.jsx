import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProductList from "./ProductList";
import OrderForm from "./OrderForm";
import Acknowledgement from "./Acknowledgement";

const Order = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ProductList />
        </Route>
        <Route path={`${path}/form`}>
          <OrderForm />
        </Route>
        <Route path={`${path}/acknowledgement`}>
          <Acknowledgement />
        </Route>
      </Switch>
    </>
  );
};

export default Order;
