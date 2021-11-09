import { RouteProps } from "react-router";

type Roles = "admin" | "supervisor" | "chofer" | null;

export interface ProtectedRouteProps extends RouteProps {
  children?: any;
  isAuth?: any;
  role?: Roles;
  currentRole?: Roles;
}
