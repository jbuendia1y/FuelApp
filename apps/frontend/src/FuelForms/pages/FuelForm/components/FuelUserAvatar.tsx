import { IUser } from "@/interfaces";

export default function FuelUserAvatar({ user }: { user: IUser }) {
  return (
    <div>
      <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>
        DNI: <span>{user.document}</span>
      </p>
    </div>
  );
}
