import { fetchEnterprises } from "@/firebase/firestore";
import { useEffect, useState } from "react";

export default function useEnterprises() {
  const [enterprises, setEnterprises] = useState<null | any[]>(null);
  useEffect(() => {
    fetchEnterprises().then((res) => {
      const data: any[] = res.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setEnterprises(data);
    });
  }, []);

  return { enterprises };
}
