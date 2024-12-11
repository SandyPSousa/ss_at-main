import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router";
import { AppProvider, useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [theme, setTheme] = useAppContext() || [null, null];

  const currentTheme = createTheme({
    palette: {
      mode: theme ? theme : "light",
    },
  });

  useEffect(() => {
    console.log("XP", theme);
  }, [theme]);

  return (
    <div>
      <AppProvider>
        <CssBaseline />
        <div id="_app">
          <div id="_app-container">
            <Outlet />
          </div>
        </div>
      </AppProvider>
    </div>
  );
}
