import { IFuelFormPopulate } from "@/interfaces";
import dateTimeFormat from "@/utils/dateTimeFormat";
import { css } from "@emotion/react";
import { List, ListItem, ListItemText } from "@mui/material";

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

      <List>
        <ListItem>
          <ListItemText>
            Horómetro : <span>{fuelForm.hourMeter}</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            KM X Galón : <span>{fuelForm.kmPerGallon} km</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Recorrió : <span>{fuelForm.kmTraveled} km</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Precio X KM : <span>S/{fuelForm.payPerKm}</span>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Total a pagar : <span>S/{fuelForm.fullPayment}</span>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
