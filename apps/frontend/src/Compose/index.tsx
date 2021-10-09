import "./compose.scss";
import { Route, Switch } from "react-router";
import { lazy } from "react";

const FuelForm = lazy(() => import("./pages/fuel-form"));

export default function Compose() {
  return (
    <div className="compose">
      <Switch>
        <Route path="/compose/fuel-form" exact>
          <FuelForm />
        </Route>
      </Switch>
    </div>
  );
}
