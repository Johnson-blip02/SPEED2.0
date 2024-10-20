import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/table/PopulatedNavBar"; // Adjusted import path
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useMemo } from "react";
import { AuthProvider } from "../components/Auth/AuthContext"; // Import the AuthProvider

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Custom theme with different colors for light and dark mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light mode colors
                primary: { main: "#1976d2" },
                secondary: { main: "#ff4081" },
                background: { default: "#f5f5f5", paper: "#ffffff" },
                text: { primary: "#000000", secondary: "#555555" },
              }
            : {
                // Dark mode colors
                primary: { main: "#90caf9" },
                secondary: { main: "#f48fb1" },
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff", secondary: "#aaaaaa" },
              }),
        },
        typography: {
          fontFamily: "'Roboto', sans-serif",
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      {" "}
      {/* Wrap the app with AuthProvider */}
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PopulatedNavBar toggleColorMode={toggleColorMode} />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </AuthProvider>
  );
}

export default MyApp;
