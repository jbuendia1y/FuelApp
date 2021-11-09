import { memberOfEnterprises } from "@/firebase/firestore";
import useUser from "@/hooks/useUser";
import { createContext, useEffect, useState } from "react";

const EnterprisesMemberContext = createContext<any[] | null>(null);

export function EnterprisesMemberContextProvider(props: any) {
  const user = useUser();
  const [enterprisesMember, setEnterprisesMember] = useState<any[] | null>(
    null
  );

  useEffect(() => {
    if (!user) return;
    if (enterprisesMember) return;
    memberOfEnterprises(user.uid).then(setEnterprisesMember);
  }, [user]);

  return (
    <EnterprisesMemberContext.Provider value={enterprisesMember}>
      {props.children}
    </EnterprisesMemberContext.Provider>
  );
}

export default EnterprisesMemberContext;
