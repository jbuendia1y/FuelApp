import { IFuelForm } from "@/interfaces";
import FuelFormRepository from "@/FuelForms/repositories/FuelFormRepository";
import { useEffect, useState } from "react";

interface IUseFuelForms{
  params?: {
    vehicleId?: number;
    userId?: number;
  },reverse:boolean
}

export default function useFuelForms({
  params,
  reverse = false
}:IUseFuelForms) {
  const [fuelForms, setFuelForms] = useState<undefined | IFuelForm[]>();
  const [loading, setLoading] = useState(false);
  const [page,setPage] = useState(1)

  const changePage = (value:number)=>{
    setPage(value)
  }

  useEffect(() => {
    setLoading(true);
    FuelFormRepository.fetchAll({
      vehicleId: params?.vehicleId,
      userId: params?.userId,
      page
    }).then((res) => {
      if(reverse) setFuelForms(res.reverse())
      else setFuelForms(res);
      setLoading(false);
    });
  }, []);

  return { fuelForms, loading,changePage,page };
}
