import useEnterprisesMember from "@/hooks/useEnterprisesMember";
import { createContext, useEffect, useState } from "react";

const CurrentEnterpriseContext = createContext<{
  data: null | any;
  changeCurrentEnterprise: any;
}>({ data: null, changeCurrentEnterprise: undefined });

export function CurrentEnterpriseContextProvider(props: any) {
  const [enterprise, setEnterprise] = useState<any | null>(null);
  const enterprisesMember = useEnterprisesMember();

  useEffect(() => {
    console.log(enterprise);
  }, [enterprisesMember, enterprise]);

  const changeCurrentEnterprise = (enterpriseId: string) => {
    if (enterpriseId === "NONE") return setEnterprise(null);
    const existEnterprise = enterprisesMember?.filter(
      (item) => item.id === enterpriseId
    );
    if (!existEnterprise) return;
    if (existEnterprise.length === 0) throw new Error("Wrong enteprise id");

    setEnterprise(existEnterprise[0]);
  };

  return (
    <CurrentEnterpriseContext.Provider
      value={{ data: enterprise, changeCurrentEnterprise }}
    >
      {props.children}
    </CurrentEnterpriseContext.Provider>
  );
}

export default CurrentEnterpriseContext;
