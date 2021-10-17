import { fetchVehicles } from "@/firebase/firestore";
import { useEffect, useState } from "react";
import useCurrentEnterprise from "./useCurrentEnterprise";

export default function useVehicles() {
  const { currentEnterprise } = useCurrentEnterprise();
  const [vehicles, setVehicles] = useState<null | any[]>(null);

  useEffect(() => {
    if (!currentEnterprise) return;
    fetchVehicles(currentEnterprise.id).then((res) => {
      setVehicles(
        res.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        })
      );
    });
  }, [currentEnterprise]);

  return { vehicles };
}
