import useRole from "@/hooks/useRole";
import AddVehicle from "./components/addVehicle";
import VehiclesList from "./components/vehiclesList";

export default function Vehicles() {
  const role = useRole();

  return (
    <div className="vehicles">
      <div className="vehicles-box">
        {role && (
          <>
            {role !== "chofer" && <AddVehicle />}
            <VehiclesList />
          </>
        )}
      </div>
    </div>
  );
}
