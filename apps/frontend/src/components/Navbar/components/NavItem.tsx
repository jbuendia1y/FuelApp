import { Link } from "react-router-dom";
import { css } from "@emotion/react";

interface NavItemProps {
  children?: any;
  href?: string;
}

const navItemStyled = css`
  button.nav__link {
    background-color: inherit;
    border-radius: 0;
    box-shadow: none;

    &:active {
      transform: none;
    }

    &:hover {
      filter: none;
    }
  }
`;

const navLink = css`
  color: inherit;
  text-decoration: none;

  display: inline-flex;
  align-items: center;
  padding: 10px 15px;

  width: 100%;
`;

export default function NavItem({
  children,
  href,
  ...rest
}: NavItemProps | any) {
  return (
    <li css={navItemStyled}>
      {href ? (
        <Link css={navLink} to={href} {...rest}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </li>
  );
}
