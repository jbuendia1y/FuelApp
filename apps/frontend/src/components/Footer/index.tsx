import { css } from "@emotion/react";
import Container from "../Container";
import { colors } from "@/constants";

const footerStyles = css`
  background-color: ${colors.secondary};
  padding: 15px 0;
`;

const footerTitleStyles = css`
  margin: 0;
`;

const footerListStyles = css`
  padding-left: 0;
  margin: 0;
  list-style: none;

  li > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Container>
        <div>
          <h2 css={footerTitleStyles}>Lorem</h2>
          <ul css={footerListStyles}>
            <li>
              <a href="#">Lorem</a>
            </li>
            <li>
              <a href="#">Lorem</a>
            </li>
            <li>
              <a href="#">Lorem</a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
