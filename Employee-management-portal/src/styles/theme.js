import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#3B82F6",
    },
    success: {
      main: "#22C55E",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },
});

export default theme;
