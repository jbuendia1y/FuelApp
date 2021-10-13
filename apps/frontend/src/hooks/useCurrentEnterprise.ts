import CurrentEnterpriseContextProvider from "@/Contexts/CurrentEnterpriseContext";
import { useContext } from "react";

export default function useCurrentEnterprise() {
  const currentEnterprise = useContext(CurrentEnterpriseContextProvider);

  return currentEnterprise;
}
