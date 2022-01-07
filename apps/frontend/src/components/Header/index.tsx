import { css } from "@emotion/react";

import ReactIcon from "@/components/Icons/ReactIcon";
import Navbar from "../Navbar";
import { colors } from "@/constants";
import Container from "../Container";

const headerStyles = css`
  background-color: ${colors.secondary};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 -2px 10px #00000069;
  backdrop-filter: blur(2px);

  -webkit-backdrop-filter: blur(2px);
`;

const headerBoxStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const headerLogoStyles = css`
  width: 40px;
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Container css={headerBoxStyles}>
        <ReactIcon css={headerLogoStyles} />
        <Navbar />
      </Container>
    </header>
  );
}
