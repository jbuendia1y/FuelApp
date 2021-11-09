import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";
import { requestAccess } from "@/firebase/firestore";
import { useEffect, useState } from "react";

export default function RequestModal({
  enterprise,
  enterpriseId,
  user,
  handleClose,
}: {
  enterprise: any;
  enterpriseId: string;
  user: any;
  handleClose: () => void;
}) {
  const [onRequest, setOnRequest] = useState(false);

  useEffect(() => {
    if (!onRequest) return;
    requestAccess(enterpriseId, user)
      .then(() => {
        setOnRequest(false);
        alert(
          "Su solicitud ha sido enviada a los supervisores de la empresa.\n Este proceso puede tomar un tiempo así que puede cerrar la app."
        );
      })
      .catch((err) => {
        setOnRequest(false);
        alert(err.message);
      });
  }, [onRequest]);

  return (
    <ModalPortal onClose={handleClose}>
      <p>
        Está seguro de solicitar el acceso a la empresa{" "}
        <span>{enterprise.name}</span>
      </p>
      <Button
        onClick={() => {
          if (!user) return;
          setOnRequest(true);
        }}
        disabled={onRequest}
      >
        Sí
      </Button>
      <Button onClick={handleClose}>No</Button>
    </ModalPortal>
  );
}
