import UserRepository from "@/Auth/repositories/UserRepository";
import { useEffect, useState } from "react";

export default function useSupervisores() {
  const [supervisores, setSupervisores] = useState<any[] | null>(null);

  useEffect(() => {
    UserRepository.fetchAll({
      role: "Supervisor",
    }).then((res) => {
      setSupervisores(res);
    });
  }, []);

  return supervisores;
}
