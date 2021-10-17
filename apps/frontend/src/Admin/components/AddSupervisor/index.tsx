import Button from "@/components/Button";
import { FormField, FormInput, FormLabel } from "@/components/Form";
import { addSupervisor } from "@/firebase/firestore";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddSupervisor() {
  const { currentEnterprise } = useCurrentEnterprise();
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentEnterprise) return;
    if (userId.length === 0) return;
    addSupervisor(currentEnterprise.id, userId)
      .then((res) => {
        console.log("Supervisor añadido");
      })
      .catch((err) => console.log(err.message));
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
