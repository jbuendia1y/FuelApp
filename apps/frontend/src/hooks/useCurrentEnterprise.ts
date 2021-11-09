import CurrentEnterpriseContextProvider from "@/Contexts/CurrentEnterpriseContext";
import EnterpriseVehicleContext from "@/Contexts/EnterpriseVehicleContext";
import { useContext } from "react";

export default function useCurrentEnterprise() {
  const currentEnterprise = useContext(CurrentEnterpriseContextProvider);
  const currentEnterpriseVehicle = useContext(EnterpriseVehicleContext);
  return {
    ...currentEnterprise,
    ...currentEnterpriseVehicle,
    get enterprise(): undefined | { id: string; vehicle: string } {
      if (!currentEnterprise.currentEnterprise) return undefined;
      if (!currentEnterpriseVehicle.currentEnterpriseVehicle) return undefined;
      return {
        id: currentEnterprise.currentEnterprise.id,
        vehicle: currentEnterpriseVehicle.currentEnterpriseVehicle,
      };
    },
  };
}
