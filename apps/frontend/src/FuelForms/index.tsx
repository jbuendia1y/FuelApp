import dateTimeFormat from "@/utils/dateTimeFormat";
import useFuelForms from "./hooks/useFuelForms";

export default function FuelForms() {
  const { fuelForms } = useFuelForms();

  return (
    <div>
      {fuelForms?.map((fuelForm) => {
        return (
          <div>
            <p>
              Horómetro: <span>{fuelForm.hourmeter}</span>
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
          </div>
        );
      })}
    </div>
  );
}
