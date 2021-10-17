import useRole from "@/hooks/useRole";
import AddVehicle from "./components/addVehicle";
import VehiclesList from "./components/vehiclesList";

export default function Vehicles() {
  const userRole = useRole();

  return (
    <div className="vehicles">
      <div className="vehicles-box">
        {userRole && (
          <>
            <AddVehicle />
            <VehiclesList />
          </>
        )}
      </div>
    </div>
  );
}
