import Email from "@/components/Icons/Email";
import Phone from "@/components/Icons/Phone";
import useAuth from "@/Auth/hooks/useAuth";
import { css } from "@emotion/react";

const profileStyles = css`
  padding-top: 1.5em;
  min-height: 80vh;
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
`;

const profileAvatarStyles = css`
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;

  border-radius: 50%;
  display: block;
  margin: 0 auto;
`;

const profileNameStyles = css`
  text-align: center;
  margin: 5px 0 0 0;
`;

const profileContactsStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
  row-gap: 5px;
  padding: 10px 5px;
`;

const profileContactsItemStyles = css`
  display: flex;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;

    margin-right: 5px;
  }
`;

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div css={profileStyles}>
          <img
            src={user.avatar}
            alt={user.getFullName()}
            css={profileAvatarStyles}
          />
          <h1 css={profileNameStyles}>{user.getFullName()}</h1>
          <p css={profileContactsStyles}>
            <span css={profileContactsItemStyles}>
              <Email />
              {user.document}
            </span>
            <span css={profileContactsItemStyles}>
              <Phone />
              {user.phone}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
