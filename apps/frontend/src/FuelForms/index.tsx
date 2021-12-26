import { Switch, Route } from "react-router-dom";
import { lazy } from "react";
import FuelForm from "./pages/FuelForm";

const FuelFormsPage = lazy(() => import("./pages/FuelForms"));

export default function FuelForms() {
  return (
    <Switch>
      <Route path="/fuel-forms" exact>
        <FuelFormsPage />
      </Route>
      <Route
        path="/fuel-forms/:id"
        render={(props) => {
          return <FuelForm id={props.match.params.id}></FuelForm>;
        }}
        exact
      ></Route>
    </Switch>
  );
}
