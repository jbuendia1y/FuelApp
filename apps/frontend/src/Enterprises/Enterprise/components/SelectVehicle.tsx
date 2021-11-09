import useVehicles from "@/hooks/useVehicles";
import setOrDeleteFromStorage from "@/utils/handleStorage";

export default function SelectVehicle() {
  const { vehicles } = useVehicles();

  return (
    <div>
      {vehicles && (
        <select defaultValue={""}>
          {vehicles.map((item) => (
            <option key={`vehicle-option-${item.id}`} value={item.id}>
              {item.placa}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
