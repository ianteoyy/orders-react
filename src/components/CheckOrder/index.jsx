import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import OrderCheckForm from "./OrderCheckForm";

const CheckOrder = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <OrderCheckForm />
        </Route>
      </Switch>
    </>
  );
};

export default CheckOrder;
