import "./profile.scss";
import useUser from "@/hooks/useUser";
import Email from "@/components/Icons/Email";
import { Link } from "react-router-dom";
import Phone from "@/components/Icons/Phone";
import { useState } from "react";
import EditIcon from "@/components/Icons/EditIcon";
import ModalPortal from "@/components/ModalPortal";
import EditProfile from "./components/EditProfile";

export default function Profile() {
  const user = useUser();
  const [onEdit, setOnEdit] = useState(false);

  const handleOnClose = () => {
    setOnEdit(false);
  };

  return (
    <>
      {user && (
        <div className="profile">
          <img src={user.avatar} alt={user.name} className="profile__avatar" />
          <h1 className="profile__name">{user.name}</h1>
          <p className="profile__contacts">
            <span className="profile__item">
              <Email />
              {user.email}
            </span>
            <span className="profile__item">
              <Phone />
              {user.phone}
            </span>
            <button
              className="profile__item"
              onClick={() => {
                setOnEdit(true);
              }}
            >
              <EditIcon />
              Editar perfil
            </button>
          </p>
          <p>
            Eres parte de una empresa ? Puedes unirte a tu empresa aquí
            <Link to="/companies">companies</Link>
          </p>
        </div>
      )}
      {onEdit && (
        <ModalPortal onClose={handleOnClose}>
          <EditProfile />
        </ModalPortal>
      )}
    </>
  );
}
