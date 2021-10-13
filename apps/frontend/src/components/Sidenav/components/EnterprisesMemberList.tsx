import ShowMore from "../showMore.svg";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import useMemberOfEnterprises from "@/hooks/useEnterprisesMember";
import { ChangeEvent } from "react";
import SidenavItem from "./sidenavItem";

export default function EnterprisesMemberList() {
  const enterprisesMember = useMemberOfEnterprises();
  const { data, changeCurrentEnterprise } = useCurrentEnterprise();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      changeCurrentEnterprise(e.target.value);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      {enterprisesMember && (
        <>
          <p>Enterprises Member</p>
          <ul className="sidenav__list">
            {enterprisesMember.map((item) => {
              return (
                <SidenavItem
                  key={"link-to-" + item}
                  href={"/enterprises/" + item.id}
                >
                  <img src={item.logo} alt={item.name} />
                  {item.name}
                </SidenavItem>
              );
            })}
          </ul>
          <p>Espacio de Trabajo</p>
          <div className="sidenav__link">
            {data && <img src={data.logo} alt={data.name} />}
            <select
              name="enterprise"
              id="enterprise-workspace"
              onChange={handleChange}
              defaultValue={"NONE"}
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
          </div>
        </>
      )}
    </>
  );
}
