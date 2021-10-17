import useVehicles from "@/hooks/useVehicles";

export default function VehiclesList() {
  const { vehicles } = useVehicles();

  return (
    <ul>
      {vehicles ? (
        <>
          {vehicles.length === 0 ? (
            <li>No se encuentran los vehiculos</li>
          ) : (
            vehicles.map((item) => <li>{item.placa}</li>)
          )}
        </>
      ) : (
        <li>No se encuentran los vehiculos</li>
      )}
    </ul>
  );
}
