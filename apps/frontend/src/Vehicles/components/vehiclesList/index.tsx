import Button from "@/components/Button";
import useRole from "@/hooks/useRole";
import useVehicles from "@/hooks/useVehicles";
import { useState } from "react";
import VehicleModal from "../vehiclesModal";

export default function VehiclesList() {
  const { vehicles } = useVehicles();
  const role = useRole();

  const [showModal, setShowModal] = useState(false);
  const [placa, setPlaca] = useState("");
  const handleClick = (placa: string) => {
    setShowModal(true);
    setPlaca(placa);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <ul>
      {vehicles ? (
        <>
          {vehicles.length === 0 ? (
            <li>No se encuentran los vehiculos</li>
          ) : (
            vehicles.map((item) => (
              <li key={`vehicle-${item.placa}`}>
                {item.placa}{" "}
                {role === "chofer" && (
                  <Button onClick={() => handleClick(item.placa)}>Usar</Button>
                )}
              </li>
            ))
          )}
          {showModal && <VehicleModal placa={placa} onClose={handleClose} />}
        </>
      ) : (
        <li>No se encuentran los vehiculos</li>
      )}
    </ul>
  );
}
