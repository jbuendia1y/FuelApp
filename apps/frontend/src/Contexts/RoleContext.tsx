import { getRoleOfUserInEnterprise } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useUser from "@/hooks/useUser";
import { createContext, useEffect, useState } from "react";

const RoleContext = createContext<null | "admin" | "supervisor">(null);

export function RoleContextProvider(props: any) {
  const [role, setRole] = useState<null | "admin" | "supervisor">(null);
  const user = useUser();
  const { currentEnterprise } = useCurrentEnterprise();

  useEffect(() => {
    if (!user) return;
    if (!currentEnterprise) return;
    getRoleOfUserInEnterprise(user.uid, currentEnterprise.id)
      .then(setRole)
      .catch((err) => {
        setRole(null);
      });
  }, [user, currentEnterprise]);

  return (
    <RoleContext.Provider value={role}>{props.children}</RoleContext.Provider>
  );
}

export default RoleContext;
