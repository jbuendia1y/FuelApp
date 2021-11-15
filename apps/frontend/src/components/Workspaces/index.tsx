import "./workspaces.scss";
import ShowMore from "@/components/Icons/showMore.svg";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useEnterprisesMember from "@/hooks/useEnterprisesMember";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

export default function Workspaces(props: {
  className?: string;
  onChangeCE?: (enterpriseId: string) => void;
}) {
  const enterprisesMember = useEnterprisesMember();
  const { currentEnterprise, changeCurrentEnterprise } = useCurrentEnterprise();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      changeCurrentEnterprise(e.target.value);
      props.onChangeCE && props.onChangeCE(e.target.value);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      {enterprisesMember && currentEnterprise ? (
        <>
          <p>Espacio de Trabajo</p>
          <div className={props.className}>
            {
              <>
                <img
                  src={currentEnterprise.logo}
                  alt={currentEnterprise.name}
                />
                <select
                  name="enterprise"
                  id="enterprise-workspace"
                  onChange={handleChange}
                  defaultValue={
                    currentEnterprise ? currentEnterprise.id : "NONE"
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
              </>
            }
          </div>
        </>
      ) : (
        <div className={props.className}>
          <p>
            No se ha elegido un{` `}
            <Link to="/settings#workspaces">espacio de trabajo</Link>
          </p>
        </div>
      )}
    </>
  );
}
