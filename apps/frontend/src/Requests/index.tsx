import { lazy } from "react";
import { Route, Switch } from "react-router";

const AccessRequests = lazy(() => import("./AccessRequests"));

export default function Requests() {
  return (
    <div className="requests">
      <div className="requests-box">
        <Switch>
          <Route path={["/requests/access"]}>
            <AccessRequests />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
