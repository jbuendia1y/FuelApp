import { registerWithEmailAndPassword } from "@/firebase/client";
import Button from "@/components/Button";
import AuthButtons from "./AuthButtons";
import Form, { FormField, FormInput, FormLabel } from "@/components/Form";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AuthRegister() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((value) => {
      let newData: any = { ...value };
      if (newData[e.target.name] === undefined) return { ...value };
      newData[e.target.name] = e.target.value;
      return newData;
    });
    e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emptyFields = Object.keys(data).filter((item) => {
      if (((data as any)[item] as string).length === 0) return true;
      else return false;
    });
    if (emptyFields.length !== 0) return;
    else registerWithEmailAndPassword(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="nombre completo"
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            name="email"
            id="email"
            placeholder="correo electrónico"
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            name="password"
            id="password"
            placeholder="contraseña"
            onChange={handleChange}
          />
        </FormField>
        <Button type="submit">Registrarse</Button>
      </Form>
      <AuthButtons />
    </>
  );
}
