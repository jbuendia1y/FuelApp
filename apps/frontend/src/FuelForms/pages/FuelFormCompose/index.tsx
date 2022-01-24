import Button from "@mui/material/Button";
import Form, { FormField, SymbolPrice } from "@/components/Form";
import FuelFormRepository from "@/FuelForms/repositories/FuelFormRepository";
import { ChangeEvent, useEffect, useState } from "react";
import useVehicles from "@/Vehicles/hooks/useVehicles";
import { css } from "@emotion/react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const fuelFormBoxStyles = css`
  display: grid;
  max-width: 360px;
  margin: 0 auto;
  align-items: center;

  min-height: 90vh;
`;

const fuelFormButtonStyles = css`
  width: 100%;
`;

export default function FuelFormCompose() {
  const [hourMeter, setHourmeter] = useState<undefined | number>();
  const [gallons, setGallons] = useState<undefined | number>();
  const [pricePerGallon, setPricePerGallon] = useState<undefined | number>();
  const [vehicleId, setVehicleId] = useState<undefined | number>();

  const [onDataSubmit, setOnDataSubmit] = useState(false);

  const { vehicles } = useVehicles();

  const settersObj: any = {
    HOURMETER: setHourmeter,
    GALLONS: setGallons,
    PRICEPERGALLON: setPricePerGallon,
    VEHICLEID: setVehicleId,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id.toLocaleUpperCase();
    const value = e.currentTarget.valueAsNumber;
    if (!!settersObj[name] === false)
      throw new Error(`El campo ${name} no está previsto`);

    settersObj[name](parseFloat(value.toFixed(2)));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!gallons || !hourMeter || !pricePerGallon || !vehicleId) return;
    setOnDataSubmit(true);
  };

  useEffect(() => {
    if (!onDataSubmit) return;
    if (!gallons || !hourMeter || !pricePerGallon || !vehicleId) return;

    FuelFormRepository.create({
      gallons,
      hourMeter,
      pricePerGallon,
      vehicleId,
    })
      .then((res) => {
        setOnDataSubmit(false);
      })
      .catch(alert);
  }, [onDataSubmit]);

  return (
    <div css={fuelFormBoxStyles}>
      <Form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="vehicleId-label">Vehículo</InputLabel>
          <Select
            required={true}
            labelId="vehicleId-label"
            label="Vehículo"
            name="vehicleId"
            id="vehicleId"
          >
            <MenuItem>...</MenuItem>
            {vehicles?.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.placa}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Horometro"
          id="hourmeter"
          name="hourmeter"
          required={true}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">km</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          label="Galones"
          id="gallons"
          name="gallons"
          required={true}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          type="number"
          label="Precio por Galón"
          id="pricePerGallon"
          name="pricePerGallon"
          required={true}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">S/.</InputAdornment>
            ),
          }}
        />
        <Button fullWidth variant="contained" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}
