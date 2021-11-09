import { fetchRequests } from "@/firebase/firestore";
import { useState, useEffect } from "react";
import useCurrentEnterprise from "./useCurrentEnterprise";

export default function useAccessRequests() {
  const [accessRequests, setAccessRequests] = useState<null | any[]>(null);
  const { currentEnterprise } = useCurrentEnterprise();

  useEffect(() => {
    if (!currentEnterprise) return;
    fetchRequests(currentEnterprise.id).then((res) => {
      setAccessRequests(res.docs.map((item) => item.data()));
    });
  }, [currentEnterprise]);

  return { accessRequests };
}
