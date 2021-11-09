import useRole from "@/hooks/useRole";
import useUser from "@/hooks/useUser";
import { createRef } from "react";
import Button from "../Button";
import Assessment from "../Icons/Assessment";
import Business from "../Icons/Business";
import CarIcon from "../Icons/CarIcon";
import Checklist from "../Icons/Checklist";
import KeyIcon from "../Icons/KeyIcon";
import List from "../Icons/List";
import MenuIcon from "../Icons/MenuIcon";
import AdminList from "./components/AdminList";
import EnterprisesMemberList from "./components/EnterprisesMemberList";
import SidenavItem from "./components/sidenavItem";
import "./sidenav.scss";

export default function Sidenav() {
  const user = useUser();
  const role = useRole();
  const sidenavRef = createRef<HTMLDivElement>();

  return (
    <>
      {user && (
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
                <SidenavItem href="/resumen">
                  <Assessment />
                  Resumen
                </SidenavItem>
                <SidenavItem href="/compose/fuel-form">
                  <Checklist />
                  Fuel Form
                </SidenavItem>
                <SidenavItem href="/historic">
                  <List />
                  Historial
                </SidenavItem>
                <SidenavItem href="/enterprises">
                  <Business />
                  Empresas
                </SidenavItem>
              </ul>
              {role && (
                <ul className="sidenav__list">
                  <SidenavItem href="/vehicles">
                    <CarIcon /> Vehiculos
                  </SidenavItem>
                </ul>
              )}
              {role && role === "admin" && <AdminList />}
              {role && (role === "admin" || role === "supervisor") && (
                <ul className="sidenav__list">
                  <SidenavItem href="/requests/access">
                    <KeyIcon /> Solicitudes
                  </SidenavItem>
                </ul>
              )}
              <EnterprisesMemberList />
            </div>
          </div>
        </>
      )}
    </>
  );
}
