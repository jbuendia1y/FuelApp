import { registerWithEmailAndPassword } from "@/firebase/client";
import Button from "@/components/Button";
import AuthButtons from "./AuthButtons";
import Form, { FormField, FormInput, FormLabel } from "@/components/Form";

export default function AuthRegister() {
  return (
    <>
      <Form
        validate={(data: { email: string; password: string; name: string }) => {
          registerWithEmailAndPassword(data);
        }}
      >
        <FormField>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="nombre completo"
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            name="email"
            id="email"
            placeholder="correo electrónico"
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            name="password"
            id="password"
            placeholder="contraseña"
          />
        </FormField>
        <Button type="submit">Registrarse</Button>
      </Form>
      <AuthButtons />
    </>
  );
}
