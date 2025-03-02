import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7986cb",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  shape: {
    borderRadius: 16,
  },
});
