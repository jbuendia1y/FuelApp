import Button from "@mui/material/Button";
import { FormField } from "@/components/Form";
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
          <label>UserID</label>
          <input type="text" onChange={handleChange} required={true} />
        </FormField>
        <Button type="submit">Añadir Supervisor</Button>
      </form>
    </>
  );
}
