import RoleContext from "@/Contexts/RoleContext";
import { useContext } from "react";

export default function useRole() {
  const role = useContext(RoleContext);

  return role;
}
