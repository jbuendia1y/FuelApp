import User from "@/Auth/models/User";
import { css } from "@emotion/react";

const credentialCardStyles = css`
  display: flex;
  flex-direction: column;
  padding: 7px;

  border-radius: 7px;

  @media (min-width: 760px) {
    flex-direction: row;
  }
`;

const credentialCardImageStyles = css`
  width: 250px;
  height: 250px;

  flex-shrink: 0;
`;

const credentialCardTextStyles = css``;

export default function CredentialCard({ user }: { user: User }) {
  return (
    <div css={credentialCardStyles}>
      <img
        css={credentialCardImageStyles}
        src={user.avatar}
        alt={user.getFullName()}
      />
      <div>
        <h2>{user.getFullName()}</h2>
        <p>
          DNI: <span>{user.document}</span>
        </p>
        <p>
          Cel.: <span>{user.phone}</span>
        </p>
      </div>
    </div>
  );
}
