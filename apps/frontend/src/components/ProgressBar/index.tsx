import "./progressBar.scss";

export default function ProgressBar({
  now,
  label,
}: {
  now: number;
  label?: string;
}) {
  return (
    <div className="progressBar">
      {!!label && <span>{label}</span>}
      <div className="progressBar-box">
        <div style={{ width: `${now}%` }} className="progressBar-loading"></div>
      </div>
    </div>
  );
}
