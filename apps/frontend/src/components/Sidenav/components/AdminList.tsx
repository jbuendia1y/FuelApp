import GroupsIcon from "@/components/Icons/GroupsIcon";
import Syringe from "@/components/Icons/Syringe";

export default function AdminList() {
  return (
    <ul className="sidenav__list">
      <li>
        <GroupsIcon /> Supervisores
      </li>
      <li>
        <Syringe /> Injección de Datos
      </li>
    </ul>
  );
}
