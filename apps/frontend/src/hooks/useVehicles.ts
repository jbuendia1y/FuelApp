import EnterpriseVehiclesContext from "@/Contexts/EnterpriseVehiclesContext";
import { useContext } from "react";

export default function useVehicles() {
  const vehicles = useContext(EnterpriseVehiclesContext);

  return { vehicles };
}
