import Button from "@/components/Button";
import { acceptAccessRequest, deniedAccessRequest } from "@/firebase/firestore";
import useAccessRequests from "@/hooks/useAccessRequests";
import useCurrentEnterprise from "@/hooks/useCurrentEnterprise";
import dateTimeFormat from "@/utils/dateTimeFormat";
import { useEffect, useState } from "react";

export default function AccessRequests() {
  const [onSend, setOnSend] = useState({
    state: false,
    data: undefined,
  } as { state: boolean; data?: { userId: string; mode: "denied" | "accept" } });
  const { accessRequests } = useAccessRequests();
  const { currentEnterprise } = useCurrentEnterprise();

  const handleRequest = async (data: {
    userId: string;
    mode: "denied" | "accept";
  }) => {
    const { mode, userId } = data;
    if (!currentEnterprise) return;
    if (mode === "accept")
      await acceptAccessRequest(userId, currentEnterprise.id);
    else if (mode === "denied")
      deniedAccessRequest(userId, currentEnterprise.id);
    else return;
  };

  useEffect(() => {
    if (!onSend.state) return;
    if (onSend.data === undefined) return;
    handleRequest(onSend.data);
  }, [onSend]);

  const handleClick = async (userId: string, mode: "denied" | "accept") => {
    if (!currentEnterprise) return;
    setOnSend((value) => {
      let onSendData = { ...value };
      onSendData.data = { userId, mode };
      onSendData.state = true;
      return onSendData;
    });
  };

  return (
    <ul>
      {accessRequests &&
        (accessRequests.length !== 0 ? (
          accessRequests.map((item) => (
            <li key={`user-request-${item.user.uid}`}>
              Solicitado el {dateTimeFormat(item.createdAt)} por{" "}
              {item.user.name}
              <Button
                onClick={() => {
                  handleClick(item.user.uid, "accept");
                }}
              >
                Aceptar
              </Button>
              <Button
                onClick={() => {
                  handleClick(item.user.uid, "denied");
                }}
              >
                Rechazar
              </Button>
            </li>
          ))
        ) : (
          <li>Por el momento no hay solicitudes .</li>
        ))}
    </ul>
  );
}
