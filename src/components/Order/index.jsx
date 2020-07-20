import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProductList from "./ProductList";
import OrderForm from "./OrderForm";

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
      </Switch>
    </>
  );
};

export default Order;
