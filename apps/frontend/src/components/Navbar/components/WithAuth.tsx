import useAuth from "@/Auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";

import { default as LogoutIcon } from "@mui/icons-material/Logout";

export default function WithAuth() {
  const history = useHistory();
  const { user, logout } = useAuth();

  const [onLogout, setOnLogout] = useState(false);

  useEffect(() => {
    if (!onLogout) return;
    logout().then(() => {
      history.replace("/login");
      setOnLogout(false);
    });
  }, [onLogout]);

  if (user === undefined) return <></>;

  return (
    <>
      <Link to="/profile">
        <MenuItem>
          <ListItemIcon>
            <Avatar alt={user.getFullName()} src={user.avatar} />
          </ListItemIcon>
          <Box ml={2}>
            <Typography fontSize={15} variant="h2" component="p">
              {user.getShortName()}
            </Typography>
            <Typography fontSize={12} variant="h3" component="p">
              {user.document}
            </Typography>
          </Box>
        </MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          setOnLogout(true);
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Cerrar Sessión</ListItemText>
      </MenuItem>
    </>
  );
}
