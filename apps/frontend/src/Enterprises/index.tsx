import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import "./enterprises.scss";

const SearchCompany = lazy(() => import("./components/SearchCompany"));
const Enterprise = lazy(() => import("./components/Enterprise"));

export default function Enterprises() {
  return (
    <div className="enterprises">
      <div className="enterprises-box">
        <Switch>
          <Route path="/" exact>
            <SearchCompany />
          </Route>
          <Route path="/:enterpriseId" exact>
            <Enterprise />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
