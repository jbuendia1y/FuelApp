import Button from "@mui/material/Button";
import Form, { FormField, SymbolPrice } from "@/components/Form";
import FuelFormRepository from "@/FuelForms/repositories/FuelFormRepository";
import { ChangeEvent, useEffect, useState } from "react";
import useVehicles from "@/Vehicles/hooks/useVehicles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function FuelForm() {
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
    <>
      <Form className="fuel-form" onSubmit={handleSubmit}>
        <FormControl className="form-field">
          <InputLabel id="vehicleId-label">Vehículo</InputLabel>
          <Select
            labelId="vehicleId-label"
            id="vehicleId"
            name="vehicleId"
            required={true}
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
          required={true}
          id="hourMeter"
          name="hourMeter"
          label="Horometro"
          onChange={handleChange}
          className="form-field"
        />
        <TextField
          type="number"
          required={true}
          id="gallons"
          name="gallons"
          label="Galones"
          onChange={handleChange}
          className="form-field"
        />
        <TextField
          type="number"
          required={true}
          id="pricePerGallon"
          name="pricePerGallon"
          label="Precio por Galón"
          onChange={handleChange}
          className="form-field"
        />
        <Button className="fuel-form__button" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
}
