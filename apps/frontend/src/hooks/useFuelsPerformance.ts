import { fetchHistoric } from "@/firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import useUser from "./useUser";

export default function useFuelsPerformance() {
  const user = useUser();
  const [data, setData] = useState<
    null | QueryDocumentSnapshot<DocumentData>[]
  >(null);

  useEffect(() => {
    if (user) fetchHistoric(user.uid).then(setData);
  }, [user]);

  return { fuelsPerformance: data };
}
