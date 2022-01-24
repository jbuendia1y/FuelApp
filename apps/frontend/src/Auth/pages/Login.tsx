import Button from "@mui/material/Button";
import Form from "@/components/Form";
import { css } from "@emotion/react";

import { useHistory } from "react-router-dom";
import useAuth from "@/Auth/hooks/useAuth";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const history = useHistory();
  const { login } = useAuth();
  const [document, setDocument] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (document === undefined || password === undefined) {
      alert("Documento o contraseña incorrectas.");
      return;
    }
    login(document, password)
      .then(() => {
        history.push("/fuel-forms/compose");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Box
      sx={{
        width: 360,
        margin: "0 auto",
      }}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          id="document"
          label="Documento"
          placeholder="Documento: DNI"
          onChange={(e) => {
            setDocument(e.target.value);
          }}
          fullWidth
        />
        <TextField
          type="password"
          id="password"
          label="password"
          placeholder="Contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
        />
        <Button fullWidth variant="contained" type="submit">
          Iniciar Sessión
        </Button>
      </Form>
    </Box>
  );
}
