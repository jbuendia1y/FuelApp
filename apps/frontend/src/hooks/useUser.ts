import UserContext from "@/Contexts/UserContext";
import { useContext } from "react";

export default function useUser() {
  const user = useContext(UserContext);

  return user;
}
