import useAuth from "@/Auth/hooks/useAuth";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";

export default function WithAuth() {
  const history = useHistory();
  const { user, logout } = useAuth();

  return (
    <>
      <NavItem>{user && <Avatar user={user}>Ver perfil</Avatar>}</NavItem>
      <NavItem>
        <Button
          onClick={() => {
            logout().then(() => {
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
