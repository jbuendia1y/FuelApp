import { fetchHistoric } from "@/firebase/firestore";
import { useEffect, useState } from "react";
import useUser from "./useUser";

export default function useFuelsPerformance() {
  const user = useUser();
  const [data, setData] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user && !data)
      fetchHistoric(user.uid).then((res) => {
        setData(
          res.map((item) => {
            return {
              id: item.id,
              ...item.data(),
            };
          })
        );
        setLoading(false);
      });
  }, [user]);

  return { fuelsPerformance: data, loading };
}
