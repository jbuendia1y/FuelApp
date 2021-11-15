import useRole from "@/hooks/useRole";
import useUser from "@/hooks/useUser";
import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "../Loading";
import ProtectedRoute from "./protectedRoute";

const Auth = lazy(() => import("@/Auth"));
const Develop = lazy(() => import("@/Develop"));
const Compose = lazy(() => import("@/Compose"));
const Admin = lazy(() => import("@/Admin"));
const Vehicles = lazy(() => import("@/Vehicles"));
const Settings = lazy(() => import("@/Settings"));
const Historic = lazy(() => import("@/Historic"));
const Profile = lazy(() => import("@/Profile"));
const Enterprises = lazy(() => import("@/Enterprises"));
const PageNotFound = lazy(() => import("@/PageNotFound"));
const Requests = lazy(() => import("@/Requests"));

export default function Routes() {
  const user = useUser();
  const role = useRole();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>

        <Route path={["/login", "/register"]} exact>
          <Auth />
        </Route>

        <ProtectedRoute path="/compose/*" isAuth={user}>
          <Compose />
        </ProtectedRoute>

        <ProtectedRoute path="/historic" isAuth={user} exact>
          <Historic />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" isAuth={user} exact>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path={["/enterprises", "/enterprises/:enterpriseId"]}>
          <Enterprises />
        </ProtectedRoute>

        {process.env.NODE_ENV === "development" && (
          <ProtectedRoute path="/develop" isAuth={user} exact>
            <Develop />
          </ProtectedRoute>
        )}

        <ProtectedRoute path="/settings" isAuth={user} exact>
          <Settings />
        </ProtectedRoute>

        <ProtectedRoute path="/vehicles" isAuth={user} exact>
          <Vehicles />
        </ProtectedRoute>

        <ProtectedRoute path={["/requests/access"]} isAuth={user} exact>
          <Requests />
        </ProtectedRoute>

        <ProtectedRoute
          path={["/supervisores", "/inject/forms"]}
          isAuth={user}
          currentRole={role}
          role={"admin"}
          exact
        >
          <Admin />
        </ProtectedRoute>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
