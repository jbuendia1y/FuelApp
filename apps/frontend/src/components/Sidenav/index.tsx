import useAuth from "@/Auth/hooks/useAuth";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants";
import { FUEL_FORMS_ROOT_PATH } from "@/FuelForms";
import { css } from "@emotion/react";
import Button from "../Button";
import CarIcon from "../Icons/CarIcon";
import Checklist from "../Icons/Checklist";
import List from "../Icons/List";
import MenuIcon from "../Icons/MenuIcon";
import SidenavItem from "./components/sidenavItem";
import useToggle from "./hooks/useToggle";

const sidenavBoxStyles = css`
  height: 100%;
  box-sizing: border-box;
`;

const sidenavListStyles = css`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

const sidenavButtonStyles = css`
  position: fixed;
  bottom: 20px;
  right: 20px;

  border-radius: 50%;

  width: 50px;
  height: 50px;
  padding: 0;
  justify-content: center;

  svg {
    margin-right: 0;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

export default function Sidenav() {
  const { user } = useAuth();
  const { toggle, isToggle } = useToggle();

  return (
    <>
      {!!user && (
        <>
          <Button onClick={toggle} css={sidenavButtonStyles}>
            <MenuIcon />
          </Button>
          <div
            css={css`
              width: 25%;
              height: 100vh;
              max-width: 220px;
              min-width: 200px;

              transform: translateX(calc(-100% - 10px));
              position: fixed;
              top: 50px;
              z-index: 1;

              background-color: var(--bg-primary);
              box-shadow: -2px -5px 10px #00000069;

              transition: transform 0.5s ease;
              height: calc(100vh - 53px);
              box-sizing: border-box;

              transform: ${isToggle ? "translateX(0)" : "none"};

              @media (min-width: 1000px) {
                display: block;
                transform: translateX(0);

                position: static;
                transition: none;
                height: auto;
              }
            `}
          >
            <div css={sidenavBoxStyles}>
              <ul css={sidenavListStyles}>
                <SidenavItem href={FUEL_FORMS_ROOT_PATH + "/compose"}>
                  <Checklist />
                  Formulario
                </SidenavItem>
                <SidenavItem href={FUEL_FORMS_ROOT_PATH}>
                  <List />
                  Formularios
                </SidenavItem>
                {(user.role === SUPERVISOR_ROLE ||
                  user.role === ADMIN_ROLE) && (
                  <SidenavItem href="/vehicles">
                    <CarIcon /> Vehiculos
                  </SidenavItem>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
