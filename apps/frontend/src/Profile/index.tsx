import "./profile.scss";
import Email from "@/components/Icons/Email";
import Phone from "@/components/Icons/Phone";
import useAuth from "@/Auth/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className="profile">
          <img
            src={user.avatar}
            alt={user.getFullName()}
            className="profile__avatar"
          />
          <h1 className="profile__name">{user.getFullName()}</h1>
          <p className="profile__contacts">
            <span className="profile__item">
              <Email />
              {user.document}
            </span>
            <span className="profile__item">
              <Phone />
              {user.phone}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
