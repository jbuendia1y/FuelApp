import { Switch, Route } from "react-router-dom";
import { lazy } from "react";

export const FUEL_FORMS_ROOT_PATH = "/fuel-forms";

const FuelFormsPage = lazy(() => import("./pages/FuelForms"));
const FuelFormCompose = lazy(() => import("./pages/FuelFormCompose"));
const FuelFormPopulate = lazy(() => import("./pages/FuelForm"));

export default function FuelForms() {
  return (
    <Switch>
      <Route path={FUEL_FORMS_ROOT_PATH} exact>
        <FuelFormsPage />
      </Route>
      <Route path={FUEL_FORMS_ROOT_PATH + "/compose"} exact>
        <FuelFormCompose />
      </Route>
      <Route
        path={`${FUEL_FORMS_ROOT_PATH}/:id`}
        render={(props) => {
          return (
            <FuelFormPopulate
              id={parseInt(props.match.params.id)}
            ></FuelFormPopulate>
          );
        }}
        exact
      ></Route>
    </Switch>
  );
}
