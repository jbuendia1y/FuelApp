import "./settings.scss";
import WorkspaceConfig from "./WorkspaceConfig";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settings-box">
        <h2>Configuración</h2>
        <WorkspaceConfig />
      </div>
    </div>
  );
}
