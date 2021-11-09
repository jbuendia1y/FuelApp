import xlsx from "xlsx";
import useUser from "@/hooks/useUser";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import FuelPerformance from "@/firebase/firestore/fuelPerformanceForm";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Inject() {
  const [count, setCount] = useState(0);
  const user = useUser();
  const { currentEnterprise } = useCurrentEnterprise();

  const normalizeExcelJsonToObject = (data: any) => {
    return {
      horometro: data.HOROMETRO === undefined ? data.TACOMETRO : data.HOROMETRO,
      galones: data.GALONES,
      precioPorGalon: data["PRECIO X GL"],
      userId: user.uid,
      createdAt: data.FECHA,
    };
  };

  const handleInputChange = async (e: any) => {
    const target = e.target;
    if (!currentEnterprise) return;
    if (target.files.length === 0) return;

    const vehicle = target.files[0].name
      .split("Control de Combustible ")[1]
      .split(".")[0]
      .toLocaleUpperCase();

    let mainData: any[];

    const reader = new FileReader();
    reader.readAsArrayBuffer(target.files[0]);

    reader.onloadend = async (e) => {
      if (e.target === undefined || e.target === null) return;
      if (e.target.result === null || typeof e.target.result === "string")
        return;
      const data = new Uint8Array(e.target?.result);
      const workbook = xlsx.read(data, { type: "array", cellDates: true });
      mainData = xlsx.utils.sheet_to_json(workbook.Sheets[vehicle]);

      const formatedExcel = mainData.map(normalizeExcelJsonToObject);
      for (const item of formatedExcel) {
        await new FuelPerformance(item, {
          id: currentEnterprise.id,
          vehicle,
        }).addRegister();
        setCount((value) => {
          const computedValue = ((value + 1) / formatedExcel.length) * 100;
          return parseFloat(computedValue.toFixed(2));
        });
      }

      alert(`Inject forms to ${vehicle} finsihed`);
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
