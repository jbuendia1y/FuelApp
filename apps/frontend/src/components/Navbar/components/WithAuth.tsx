import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import Settings from "@/components/Icons/Settings";
import { userLogout } from "@/firebase/client";
import { useHistory } from "react-router";
import NavItem from "./NavItem";

export default function WithAuth(user: any) {
  const history = useHistory();

  return (
    <>
      <NavItem>
        <Avatar user={user}>Ver perfil</Avatar>
      </NavItem>
      <NavItem href="/settings">
        <Settings /> Configuración
      </NavItem>
      <NavItem>
        <Button
          onClick={() => {
            userLogout().then(() => {
              history.push("/login");
            });
          }}
          className="nav__link"
        >
          <LogoutIcon /> Cerrar Sessión
        </Button>
      </NavItem>
    </>
  );
}
