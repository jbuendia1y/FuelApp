import { css } from "@emotion/react";
import LoadingGif from "./loading.gif";

const loadingStyles = css`
  width: 50px;
  height: 50px;
`;

export default function Loading() {
  return <img css={loadingStyles} src={LoadingGif} />;
}
