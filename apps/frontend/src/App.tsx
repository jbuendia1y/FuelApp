import Header from "./components/Header";
import Routes from "./Routes";
import Sidenav from "./components/Sidenav";
import { css, Global, useTheme } from "@emotion/react";
import { colors } from "./constants";

const boxStyles = css`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

const appStyles = css`
  display: flex;

  width: 100%;
  height: 100%;
  max-width: 1450px;
  margin: 0 auto;
`;

const appContentStyles = css`
  width: 100%;
  color: ${colors.black};
`;

function App() {
  const { colors } = useTheme();

  const globalStyles = css`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      background-color: ${colors.white};
      color: ${colors.white};

      --bg-primary: ${colors.primary};
      --bg-secondary: ${colors.secondary};
      --white: ${colors.white};
      --black: ${colors.black};
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <div css={boxStyles}>
        <Header />
        <div css={appStyles}>
          <Sidenav />
          <div css={appContentStyles}>
            <Routes />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
