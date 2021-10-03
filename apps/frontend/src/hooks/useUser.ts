import { onAuthChanged } from "@/firebase/client";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthChanged(setUser);
  }, []);

  return user;
}
