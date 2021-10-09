import { Redirect, Route } from "react-router";
import { ProtectedRouteProps } from "./interfaces";

export default function ProtectedRoute({
  children,
  path,
  isAuth,
  ...rest
}: ProtectedRouteProps) {
  return (
    <Route path={path} {...rest}>
      {isAuth === null && <Redirect to="/login" />}
      {children}
    </Route>
  );
}
