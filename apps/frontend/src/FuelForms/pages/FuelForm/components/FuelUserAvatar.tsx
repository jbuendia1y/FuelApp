import { IUser } from "@/interfaces";
import { css } from "@emotion/react";

const fuelUserAvatarStyles = css`
  h2,
  p {
    margin: 0;
  }
`;

export default function FuelUserAvatar({ user }: { user: IUser }) {
  return (
    <div css={fuelUserAvatarStyles}>
      <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>
        DNI: <span>{user.document}</span>
      </p>
    </div>
  );
}
