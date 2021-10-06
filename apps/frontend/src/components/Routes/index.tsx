import Auth from "@/Auth";
import useUser from "@/hooks/useUser";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../Loading";
import ProtectedRoute from "./protectedRoute";

const Compose = lazy(() => import("@/Compose"));
const Historic = lazy(() => import("@/Historic"));
const Profile = lazy(() => import("@/Profile"));
const Enterprises = lazy(() => import("@/Enterprises"));
const PageNotFound = lazy(() => import("@/PageNotFound"));

export default function Routes() {
  const user = useUser();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={["/login", "/register"]} exact>
          <Auth />
        </Route>

        <ProtectedRoute path="/compose/*" isAuth={user}>
          <Compose />
        </ProtectedRoute>

        <ProtectedRoute path="/historic" isAuth={user}>
          <Historic />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" isAuth={user} exact>
          <Profile />
        </ProtectedRoute>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
