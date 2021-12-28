import useAuth from "@/Auth/hooks/useAuth";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants";
import { FUEL_FORMS_ROOT_PATH } from "@/FuelForms";
import { createRef } from "react";
import Button from "../Button";
import CarIcon from "../Icons/CarIcon";
import Checklist from "../Icons/Checklist";
import List from "../Icons/List";
import MenuIcon from "../Icons/MenuIcon";
import SidenavItem from "./components/sidenavItem";
import "./sidenav.scss";

export default function Sidenav() {
  const { user } = useAuth();
  const sidenavRef = createRef<HTMLDivElement>();

  return (
    <>
      {!!user && (
        <>
          <Button
            onClick={() => {
              sidenavRef.current?.classList.toggle("sidenav-active");
            }}
            className="sidenav__button"
          >
            <MenuIcon />
          </Button>
          <div ref={sidenavRef} className="sidenav">
            <div className="sidenav-box">
              <ul className="sidenav__list">
                <SidenavItem href={FUEL_FORMS_ROOT_PATH + "/compose"}>
                  <Checklist />
                  Formulario
                </SidenavItem>
                <SidenavItem href={FUEL_FORMS_ROOT_PATH}>
                  <List />
                  Formularios
                </SidenavItem>
              </ul>
              {(user.role === SUPERVISOR_ROLE || user.role === ADMIN_ROLE) && (
                <ul className="sidenav__list">
                  <SidenavItem href="/vehicles">
                    <CarIcon /> Vehiculos
                  </SidenavItem>
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
