import { CurrentEnterpriseContextProvider } from "./CurrentEnterpriseContext";
import { EnterprisesMemberContextProvider } from "./EnterprisesMemberContext";
import { EnterpriseVehicleContextProvider } from "./EnterpriseVehicleContext";
import { EnterpriseVehiclesContextProvider } from "./EnterpriseVehiclesContext";
import { RoleContextProvider } from "./RoleContext";
import { UserContextProvider } from "./UserContext";

export default function Contexts(props: any) {
  return (
    <UserContextProvider>
      <EnterprisesMemberContextProvider>
        <CurrentEnterpriseContextProvider>
          <EnterpriseVehiclesContextProvider>
            <RoleContextProvider>
              <EnterpriseVehicleContextProvider>
                {props.children}
              </EnterpriseVehicleContextProvider>
            </RoleContextProvider>
          </EnterpriseVehiclesContextProvider>
        </CurrentEnterpriseContextProvider>
      </EnterprisesMemberContextProvider>
    </UserContextProvider>
  );
}
