import { fetchVehicles } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import { createContext, useEffect, useState } from "react";

type EVCStates = undefined | null | any[];
const EnterpriseVehiclesContext = createContext<undefined | null | any[]>(null);

export function EnterpriseVehiclesContextProvider(props: any) {
  const { currentEnterprise } = useCurrentEnterprise();
  const [enterpriseVehicles, setEnterpriseVehicles] = useState<EVCStates>(null);

  useEffect(() => {
    if (!currentEnterprise) return;
    fetchVehicles(currentEnterprise.id).then((res) => {
      if (res.empty) return setEnterpriseVehicles(null);
      setEnterpriseVehicles(
        res.docs.map((item) => {
          return { id: item.id, ...item.data() };
        })
      );
    });
  }, [currentEnterprise]);

  return (
    <EnterpriseVehiclesContext.Provider value={enterpriseVehicles}>
      {props.children}
    </EnterpriseVehiclesContext.Provider>
  );
}

export default EnterpriseVehiclesContext;
