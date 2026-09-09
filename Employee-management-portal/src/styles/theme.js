import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: mode === "dark" ? "#60A5FA" : "#2563EB",
      },

      secondary: {
        main: mode === "dark" ? "#93C5FD" : "#3B82F6",
      },

      success: {
        main: mode === "dark" ? "#4ADE80" : "#22C55E",
      },

      error: {
        main: mode === "dark" ? "#F87171" : "#EF4444",
      },

      warning: {
        main: mode === "dark" ? "#FBBF24" : "#F59E0B",
      },

      background: {
        default: mode === "dark" ? "#0F172A" : "#F8FAFC",
        paper: mode === "dark" ? "#1E293B" : "#FFFFFF",
      },

      text: {
        primary: mode === "dark" ? "#F8FAFC" : "#172554",
        secondary: mode === "dark" ? "#94A3B8" : "#64748B",
      },

      divider: mode === "dark" ? "#334155" : "#E5E7EB",
    },
  });

export default getTheme;
