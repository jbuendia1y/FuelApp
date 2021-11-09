import GroupsIcon from "@/components/Icons/GroupsIcon";
import Syringe from "@/components/Icons/Syringe";
import SidenavItem from "./sidenavItem";

export default function AdminList() {
  return (
    <ul className="sidenav__list">
      <SidenavItem href="/supervisores">
        <GroupsIcon /> Supervisores
      </SidenavItem>
      <SidenavItem href="/inject/forms">
        <Syringe /> Injección de Datos
      </SidenavItem>
    </ul>
  );
}
