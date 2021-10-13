import { getRoleOfUserInEnterprise } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useUser from "@/hooks/useUser";
import { createContext, useEffect, useState } from "react";

const RoleContext = createContext<null | "admin" | "supervisor">(null);

export function RoleContextProvider(props: any) {
  const [role, setRole] = useState<null | "admin" | "supervisor">(null);
  const user = useUser();
  const { data } = useCurrentEnterprise();

  useEffect(() => {
    if (!user) return;
    if (!data) return;
    getRoleOfUserInEnterprise(user.uid, data.id)
      .then(setRole)
      .catch((err) => {
        setRole(null);
      });
  }, [user, data]);

  return (
    <RoleContext.Provider value={role}>{props.children}</RoleContext.Provider>
  );
}

export default RoleContext;
