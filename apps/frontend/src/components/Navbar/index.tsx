import "./navbar.scss";
import ShowMoreIcon from "../Icons/ShowMoreIcon";
import NavItem from "./components/NavItem";
import { createRef } from "react";

const withoutAuth = () => (
  <>
    <NavItem href="/login">Iniciar Sessión</NavItem>
    <NavItem href="/register">Registrarse</NavItem>
  </>
);

const withAuth = (user: any) => (
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
    <NavItem href="/settings">Configuración</NavItem>
  </>
);

export default function Navbar() {
  const auth = true;
  const listRef = createRef<HTMLUListElement>();

  return (
    <nav className="nav">
      {auth && (
        <div className="nav__user">
          <ShowMoreIcon
            onClick={() => {
              listRef.current?.classList.toggle(
                "nav__list-authenticated-active"
              );
            }}
          />
          <img src="https://picsum.photos/200" />
        </div>
      )}
      <ul
        ref={listRef}
        className={`nav__list${auth ? " nav__list-authenticated" : ""}`}
      >
        {auth
          ? withAuth({ avatar: "https://picsum.photos/200", name: "User Test" })
          : withoutAuth()}
      </ul>
    </nav>
  );
}
