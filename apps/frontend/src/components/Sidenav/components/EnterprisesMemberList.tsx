import Workspaces from "@/components/Workspaces";
import useMemberOfEnterprises from "@/hooks/useEnterprisesMember";
import SidenavItem from "./sidenavItem";

export default function EnterprisesMemberList() {
  const enterprisesMember = useMemberOfEnterprises();

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
          <Workspaces
            className="sidenav__link"
            onChangeCE={(e) => {
              console.log(e);
            }}
          />
        </>
      )}
    </>
  );
}
