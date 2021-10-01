import { createRef } from "react";
import Button from "../Button";
import MenuIcon from "../Icons/MenuIcon";
import SidenavItem from "./components/sidenavItem";
import "./sidenav.scss";

export default function Sidenav() {
  const auth = false;
  const sidenavRef = createRef<HTMLDivElement>();

  return (
    <>
      {auth && (
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
                <SidenavItem href="/">Lorem</SidenavItem>
                <SidenavItem href="/">Lorem</SidenavItem>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
