import { AuthContextProvider } from "@/Auth/contexts/AuthContext";
import { colors as baseColors } from "@/constants";
import { ThemeProvider } from "@emotion/react";

export default function Contexts(props: any) {
  return (
    <AuthContextProvider>
      <ThemeProvider
        theme={{
          colors: baseColors,
        }}
      >
        {props.children}
      </ThemeProvider>
    </AuthContextProvider>
  );
}
