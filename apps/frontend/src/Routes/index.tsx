import useAuth from "@/Auth/hooks/useAuth";
import { FUEL_FORMS_ROOT_PATH } from "@/FuelForms";
import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import ProtectedRoute from "./protectedRoute";

const Auth = lazy(() => import("@/Auth"));
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
          {!!user ? <Redirect to={"/fuel-forms"} /> : <Auth />}
        </Route>

        <ProtectedRoute path="/profile" isAuth={user} exact>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path="/vehicles" isAuth={user} exact>
          <Vehicles />
        </ProtectedRoute>

        <ProtectedRoute path={FUEL_FORMS_ROOT_PATH}>
          <FuelForms />
        </ProtectedRoute>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
