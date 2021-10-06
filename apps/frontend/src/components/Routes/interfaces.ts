import { RouteProps } from "react-router";

export interface ProtectedRouteProps extends RouteProps {
  children?: any;
  isAuth?: any;
}
