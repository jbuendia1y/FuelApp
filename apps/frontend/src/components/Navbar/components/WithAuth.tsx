import useAuth from "@/Auth/hooks/useAuth";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import { colors } from "@/constants";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";

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

  return (
    <>
      <NavItem>
        {user && (
          <Avatar padding="10px" user={user}>
            Ver perfil
          </Avatar>
        )}
      </NavItem>
      <NavItem>
        <Button
          onClick={() => {
            setOnLogout(true);
          }}
          css={css`
            background-color: ${colors.secondary};
            box-shadow: none;
            border-radius: 0;
            width: 100%;
            display: flex;
            svg {
              margin-right: 10px;
              fill: ${colors.white};
            }
          `}
        >
          <LogoutIcon /> Cerrar Sessión
        </Button>
      </NavItem>
    </>
  );
}
