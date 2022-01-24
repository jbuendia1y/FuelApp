import FuelFormRepository from "@/FuelForms/repositories/FuelFormRepository";
import { IFuelFormPopulate } from "@/interfaces";
import { useEffect, useState } from "react";
import VehicleRepository from "@/Vehicles/repositories/VehicleRepository";
import { TypeId } from "@/constants";
import UserRepository from "@/Auth/repositories/UserRepository";

export default function useFuelForm(id: TypeId) {
  const [fuelForm, setFuelForm] = useState<undefined | IFuelFormPopulate>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async()=>{
      const baseFuelForm = await FuelFormRepository.fetchOne(id)
      const vehicle = await VehicleRepository.fetchOne(baseFuelForm.vehicleId)
      const user = await UserRepository.fetchOne(baseFuelForm.userId)

      const fuelFormPopulate = {
        ...baseFuelForm,
        vehicle,
        user
      }

      setFuelForm(fuelFormPopulate);
      setLoading(false);
    })()
  }, []);

  return { fuelForm, loading };
}
