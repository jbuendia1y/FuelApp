import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";
import { fetchEnterprise } from "@/firebase/firestore";
import useRole from "@/hooks/useRole";
import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function Enterprise() {
  const [enterprise, setEnterprise] = useState<DocumentData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { enterpriseId } = useParams<{ enterpriseId: string }>();
  const role = useRole(enterpriseId);

  const history = useHistory();

  const handleClick = () => {
    setShowModal((value) => !value);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!enterpriseId) return;
    fetchEnterprise(enterpriseId).then((res) => {
      if (res.data() === undefined)
        history.replace(
          history.location.state + history.location.pathname,
          "/enterprises"
        );
      else setEnterprise({ id: res.id, ...res.data() });
    });
  }, []);

  return (
    <div className="enterprise">
      {enterprise && (
        <>
          <div>
            <img src={enterprise.logo} />
            <h2>{enterprise.name}</h2>
            {!role && <Button onClick={handleClick}>Solicitar acceso</Button>}
          </div>
          {showModal && (
            <ModalPortal onClose={handleClose}>
              <p>
                Está seguro de solicitar el acceso a la empresa{" "}
                <span>{enterprise.name}</span>
              </p>
            </ModalPortal>
          )}
        </>
      )}
    </div>
  );
}
