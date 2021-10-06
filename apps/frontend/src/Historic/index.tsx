import "./historic.scss";
import useFuelsPerformance from "@/hooks/useFuelsPerformance";

export default function Hitoric() {
  const { fuelsPerformance } = useFuelsPerformance();

  return (
    <div className="historic">
      <table>
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
          {fuelsPerformance &&
            fuelsPerformance.map((itemData, index) => {
              const item = itemData.data();
              return (
                <tr key={index}>
                  <td>{item.createdAt.seconds}</td>
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
    </div>
  );
}
