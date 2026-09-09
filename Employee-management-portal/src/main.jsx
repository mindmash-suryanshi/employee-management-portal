import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import "./index.css";
import App from "./App.jsx";
import getTheme from "./styles/theme";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const AppTheme = () => {
  const { theme } = useTheme();

  const muiTheme = useMemo(() => getTheme(theme), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppTheme />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
