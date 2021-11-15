import ShowMore from "@/components/Icons/showMore.svg";
import useEnterprisesMember from "@/hooks/useEnterprisesMember";
import setOrDeleteFromStorage, {
  getDataFromStorage,
} from "@/utils/handleStorage";
import { ChangeEvent } from "react";

export default function WorkspaceConfig() {
  const enterprisesMember = useEnterprisesMember();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrDeleteFromStorage("default-enterprise", e.target.value);
  };

  return (
    <section>
      <h3 id="workspaces">Espacios de trabajo</h3>
      <p>
        Los espacios de trabajo son las empresas a las cuales usted tiene acceso
        .
      </p>
      <p>
        Puede seleccionar una espacio de trabajo por defecto para no tener que
        seleccionar ese mismo cada vez que inicie sessión .
      </p>
      <>
        {enterprisesMember && (
          <select
            name="enterprise"
            id="enterprise-workspace"
            onChange={handleChange}
            defaultValue={
              getDataFromStorage("default-enterprise")
                ? (getDataFromStorage("default-enterprise") as string)
                : "NONE"
            }
            style={{ backgroundImage: `url(${ShowMore})` }}
          >
            <option value={"NONE"}>Mi perfil</option>
            {enterprisesMember.map((item) => {
              return (
                <option
                  key={"enterprise-workspace-option-" + item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
      </>
    </section>
  );
}
