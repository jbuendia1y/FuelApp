import { colors } from "@/constants";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface SidenavItemProps {
  children?: JSX.Element | string | JSX.Element[] | string[] | any;
  href?: string;
}

const sidenavLinkStyles = css`
  display: inline-flex;
  align-items: center;
  padding: 12px 5px;
  text-decoration: none;
  box-sizing: border-box;

  color: inherit;
  width: 100%;
  height: 48px;
  background-color: ${colors.primary};
  fill: ${colors.white};

  cursor: pointer;

  svg,
  img {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }

  &:hover {
    transition: filter 0.25s;
    filter: brightness(0.7);
  }
`;

export default function SidenavItem({
  children,
  href = "/",
}: SidenavItemProps) {
  return (
    <li className="sidenav__item">
      <Link css={sidenavLinkStyles} to={href} className="sidenav__link">
        {children}
      </Link>
    </li>
  );
}
