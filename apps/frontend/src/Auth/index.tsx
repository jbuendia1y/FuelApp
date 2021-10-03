import "./auth.scss";
import { Route, Switch } from "react-router";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";

export default function Auth() {
  return (
    <div className="auth">
      <div className="auth-box">
        <Switch>
          <Route path="/login">
            <AuthLogin />
          </Route>
          <Route path="/register">
            <AuthRegister />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
