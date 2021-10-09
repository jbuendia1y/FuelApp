import "./historic.scss";
import useFuelsPerformance from "@/hooks/useFuelsPerformance";
import FileDownload from "@/components/Icons/FileDownload";
import useUser from "@/hooks/useUser";
import { createRef } from "react";
import Loading from "@/components/Loading";
import dateTimeFormat from "@/helpers/dateTimeFormat";

export default function Hitoric() {
  const { fuelsPerformance, loading } = useFuelsPerformance();
  const tableRef = createRef<HTMLTableElement>();
  const user = useUser();

  function exportTableToExcel() {
    const dataType = "application/vnd.ms-excel";
    const tableSelect = tableRef.current as HTMLTableElement;
    const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    const fileName = `fuel_data-${user.name}.xls`;

    // Create download link element
    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;
    // Setting the file name
    downloadLink.download = fileName;

    //triggering the function
    downloadLink.click();
  }

  return (
    <div className="historic">
      <div className="historic-box">
        <div className="historic__text">
          <div className="historic__title">
            <h2 className="historic__title-text">Historial</h2>
            <button onClick={exportTableToExcel}>
              <FileDownload />
            </button>
          </div>
          <p>Registros realizados en la aplicación</p>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Horometro</th>
                <th>GLS</th>
                <th>Precio X GL</th>
                <th>Total nuevos soles</th>
                <th>KM recorrido</th>
                <th>KM/GL</th>
                <th>S/. x KM</th>
              </tr>
            </thead>
            <tbody>
              {fuelsPerformance?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{dateTimeFormat(item.createdAt)}</td>
                    <td>{item.horometro}</td>
                    <td>{item.galones}</td>
                    <td>{item.precioPorGalon}</td>
                    <td>{item.pagoTotal}</td>
                    <td>{item.kmRecorrido}</td>
                    <td>{item.kmPorGalon}</td>
                    <td>{item.pagoPorKm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
