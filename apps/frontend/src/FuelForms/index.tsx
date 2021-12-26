import { Switch, Route } from "react-router-dom";
import { lazy } from "react";

const FuelFormsPage = lazy(() => import("./pages/FuelForms"));

export default function FuelForms() {
  const { fuelForms } = useFuelForms();

  return (
    <Switch basename="fuel-forms">
      <Route path="/">
        <FuelFormsPage />
      </Route>
      <Route path="/:id">
        <span>FuelForm</span>
      </Route>
    </Switch>
  );
}
