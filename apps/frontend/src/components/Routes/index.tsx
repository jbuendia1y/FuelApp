import Auth from "@/Auth";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const PageNotFound = lazy(() => import("@/PageNotFound"));

export default function Routes() {
  return (
    <Suspense fallback={<div>Loading ....</div>}>
      <Switch>
        <Route path={["/login", "/register"]}>
          <Auth />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
