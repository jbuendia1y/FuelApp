import AddSupervisor from "@/Admin/components/AddSupervisor";
import useSupervisores from "@/Admin/hooks/useSupervisores";

export default function Supervisores() {
  const supervisores = useSupervisores();

  return (
    <div>
      <h2>Supervisores</h2>
      <AddSupervisor />
      <ul></ul>
    </div>
  );
}
