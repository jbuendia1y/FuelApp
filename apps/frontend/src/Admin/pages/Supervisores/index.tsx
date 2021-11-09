import AddSupervisor from "@/Admin/components/AddSupervisor";
import SupervisoresList from "@/Admin/components/SupervisoresList";
import useSupervisores from "@/Admin/hooks/useSupervisores";

export default function Supervisores() {
  const supervisores = useSupervisores();

  return (
    <div>
      <h2>Supervisores</h2>
      <AddSupervisor />
      {supervisores && supervisores.length !== 0 ? (
        <SupervisoresList supervisores={supervisores} />
      ) : (
        <p>La empresa no tiene supervisores actualmente</p>
      )}
    </div>
  );
}
