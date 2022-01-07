import User from "@/Auth/models/User";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const avatarImageStyles = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  background-color: gray;
`;

const avatarTextStyles = css`
  margin: 0;
  margin-left: 5px;
`;

const avatarLinkStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;

  font-size: 0;
`;

export default function Avatar({
  user,
  children,
  padding = "0",
}: {
  user: User;
  children: any;
  padding?: string;
}) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        position: relative;

        min-width: 200px;
        padding: ${padding};
      `}
    >
      <img src={user.avatar} alt={user.getFullName()} css={avatarImageStyles} />
      <p css={avatarTextStyles}>
        <span
          css={{
            fontSize: "1.05em",
            fontWeight: "bold",
            display: "block",
          }}
        >
          {user.getShortName()}
        </span>
        <span
          css={{
            fontSize: "0.9em",
            fontWeight: "lighter",
          }}
        >
          {children}
        </span>
      </p>
      <Link css={avatarLinkStyles} to={"/profile"}>
        ver perfil
      </Link>
    </div>
  );
}
