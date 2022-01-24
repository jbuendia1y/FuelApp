import { default as AssignamentIcon } from "@mui/icons-material/Assignment";
import { default as PhoneIcon } from "@mui/icons-material/Phone";
import useAuth from "@/Auth/hooks/useAuth";
import { css } from "@emotion/react";
import { Avatar, Typography } from "@mui/material";

const profileStyles = css`
  padding-top: 1.5em;
  min-height: 80vh;
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
`;

export default function Profile() {
  const { user } = useAuth();

  if (user === undefined) return <></>;

  return (
    <>
      <div css={profileStyles}>
        <Avatar src={user.avatar} alt={user.getFullName()} />
        <Typography variant="h4" component="h1">
          {user.getFullName()}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            display: "flex",
          }}
        >
          <AssignamentIcon />
          {user.document}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            display: "flex",
          }}
        >
          <PhoneIcon />
          {user.phone}
        </Typography>
      </div>
    </>
  );
}
