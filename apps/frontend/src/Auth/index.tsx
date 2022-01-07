import { Route, Switch } from "react-router";
import Login from "./pages/Login";
import { css } from "@emotion/react";

const authStyles = css`
  height: 90vh;

  background-image: url("https://raw.githubusercontent.com/jbuendia1y/FuelApp/main/assets/pexels-skitterphoto-9796.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const authBoxStyles = css`
  padding: 10px 15px;
  height: 87vh;
  max-width: 360px;
  margin: 0 auto;

  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export default function Auth() {
  return (
    <div css={authStyles}>
      <div css={authBoxStyles}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
