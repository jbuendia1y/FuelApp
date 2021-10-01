import { Link } from "react-router-dom";

interface SidenavItemProps {
  children?: JSX.Element | string | JSX.Element[] | string[] | any;
  href?: string;
}

export default function SidenavItem({
  children,
  href = "/",
}: SidenavItemProps) {
  return (
    <li className="sidenav__item">
      <Link to={href} className="sidenav__link">
        {children}
      </Link>
    </li>
  );
}
