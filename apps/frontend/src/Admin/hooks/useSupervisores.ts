import { fetchEnterpriseUsersByRole } from "@/firebase/firestore";
import { useEffect, useState } from "react";

export default function useSupervisores() {
  const [supervisores, setSupervisores] = useState<any[] | null>(null);

  useEffect(() => {
    fetchEnterpriseUsersByRole();
  }, []);

  return supervisores;
}
