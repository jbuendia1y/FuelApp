import "./fuel-form-populate.scss";
import useFuelForm from "../../hooks/useFuelForm";
import dateTimeFormat from "@/utils/dateTimeFormat";
import FuelUserAvatar from "./components/fuelUserAvatar";

export default function FuelForm({ id }: { id: string }) {
  const { fuelForm, loading } = useFuelForm(id);

  return (
    <div>
      {fuelForm === undefined ? (
        <span>Loading ...</span>
      ) : (
        <>
          <div>
            <h1>Reporte del formulario Nº {fuelForm.id}</h1>
            <p>Creado el {dateTimeFormat(fuelForm.createdAt)}</p>

            <ul className="list">
              <li>
                Horómetro : <span>{fuelForm.hourMeter}</span>
              </li>
              <li>
                KM X Galón : <span>{fuelForm.kmPerGallon} km</span>
              </li>
              <li>
                Recorrió : <span>{fuelForm.kmTraveled} km</span>
              </li>
              <li>
                Precio X KM : <span>S/{fuelForm.payPerKm}</span>
              </li>
              <li>
                Total a pagar : <span>S/{fuelForm.fullPayment}</span>
              </li>
            </ul>
          </div>
          <div>
            <FuelUserAvatar user={fuelForm.user} />
            <div>
              <h2>Vehículo</h2>
              <p>
                Placa: <span>{fuelForm.vehicle.placa}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
