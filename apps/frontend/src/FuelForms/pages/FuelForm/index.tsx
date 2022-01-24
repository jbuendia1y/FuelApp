import useFuelForm from "../../hooks/useFuelForm";
import FuelUserAvatar from "./components/FuelUserAvatar";
import FuelReport from "./components/FuelReport";
import { TypeId } from "@/constants";

export default function FuelForm({ id }: { id: TypeId }) {
  const { fuelForm } = useFuelForm(id);

  if (fuelForm === undefined) return <span>Loading ...</span>;

  return (
    <div>
      <FuelReport fuelForm={fuelForm}></FuelReport>
      <div>
        <FuelUserAvatar user={fuelForm.user} />
        <div>
          <h2>Vehículo</h2>
          <p>
            Placa: <span>{fuelForm.vehicle.placa}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
