import "./header.scss";

import ReactIcon from "@/components/Icons/ReactIcon";
import Navbar from "../Navbar";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-box">
        <ReactIcon className="header__logo" />
        <Navbar />
      </div>
    </header>
  );
}
