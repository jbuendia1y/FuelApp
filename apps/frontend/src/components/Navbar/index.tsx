import "./navbar.scss";
import { createRef } from "react";
import ShowMoreIcon from "../Icons/ShowMoreIcon";
import WithAuth from "./components/WithAuth";
import WithoutAuth from "./components/WithoutAuth";

import useUser from "@/hooks/useUser";

export default function Navbar() {
  const user = useUser();
  const listRef = createRef<HTMLUListElement>();

  return (
    <nav className="nav">
      {user && (
        <div className="nav__user">
          <ShowMoreIcon
            onClick={() => {
              listRef.current?.classList.toggle(
                "nav__list-authenticated-active"
              );
            }}
          />
          <img src={user.avatar} />
        </div>
      )}
      <ul
        ref={listRef}
        className={`nav__list${user ? " nav__list-authenticated" : ""}`}
      >
        {user ? (
          <WithAuth avatar={user.avatar} name={user.name} />
        ) : (
          <WithoutAuth />
        )}
      </ul>
    </nav>
  );
}
