import "./auth.scss";
import { Route, Switch } from "react-router";
import AuthLogin from "./components/AuthLogin";

export default function Auth() {
  return (
    <div className="auth">
      <div className="auth-box">
        <Switch>
          <Route path="/login">
            <AuthLogin />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
