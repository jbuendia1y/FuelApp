import { Link } from "react-router-dom";

export default function NavItem({
  children,
  href = "/",
}: {
  children?: any;
  href?: string;
}) {
  return (
    <li className="nav__item">
      <Link className="nav__link" to={href}>
        {children}
      </Link>
    </li>
  );
}
