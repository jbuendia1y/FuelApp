import { Redirect, Route } from "react-router";
import { ProtectedRouteProps } from "./interfaces";

export default function ProtectedRoute({
  children,
  path,
  isAuth,
  currentRole,
  role,
  ...rest
}: ProtectedRouteProps) {
  if (!!isAuth === false) return <Redirect to="/login" />;

  return (
    <Route path={path} {...rest}>
      {currentRole !== role && <Redirect to="/login" />}
      {children}
    </Route>
  );
}
