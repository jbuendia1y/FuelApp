import "./avatar.scss";

export default function Avatar({
  user,
  children,
}: {
  user: any;
  children: any;
}) {
  return (
    <div className="avatar">
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="avatar__image" />
      ) : (
        <div className="avatar__image"></div>
      )}
      <p className="avatar__text">
        <span className="avatar__text-bold">{user.name}</span>
        <span className="avatar__text-lighter">{children}</span>
      </p>
      <a className="avatar__link" href={"/profile/" + user.uid}>
        ver perfil
      </a>
    </div>
  );
}
