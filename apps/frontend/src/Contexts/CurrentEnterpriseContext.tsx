import useEnterprisesMember from "@/hooks/useEnterprisesMember";
import { getDataFromStorage } from "@/utils/handleStorage";
import { createContext, useEffect, useState } from "react";

const CurrentEnterpriseContext = createContext<{
  currentEnterprise: null | any;
  changeCurrentEnterprise: any;
}>({ currentEnterprise: null, changeCurrentEnterprise: undefined });

export function CurrentEnterpriseContextProvider(props: any) {
  const [enterprise, setEnterprise] = useState<any | null>(null);
  const enterprisesMember = useEnterprisesMember();
  const [onLocal, setOnLocal] = useState(false);

  const changeCurrentEnterprise = (enterpriseId: string) => {
    if (enterpriseId.includes("NONE")) {
      setOnLocal(true);
      return setEnterprise(null);
    }
    const existEnterprise = enterprisesMember?.filter(
      (item) => item.id === enterpriseId
    );
    if (!existEnterprise) return;
    if (existEnterprise.length === 0) throw new Error("Wrong enteprise id");
    setOnLocal(true);
    setEnterprise(existEnterprise[0]);
  };

  useEffect(() => {
    if (!enterprisesMember) return;
    if (enterprisesMember.length === 0) return;
    if (enterprise) return;
    if (onLocal) return;
    const defaultEnterprise = getDataFromStorage("default-enterprise");
    if (defaultEnterprise) changeCurrentEnterprise(defaultEnterprise);
  }, [enterprisesMember, enterprise]);

  return (
    <CurrentEnterpriseContext.Provider
      value={{ currentEnterprise: enterprise, changeCurrentEnterprise }}
    >
      {props.children}
    </CurrentEnterpriseContext.Provider>
  );
}

export default CurrentEnterpriseContext;
