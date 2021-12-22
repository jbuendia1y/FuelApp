import "./vehicles.scss";
import VehiclesList from "./components/vehiclesList";
import ComposeVehicle from "./components/composeVehicle";

export default function Vehicles() {
  return (
    <div className="vehicles">
      <ComposeVehicle />
      <VehiclesList />
    </div>
  );
}
