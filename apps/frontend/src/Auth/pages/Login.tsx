import Button from "@/components/Button";
import Form, { FormField } from "@/components/Form";
import { colors } from "@/constants";

import { useHistory } from "react-router-dom";
import useAuth from "@/Auth/hooks/useAuth";
import { environment } from "@/environments/environment";

export default function Login() {
  const history = useHistory();
  const { login } = useAuth();

  return (
    <>
      <Form
        validate={(data: { document: string; password: string }) => {
          login(data.document, data.password)
            .then(() => {
              history.push("/fuel-forms/compose");
            })
            .catch((err) => console.log(err.message));
        }}
        css={{
          width: "360px",
          marginBottom: "10px",
        }}
      >
        <FormField>
          <label htmlFor="document">Documento</label>
          <input
            type="text"
            name="document"
            id="document"
            placeholder="Documento: DNI"
          />
        </FormField>
        <FormField>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="contraseña"
          />
        </FormField>
        <Button
          css={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: colors.white,
          }}
          type="submit"
        >
          Iniciar Sessión
        </Button>
      </Form>
    </>
  );
}
