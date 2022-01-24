import { css } from "@emotion/react";
import WithAuth from "./components/WithAuth";
import WithoutAuth from "./components/WithoutAuth";

import useAuth from "@/Auth/hooks/useAuth";
import { Avatar, IconButton, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";

const navbarStyles = css`
  display: flex;
`;

export default function Navbar() {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isToggle = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav css={navbarStyles}>
      {!!user && (
        <IconButton onClick={handleClick}>
          <Avatar alt={user.getFullName()} src={user.avatar} />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={isToggle}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!!user ? <WithAuth /> : <WithoutAuth />}
      </Menu>
    </nav>
  );
}
