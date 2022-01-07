import { css } from "@emotion/react";
import { colors } from "@/constants";
import ShowMoreIcon from "../Icons/ShowMoreIcon";
import WithAuth from "./components/WithAuth";
import WithoutAuth from "./components/WithoutAuth";

import useAuth from "@/Auth/hooks/useAuth";
import useToggle from "../Sidenav/hooks/useToggle";

const navbarStyles = css`
  display: flex;
`;

export default function Navbar() {
  const { user, isLogged } = useAuth();
  const { toggle, isToggle } = useToggle();

  return (
    <nav css={navbarStyles}>
      {!!user && (
        <div
          css={css`
            display: flex;
            align-items: center;

            svg {
              margin-right: 5px;
              cursor: pointer;

              padding: 5px;
              border-radius: 50%;
              box-shadow: 0 0 2px rgba(83, 83, 83, 0.5);
              background-color: var(--bg-primary);
            }

            img {
              border-radius: 50%;
              width: 45px;
              height: 45px;
              padding: 4px 0;
            }
          `}
        >
          <ShowMoreIcon onClick={toggle} />
          <img src={user.avatar} />
        </div>
      )}
      <ul
        css={css`
          padding-left: 0;
          margin: 0;

          display: flex;
          list-style: none;

          background-color: inherit;

          .nav__item {
            border-top: 1px solid rgba(0, 0, 0, 0.5);

            .avatar {
              padding: 10px;
            }

            &:first-of-type {
              border-top: none;
            }
          }

          ${isLogged &&
          `
        flex-direction: column;
        position: absolute;
        top: 170px;
        right: 15%;
  
        transition: display 0.1s, transform 0.05s;
        display: ${isToggle ? "flex" : "none"};
  
        background-color: ${colors.secondary};
        transform: translate(100%, -100%);
        z-index: 1;
  `}
        `}
      >
        {!!user ? <WithAuth /> : <WithoutAuth />}
      </ul>
    </nav>
  );
}
