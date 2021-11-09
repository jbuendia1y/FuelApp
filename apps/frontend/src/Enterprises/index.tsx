import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import "./enterprises.scss";

const SearchCompany = lazy(() => import("./components/SearchCompany"));
const Enterprise = lazy(() => import("./Enterprise"));

export default function Enterprises() {
  return (
    <div className="enterprises">
      <div className="enterprises-box">
        <Switch>
          <Route path="/enterprises" exact>
            <SearchCompany />
          </Route>
          <Route path="/enterprises/:enterpriseId" exact>
            <Enterprise />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
