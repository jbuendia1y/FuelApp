import { IVehicle } from "@/interfaces";
import VehicleRepository from "@/repositories/VehicleRepository";
import { useEffect, useState } from "react";

export default function useVehicles() {
  const [vehicles, setVehicles] = useState<IVehicle[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    VehicleRepository.fetchAll().then((res) => {
      setVehicles(res);
      setLoading(false);
    });
  });

  return { loading, vehicles };
}
