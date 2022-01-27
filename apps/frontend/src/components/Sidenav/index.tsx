import { CONDUCTOR_ROLE } from "@/constants";
import { FUEL_FORMS_ROOT_PATH } from "@/FuelForms";

import useAuth from "@/Auth/hooks/useAuth";
import useToggle from "./hooks/useToggle";

import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import Checklist from "../Icons/Checklist";
import { Box } from "@mui/system";
import { useEffect } from "react";

const sidenavButtonStyles = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;

  @media (min-width: 1000px) {
    display: none;
  }
`;

export default function Sidenav() {
  const { user } = useAuth();
  const { toggle, isToggle } = useToggle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (matches && isToggle) toggle();
  }, [matches]);

  return (
    <>
      {!!user && (
        <>
          <IconButton
            aria-label="toggle menu"
            onClick={toggle}
            css={sidenavButtonStyles}
          >
            <MenuIcon />
          </IconButton>
          <Box
            boxShadow={2}
            sx={{
              visibility: isToggle ? "hidden" : "visible",
              display: isToggle ? "none" : "block",
              position: matches ? "static" : "fixed",
              zIndex: matches ? "unset" : 2,
            }}
          >
            <Paper
              sx={{
                height: "100%",
              }}
            >
              <MenuList>
                <Link to={FUEL_FORMS_ROOT_PATH + "/compose"}>
                  <MenuItem>
                    <ListItemIcon>
                      <Checklist />
                    </ListItemIcon>
                    <ListItemText>Formulario</ListItemText>
                  </MenuItem>
                </Link>
                <Link to={FUEL_FORMS_ROOT_PATH}>
                  <MenuItem>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText>Formularios</ListItemText>
                  </MenuItem>
                </Link>

                {user.role !== CONDUCTOR_ROLE && (
                  <Link to="/vehicles">
                    <MenuItem>
                      <ListItemIcon>
                        <DirectionsCarFilledIcon />
                      </ListItemIcon>
                      <ListItemText>Vehículos</ListItemText>
                    </MenuItem>
                  </Link>
                )}
              </MenuList>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
