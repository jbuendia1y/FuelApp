import { IFuelForm } from "@/interfaces";
import FuelFormRepository from "@/repositories/FuelFormRepository";
import { useEffect, useState } from "react";

export default function useFuelForms(params?: {
  vehicleId?: number;
  userId?: number;
}) {
  const [fuelForms, setFuelForms] = useState<undefined | IFuelForm[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FuelFormRepository.fetchAll({
      vehicleId: params?.vehicleId,
      userId: params?.userId,
    }).then((res) => {
      setFuelForms(res);
      setLoading(false);
    });
  }, []);

  return { fuelForms, loading };
}
