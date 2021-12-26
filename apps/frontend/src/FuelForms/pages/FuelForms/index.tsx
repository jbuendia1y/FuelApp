import dateTimeFormat from "@/utils/dateTimeFormat";
import useFuelForms from "@/FuelForms/hooks/useFuelForms";
import { Link } from "react-router-dom";

export default function FuelForms() {
  const { fuelForms } = useFuelForms();

  return (
    <div>
      {fuelForms?.map((fuelForm, index) => {
        return (
          <div key={index}>
            <p>
              Horómetro: <span>{fuelForm.hourMeter}</span>
            </p>
            <p>
              KM X Galón : <span>{fuelForm.kmPerGallon} km</span>
            </p>
            <p>
              Recorrió : <span>{fuelForm.kmTraveled} km</span>
            </p>
            <p>
              Precio X KM : S/<span>{fuelForm.payPerKm}</span>
            </p>
            <p>
              Total : S/<span>{fuelForm.fullPayment}</span>
            </p>
            <p>
              Registrado el : <span>{dateTimeFormat(fuelForm.createdAt)}</span>
            </p>
            <Link to={"/fuel-forms/" + fuelForm.id}>Ver más</Link>
          </div>
        );
      })}
    </div>
  );
}
