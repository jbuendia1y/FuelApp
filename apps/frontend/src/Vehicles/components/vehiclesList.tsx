import List from "@mui/material/List";
import stringAvatar from "@/utils/stringAvatar";
import { css } from "@emotion/react";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useVehicles from "../hooks/useVehicles";

const vehicleItemTextStyles = css`
  flex-grow: 1;
  padding-left: 10px;
  box-sizing: border-box;
`;

export default function VehiclesList() {
  const { vehicles } = useVehicles();

  return (
    <>
      <List role={"list"}>
        {vehicles?.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar {...stringAvatar(item.placa, "-")} />
                </ListItemIcon>
                <ListItemText>{item.placa}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
