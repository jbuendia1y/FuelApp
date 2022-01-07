import { css } from "@emotion/react";
import useVehicles from "../hooks/useVehicles";

const vehicleItemStyles = css`
  display: flex;
  align-items: center;
`;

const vehicleItemImageStyles = css`
  background-color: rgb(167, 167, 167);
  font-size: 0;
  height: 50px;
  width: 50px;
`;

const vehicleItemTextStyles = css`
  flex-grow: 1;
  padding-left: 10px;
  box-sizing: border-box;
`;

export default function VehiclesList() {
  const { vehicles } = useVehicles();

  return (
    <>
      <div role={"list"}>
        {vehicles?.map((item) => {
          return (
            <div css={vehicleItemStyles} role={"listitem"} key={item.id}>
              <img css={vehicleItemImageStyles} alt="vehículo" />
              <div css={vehicleItemTextStyles}>
                <h2>{item.placa}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
