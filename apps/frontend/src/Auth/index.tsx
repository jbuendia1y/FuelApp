import { Route, Switch } from "react-router";
import Login from "./pages/Login";

export default function Auth() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
