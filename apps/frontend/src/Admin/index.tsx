import { Route, Switch } from "react-router";
import Supervisores from "./pages/Supervisores";

export default function Admin() {
  return (
    <div className="admin">
      <div className="admin-box">
        <Switch>
          <Route path="/supervisores">
            <Supervisores />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
