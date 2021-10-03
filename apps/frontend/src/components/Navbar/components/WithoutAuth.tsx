import NavItem from "./NavItem";

export default function WithoutAuth() {
  return (
    <>
      <NavItem href="/login">Iniciar Sessión</NavItem>
      <NavItem href="/register">Registrarse</NavItem>
    </>
  );
}
