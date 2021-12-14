import Button from "@/components/Button";
import { FormField, FormInput, FormLabel } from "@/components/Form";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddSupervisor() {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    /*     e.preventDefault();
    if (userId.length === 0) return;
    addSupervisor(userId)
      .then((res) => {
        alert("Supervisor añadido");
      })
      .catch((err) => console.log(err.message)); */
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>UserID</FormLabel>
        </FormField>
        <FormInput type="text" onChange={handleChange} required={true} />
        <Button type="submit">Añadir Supervisor</Button>
      </form>
    </>
  );
}
