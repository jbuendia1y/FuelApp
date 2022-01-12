import { IFuelFormPopulate } from "@/interfaces";
import dateTimeFormat from "@/utils/dateTimeFormat";
import { css } from "@emotion/react";

const fuelReportStyles = css`
  h2 {
  }
`;

const fuelReportTextStyles = css`
  h1 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    font-weight: bold;
  }
`;

const listStyles = css`
  margin: 0;
  padding-left: 0;
  list-style: none;
  max-width: 360px;

  font-size: 1.05em;

  li {
    padding: 7px;
    display: flex;
    justify-content: space-between;

    &:nth-child(2n + 1) {
      background-color: var(--bg-secondary);
      color: var(--white);
    }
  }
`;

export default function FuelReport({
  fuelForm,
}: {
  fuelForm: IFuelFormPopulate;
}) {
  return (
    <div css={fuelReportStyles}>
      <div css={fuelReportTextStyles}>
        <h1>Reporte del formulario Nº {fuelForm.id}</h1>
        <p>Creado el {dateTimeFormat(fuelForm.createdAt)}</p>
      </div>

      <ul css={listStyles}>
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
  );
}
