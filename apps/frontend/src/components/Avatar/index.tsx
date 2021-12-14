import User from "@/Auth/models/User";
import { Link } from "react-router-dom";
import "./avatar.scss";

export default function Avatar({
  user,
  children,
}: {
  user: User;
  children: any;
}) {
  return (
    <div className="avatar">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.getFullName()}
          className="avatar__image"
        />
      ) : (
        <div className="avatar__image"></div>
      )}
      <p className="avatar__text">
        <span className="avatar__text-bold">{user.getShortName()}</span>
        <span className="avatar__text-lighter">{children}</span>
      </p>
      <Link
        className="avatar__link"
        to={"/profile" + `${user.id ? `/${user.id}` : ""}`}
      >
        ver perfil
      </Link>
    </div>
  );
}
