import { loginWithEmailAndPassword } from "@/firebase/client";
import Button from "@/components/Button";
import AuthButtons from "./AuthButtons";
import Form, { FormField, FormInput, FormLabel } from "@/components/Form";

import { useHistory } from "react-router-dom";

export default function AuthLogin() {
  const history = useHistory();
  return (
    <>
      <Form
        validate={(data: { email: string; password: string }) => {
          loginWithEmailAndPassword(data)
            .then((res) => {
              history.push("/compose/fuel-form");
            })
            .catch((err) => console.log(err.code));
        }}
      >
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
        <Button type="submit">Iniciar Sessión</Button>
      </Form>
      <AuthButtons />
    </>
  );
}
