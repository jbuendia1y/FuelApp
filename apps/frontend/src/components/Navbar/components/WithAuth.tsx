import LogoutIcon from "@/components/Icons/LogoutIcon";
import Settings from "@/components/Icons/Settings";
import { userLogout } from "@/firebase/client";
import NavItem from "./NavItem";

export default function WithAuth(user: any) {
  return (
    <>
      <NavItem href="/profile">
        <div className="nav__user nav__user-w">
          <img src={user.avatar} alt={user.name} />
          <div className="nav__profile">
            <span className="nav__profile-bold">{user.name}</span>
            <span className="nav__profile-lighter">Ver Perfil</span>
          </div>
        </div>
      </NavItem>
      <NavItem href="/settings">
        <Settings /> Configuración
      </NavItem>
      <NavItem onClick={() => userLogout()}>
        <LogoutIcon /> Cerrar Sessión
      </NavItem>
    </>
  );
}
