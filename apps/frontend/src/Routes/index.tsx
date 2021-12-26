import useAuth from "@/Auth/hooks/useAuth";
import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import ProtectedRoute from "./protectedRoute";

const Auth = lazy(() => import("@/Auth"));
const Compose = lazy(() => import("@/Compose"));
const Profile = lazy(() => import("@/Profile"));
const Vehicles = lazy(() => import("@/Vehicles"));
const FuelForms = lazy(() => import("@/FuelForms"));
const PageNotFound = lazy(() => import("@/PageNotFound"));

export default function Routes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>

        <Route path={"/login"} exact>
          {!!user ? <Redirect to={"/compose/fuel-form"} /> : <Auth />}
        </Route>

        <ProtectedRoute path="/compose/*" isAuth={user}>
          <Compose />
        </ProtectedRoute>

        {/*         <ProtectedRoute path="/historic" isAuth={user} exact>
          <Historic />
        </ProtectedRoute> */}

        <ProtectedRoute path="/profile" isAuth={user} exact>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path="/vehicles" isAuth={user} exact>
          <Vehicles />
        </ProtectedRoute>

        <ProtectedRoute
          path={["/fuel-forms", "/fuel-forms/:id"]}
          isAuth={user}
          exact
        >
          <FuelForms />
        </ProtectedRoute>

        {/*         {process.env.NODE_ENV === "development" && (
          <ProtectedRoute path="/develop" isAuth={user} exact>
            <Develop />
          </ProtectedRoute>
        )} */}

        {/*         <ProtectedRoute path={["/requests/access"]} isAuth={user} exact>
          <Requests />
        </ProtectedRoute> */}

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
