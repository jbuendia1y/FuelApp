import { AuthContextProvider } from "@/Auth/contexts/AuthContext";

export default function Contexts(props: any) {
  return <AuthContextProvider>{props.children}</AuthContextProvider>;
}
