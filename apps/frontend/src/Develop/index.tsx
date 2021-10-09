import { addRegister } from "@/firebase/firestore";
import useUser from "@/hooks/useUser";
import * as xlsx from "xlsx";

export default function Develop() {
  const user = useUser();
  const normalizeExcelJsonToObject = (data: any) => {
    return {
      horometro: data.horometro,
      galones: data.galones,
      precioPorGalon: data.precioPorGalon,
      userId: user.uid,
      createdAt: data.createdAt,
    };
  };

  const handleInputChange = async (e: any) => {
    const target = e.target;
    let mainData: any[];

    const reader = new FileReader();
    reader.readAsArrayBuffer(target.files[0]);
    reader.onloadend = async (e) => {
      if (e.target === undefined || e.target === null) return;
      if (e.target.result === null || typeof e.target.result === "string")
        return;
      const data = new Uint8Array(e.target?.result);
      const workbook = xlsx.read(data, { type: "array", cellDates: true });

      mainData = xlsx.utils.sheet_to_json(workbook.Sheets["GAS"]);
      for (const item of mainData.map(normalizeExcelJsonToObject)) {
        await addRegister(item);
      }
    };
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        handleInputChange(e);
      }}
      placeholder="archivo de excel"
    />
  );
}
