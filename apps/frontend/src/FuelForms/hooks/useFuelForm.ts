import FuelFormRepository from "@/repositories/FuelFormRepository";
import { IFuelFormPopulate } from "@/interfaces";
import { useEffect, useState } from "react";

export default function useFuelForm(id: string) {
  const [fuelForm, setFuelForm] = useState<undefined | IFuelFormPopulate>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FuelFormRepository.fetchOne(id).then((res) => {
      setFuelForm(res as any);
      setLoading(false);
    });
  }, []);

  return { fuelForm, loading };
}
