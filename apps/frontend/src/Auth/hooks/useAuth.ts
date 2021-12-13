import AuthContext from "@/Auth/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}
