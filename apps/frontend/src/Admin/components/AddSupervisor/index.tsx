import Button from "@/components/Button";
import { FormField, FormInput, FormLabel } from "@/components/Form";

export default function AddSupervisor() {
  return (
    <>
      <form>
        <FormField>
          <FormLabel>Email</FormLabel>
        </FormField>
        <FormInput type="email" required={true} />
        <Button type="submit">Añadir Supervisor</Button>
      </form>
    </>
  );
}
