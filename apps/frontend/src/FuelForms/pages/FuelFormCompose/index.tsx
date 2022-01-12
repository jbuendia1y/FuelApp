import Button from "@/components/Button";
import Form, { FormField, SymbolPrice } from "@/components/Form";
import FuelFormRepository from "@/repositories/FuelFormRepository";
import { ChangeEvent, useEffect, useState } from "react";
import useVehicles from "@/Vehicles/hooks/useVehicles";
import { css } from "@emotion/react";

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
        <FormField>
          <label htmlFor="vehicleId">Vehículo</label>
          <select required={true} name="vehicleId" id="vehicleId">
            <option>...</option>
            {vehicles?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.placa}
                </option>
              );
            })}
          </select>
        </FormField>
        <FormField>
          <label htmlFor="hourMeter">Horometro</label>
          <input
            type="number"
            required={true}
            step={0.001}
            onChange={handleChange}
            name="hourMeter"
            id="hourMeter"
          />
        </FormField>
        <FormField className="form-field">
          <label htmlFor="gallons">Galones</label>
          <input
            type="number"
            required={true}
            step={0.001}
            onChange={handleChange}
            name="gallons"
            id="gallons"
          />
        </FormField>
        <FormField>
          <label htmlFor="pricePerGallon">Precio por Galón</label>
          <SymbolPrice>
            <input
              type="number"
              required={true}
              step={0.001}
              onChange={handleChange}
              name="pricePerGallon"
              id="pricePerGallon"
            />
          </SymbolPrice>
        </FormField>
        <Button css={fuelFormButtonStyles} type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}
