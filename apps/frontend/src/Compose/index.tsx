import { lazy } from "react";
import { Route, Switch } from "react-router";

const FuelForm = lazy(() => import("./pages/Fuel-form"));

export default function Compose() {
  return (
    <Switch>
      <Route path="/compose/fuel-form">
        <FuelForm />
      </Route>
    </Switch>
  );
}
