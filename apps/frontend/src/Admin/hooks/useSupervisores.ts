import { fetchEnterpriseUsersByRole } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

export default function useSupervisores() {
  const [supervisores, setSupervisores] = useState<any[] | null>(null);
  const user = useUser();

  const { currentEnterprise } = useCurrentEnterprise();
  useEffect(() => {
    if (!currentEnterprise) return;
    if (!user) return;
    fetchEnterpriseUsersByRole(currentEnterprise.id, "supervisor").then(
      (res) => {
        setSupervisores(res.docs.map((item) => item.data()));
      }
    );
  }, [currentEnterprise]);

  return supervisores;
}
