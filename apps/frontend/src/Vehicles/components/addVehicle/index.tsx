import { FormField, FormInput, FormLabel } from "@/components/Form";
import { addVehicle } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import { ChangeEvent, FormEvent, useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <FormField>
        <FormLabel htmlFor="">Placa</FormLabel>
        <FormInput onChange={handleChange} type="text" />
      </FormField>
    </form>
  );
}
