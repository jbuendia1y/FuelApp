import { AuthContextProvider } from "@/Auth/contexts/AuthContext";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";

export default function Contexts(props: any) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AuthContextProvider>
  );
}
