import Button from "@/components/Button";
import { FormField, FormInput, FormLabel } from "@/components/Form";
import { addVehicle } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import { ChangeEvent, FormEvent, useState } from "react";

import "./addVehicle.scss";

export default function AddVehicle() {
  const { currentEnterprise } = useCurrentEnterprise();
  const [placa, setPlaca] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentEnterprise) return;
    addVehicle(currentEnterprise.id, {
      placa: placa.toLocaleUpperCase(),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaca(e.target.value);
  };

  return (
    <form id="addVehicle" onSubmit={handleSubmit}>
      <div className="addVehicle-box">
        <FormField>
          <FormLabel htmlFor="placa">Placa</FormLabel>
          <FormInput id="placa" onChange={handleChange} type="text" />
        </FormField>
      </div>
      <Button className="addVehicle__btn" type="submit">
        Añadir
      </Button>
    </form>
  );
}
