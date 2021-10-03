import Button from "@/components/Button";
import { Link } from "react-router-dom";

interface NavItemProps {
  children?: any;
  href?: string;
}

export default function NavItem({
  children,
  href = "/",
  ...rest
}: NavItemProps | any) {
  return (
    <li className="nav__item">
      {href ? (
        <Link className="nav__link" to={href} {...rest}>
          {children}
        </Link>
      ) : (
        <Button {...rest}>{children}</Button>
      )}
    </li>
  );
}
