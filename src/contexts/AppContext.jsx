import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../services/storage";

const { theme: localeTheme } = getSettings();

export const AppContext = createContext([localeTheme, null]);

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  return appContext;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localeTheme);

  const currentTheme = createTheme({
    palette: {
      mode: theme ? theme : "light",
    },
  });

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <AppContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
