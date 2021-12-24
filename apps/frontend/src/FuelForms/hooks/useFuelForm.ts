import FuelFormRepository from "@/repositories/FuelFormRepository";
import { IFuelFormPopulate } from "@/interfaces";
import { useState } from "react";

export default function useFuelForm(id: number) {
  const [fuelForm, setFuelForm] = useState<undefined | IFuelFormPopulate>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FuelFormRepository.fetchOne(id).then((res) => {
      setFuelForm(res);
      setLoading(false);
    });
  }, []);

  return { fuelForm, loading };
}
