import { onAuthChanged } from "@/firebase/client";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext<null | undefined | any>(null);

export function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<null | undefined | any>(
    localStorage.getItem("firebase-token") ? undefined : null
  );

  useEffect(() => {
    onAuthChanged((data) => {
      setUser(data);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserContext;
