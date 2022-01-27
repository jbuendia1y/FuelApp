import Button from "@mui/material/Button";
import Form from "@/components/Form";
import VehicleRepository from "@/Vehicles/repositories/VehicleRepository";
import { css } from "@emotion/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";

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
    <Form onSubmit={handleSubmit}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          label="Placa"
          id="placa"
          name="placa"
          required={true}
          onChange={handleChange}
        ></TextField>
        <Button variant="contained" type="submit">
          Añadir
        </Button>
      </Container>
    </Form>
  );
}
