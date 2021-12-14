import xlsx from "xlsx";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/Auth/hooks/useAuth";
import useVehicles from "@/Vehicles/hooks/useVehicles";
import FuelFormRepository from "@/repositories/FuelFormRepository";

export default function Inject() {
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  const { vehicles } = useVehicles();

  const normalizeExcelJsonToObject = (data: any) => {
    return {
      hourmeter: data.HOROMETRO === undefined ? data.TACOMETRO : data.HOROMETRO,
      gallons: data.GALONES,
      pricePerGallon: data["PRECIO X GL"],
      userId: user?.id,
      createdAt: new Date(data.FECHA).toUTCString(),
    };
  };

  const handleInputChange = async (e: any) => {
    const target = e.target;
    if (!!vehicles === false) return;

    if (target.files.length === 0) return;

    const placa = target.files[0].name
      .split("Control de Combustible ")[1]
      .split(".")[0]
      .toLocaleUpperCase();

    const _vehicles = vehicles
      ?.filter((item) => item.placa === placa)
      .map((item) => item.id);
    if (_vehicles === undefined) return;
    const vehicleId = _vehicles[0];

    let mainData: any[];

    const reader = new FileReader();
    reader.readAsArrayBuffer(target.files[0]);

    reader.onloadend = async (e) => {
      if (e.target === undefined || e.target === null) return;
      if (e.target.result === null || typeof e.target.result === "string")
        return;
      const data = new Uint8Array(e.target?.result);
      const workbook = xlsx.read(data, { type: "array", cellDates: true });
      mainData = xlsx.utils.sheet_to_json(workbook.Sheets[placa]);

      const formatedExcel = mainData.map(normalizeExcelJsonToObject);
      for (const item of formatedExcel) {
        FuelFormRepository.create({
          ...item,
          vehicleId: vehicleId,
        });

        setCount((value) => {
          const computedValue = ((value + 1) / formatedExcel.length) * 100;
          return parseFloat(computedValue.toFixed(2));
        });
      }

      alert(`Inject forms to ${placa} finsihed`);
    };
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          handleInputChange(e);
        }}
        placeholder="archivo de excel"
      />
      <ProgressBar now={count} label={`In progress ${count}`}></ProgressBar>
    </div>
  );
}
