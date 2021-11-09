import { Route, Switch } from "react-router";
import Inject from "./pages/Inject";
import Supervisores from "./pages/Supervisores";

export default function Admin() {
  return (
    <div className="admin">
      <div className="admin-box">
        <Switch>
          <Route path="/supervisores">
            <Supervisores />
          </Route>
          <Route path="/inject/forms">
            <Inject />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
