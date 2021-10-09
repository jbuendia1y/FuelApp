import { fetchEnterprises } from "@/firebase/firestore";
import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function useEnterprises() {
  const [enterprises, setEnterprises] = useState<null | DocumentData[]>(null);
  useEffect(() => {
    fetchEnterprises().then((res) => {
      setEnterprises(res.docs);
    });
  }, []);

  return { enterprises };
}
