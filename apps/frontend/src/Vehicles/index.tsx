import { css } from "@emotion/react";
import VehiclesList from "./components/vehiclesList";
import ComposeVehicle from "./components/composeVehicle";

const vehiclesStyles = css`
  height: 90vh;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

export default function Vehicles() {
  return (
    <div css={vehiclesStyles}>
      <ComposeVehicle />
      <VehiclesList />
    </div>
  );
}
