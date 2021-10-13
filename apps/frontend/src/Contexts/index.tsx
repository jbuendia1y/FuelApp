import { CurrentEnterpriseContextProvider } from "./CurrentEnterpriseContext";
import { EnterprisesMemberContextProvider } from "./EnterprisesMemberContext";
import { RoleContextProvider } from "./RoleContext";
import { UserContextProvider } from "./UserContext";

export default function Contexts(props: any) {
  return (
    <UserContextProvider>
      <EnterprisesMemberContextProvider>
        <CurrentEnterpriseContextProvider>
          <RoleContextProvider>{props.children}</RoleContextProvider>
        </CurrentEnterpriseContextProvider>
      </EnterprisesMemberContextProvider>
    </UserContextProvider>
  );
}
