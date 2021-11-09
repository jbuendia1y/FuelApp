import {
  fetchUserEnterpriseVehicle,
  saveCurrentVehicle,
} from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useRole from "@/hooks/useRole";
import useUser from "@/hooks/useUser";
import useVehicles from "@/hooks/useVehicles";
import { createContext, useEffect, useState } from "react";

type ChangeVehicle = (placa: string) => void;

type States = {
  currentEnterpriseVehicle: null | undefined | string;
  changeCurrentEnterpriseVehicle: undefined | ChangeVehicle;
};

const EnterpriseVehicleContext = createContext<States>({
  currentEnterpriseVehicle: null,
  changeCurrentEnterpriseVehicle: undefined,
});

export function EnterpriseVehicleContextProvider(props: any) {
  const { currentEnterprise } = useCurrentEnterprise();
  const { vehicles } = useVehicles();
  const user = useUser();
  const role = useRole();

  const [currentEnterpriseVehicle, setCurrentEnterpriseVehicle] = useState<
    null | string
  >(null);

  const changeCurrentEnterpriseVehicle = (placa: string) => {
    if (!vehicles) return;
    const payload = vehicles.filter((item) => item.placa === placa);
    if (payload.length === 0) return;
    else if (payload[0] === undefined) return;
    setCurrentEnterpriseVehicle(placa);
    saveCurrentVehicle(user.uid, currentEnterprise.id, placa);
  };

  useEffect(() => {
    if (!role) return;
    if (role !== "chofer") return;

    (async function () {
      const UEV = await fetchUserEnterpriseVehicle(
        user.uid,
        currentEnterprise.id
      );
      !!UEV
        ? setCurrentEnterpriseVehicle(UEV)
        : console.log("YOU DONT HAVE SELECTED A VEHICLE");
    })();
  }, [currentEnterprise, role]);

  return (
    <EnterpriseVehicleContext.Provider
      value={{ changeCurrentEnterpriseVehicle, currentEnterpriseVehicle }}
    >
      {props.children}
    </EnterpriseVehicleContext.Provider>
  );
}

export default EnterpriseVehicleContext;
