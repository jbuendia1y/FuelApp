import { lazy } from "react";
import { Route, Switch } from "react-router";
import LazyComponent from "./lazyComponent";

const PageNotFound = lazy(() => import("@/PageNotFound"));

export default function Routes() {
  return (
    <Switch>
      <Route path={["/login", "/register"]} exact>
        <LazyComponent></LazyComponent>
      </Route>
      <Route path="*">
        <LazyComponent>
          <PageNotFound />
        </LazyComponent>
      </Route>
    </Switch>
  );
}
