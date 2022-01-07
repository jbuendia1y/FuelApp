import { css } from "@emotion/react";

const progressBarBoxStyles = css`
  position: relative;
  width: 100%;
  height: 20px;
  overflow: hidden;

  border-radius: 1000px;
  background-color: var(--bg-secondary);
`;

const progressBar = css`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgb(27, 137, 189);

  transition: width 0.5s;
`;

export default function ProgressBar({
  now,
  label,
}: {
  now: number;
  label?: string;
}) {
  return (
    <div>
      {!!label && <span>{label}</span>}
      <div css={progressBarBoxStyles}>
        <div style={{ width: `${now}%` }} css={progressBar}></div>
      </div>
    </div>
  );
}
