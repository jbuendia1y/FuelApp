import Button from "@/components/Button";
import Form, { FormField } from "@/components/Form";
import VehicleRepository from "@/repositories/VehicleRepository";
import { css } from "@emotion/react";
import { ChangeEvent, useEffect, useState } from "react";

const vehicleComposeStyles = css`
  display: flex;
  align-items: flex-end;
`;

export default function ComposeVehicle() {
  const [placa, setPlaca] = useState<undefined | string>();
  const [onDataSubmit, setOnDataSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaca(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOnDataSubmit(true);
  };

  useEffect(() => {
    if (!placa) return;

    VehicleRepository.create({
      placa,
    })
      .then((res) => {
        setOnDataSubmit(false);
      })
      .catch(alert);
  }, [onDataSubmit]);

  return (
    <Form onSubmit={handleSubmit} css={vehicleComposeStyles}>
      <FormField>
        <label htmlFor="placa">Placa</label>
        <input
          onChange={handleChange}
          required={true}
          name="placa"
          id="placa"
          type="text"
          maxLength={8}
        />
      </FormField>
      <Button>Añadir</Button>
    </Form>
  );
}
