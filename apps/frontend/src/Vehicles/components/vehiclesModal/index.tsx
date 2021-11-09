import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";

export default function VehicleModal({
  onClose,
  placa,
}: {
  onClose: () => void;
  placa: string;
}) {
  const { currentEnterpriseVehicle, changeCurrentEnterpriseVehicle } =
    useCurrentEnterprise();

  const handleClick = () => {
    if (!changeCurrentEnterpriseVehicle) return;
    changeCurrentEnterpriseVehicle(placa);
    onClose();
  };

  return (
    <ModalPortal onClose={onClose}>
      {currentEnterpriseVehicle && (
        <p>
          Usted ya está usando un vehiculo de esta compañia, con la placa :{" "}
          {currentEnterpriseVehicle}
        </p>
      )}
      <p>Está seguro de querer usar este vehículo ?</p>
      <p>
        El vehículo por elegir es: <strong>{placa}</strong>
      </p>
      <Button onClick={handleClick}>Sí</Button>
      <Button onClick={onClose}>NO</Button>
    </ModalPortal>
  );
}
