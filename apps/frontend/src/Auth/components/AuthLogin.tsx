import Button from "@/components/Button";
import Form, { FormField, FormInput, FormLabel } from "@/components/Form";

import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthLogin() {
  const history = useHistory();
  const { login } = useAuth();

  return (
    <>
      <Form
        validate={(data: { document: string; password: string }) => {
          login(data.document, data.password)
            .then(() => {
              history.push("/compose/fuel-form");
            })
            .catch((err) => console.log(err.message));
        }}
      >
        <FormField>
          <FormLabel htmlFor="document">Documento</FormLabel>
          <FormInput
            type="text"
            name="document"
            id="document"
            placeholder="Documento: DNI"
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <FormInput
            type="password"
            name="password"
            id="password"
            placeholder="contraseña"
          />
        </FormField>
        <Button type="submit">Iniciar Sessión</Button>
      </Form>
    </>
  );
}
