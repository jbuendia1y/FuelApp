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
  return (
    <Route path={path} {...rest}>
      {isAuth === null && currentRole !== role && <Redirect to="/login" />}
      {children}
    </Route>
  );
}
