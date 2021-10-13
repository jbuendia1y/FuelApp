import EnterpriseContext from "@/Contexts/EnterprisesMemberContext";
import { useContext } from "react";

export default function useEnterprisesMember() {
  const enterprisesMember = useContext(EnterpriseContext);

  return enterprisesMember;
}
