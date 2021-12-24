import { IFuelFormPopulate } from "@/interfaces";
import useFuelForm from "../../hooks/useFuelForm";
import dateTimeFormat from "@/utils/dateTimeFormat";

export default function FuelForm(id: number) {
  const { fuelForm, loading } = useFuelForm(id);

  return (
    <div>
      {loading && fuelForm ? (
        <span>Loading ...</span>
      ) : (
        <>
          <div>
            <h1>Reporte del formulario Nº {fuelForm.id}</h1>
            <p>Creado el {dateTimeFormat(fuelForm.createdAt)}</p>

            <ul>
              <li>
                Horómetro : <span>{fuelForm.hourmeter}</span>
              </li>
              <li>
                KM X Galón : <span>{fuelForm.kmPerGallon} km</span>
              </li>
              <li>
                Recorrió : <span>{fuelForm.kmTraveled} km</span>
              </li>
              <li>
                Precio X KM : S/<span>{fuelForm.payPerKm}</span>
              </li>
              <li>
                Total a pagar : S/<span>{fuelForm.fullPayment}</span>
              </li>
            </ul>
          </div>
          <div>
            <div>
              <h2>{`${fuelForm.user.firstName} ${fuelForm.user.lastName}`}</h2>
              <p>
                DNI: <span>{fuelForm.user.document}</span>
              </p>
            </div>
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
