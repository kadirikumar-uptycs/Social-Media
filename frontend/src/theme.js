// theme.js
import { createTheme } from "@mui/material/styles";

// Light palette
const lightPalette = {
  primary: {
    main: "#6366f1",
    light: "#818cf8",
    dark: "#4f46e5",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#ec4899",
    light: "#f472b6",
    dark: "#db2777",
    contrastText: "#ffffff",
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
  },
  info: {
    main: "#3b82f6",
    light: "#60a5fa",
    dark: "#2563eb",
  },
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
  },
  grey: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  text: {
    primary: "#111827",
    secondary: "#4b5563",
    disabled: "#9ca3af",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
    light: "#f9fafb",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

// Dark palette
const darkPalette = {
  primary: {
    main: "#818cf8",
    light: "#93c5fd",
    dark: "#4f46e5",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f472b6",
    light: "#f9a8d4",
    dark: "#db2777",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f87171",
    light: "#fca5a5",
    dark: "#dc2626",
  },
  warning: {
    main: "#fbbf24",
    light: "#fcd34d",
    dark: "#d97706",
  },
  info: {
    main: "#60a5fa",
    light: "#93c5fd",
    dark: "#2563eb",
  },
  success: {
    main: "#34d399",
    light: "#6ee7b7",
    dark: "#059669",
  },
  grey: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  text: {
    primary: "#f9fafb",
    secondary: "#d1d5db",
    disabled: "#6b7280",
  },
  background: {
    default: "#121212",
    paper: "#1f2937",
    light: "#374151",
  },
  divider: "rgba(255, 255, 255, 0.12)",
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? lightPalette : darkPalette),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.03)",
    "0px 3px 3px -2px rgba(0,0,0,0.06),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.03)",
    "0px 3px 5px -1px rgba(0,0,0,0.06),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.03)",
    "0px 4px 5px -2px rgba(0,0,0,0.06),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.03)",
    "0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.05),0px 3px 14px 2px rgba(0,0,0,0.04)",
    "0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.05),0px 1px 18px 0px rgba(0,0,0,0.04)",
    "0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.05),0px 2px 16px 1px rgba(0,0,0,0.04)",
    "0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.05),0px 3px 14px 2px rgba(0,0,0,0.04)",
    "0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.05),0px 3px 16px 2px rgba(0,0,0,0.04)",
    "0px 6px 6px -3px rgba(0,0,0,0.1),0px 10px 14px 1px rgba(0,0,0,0.05),0px 4px 18px 3px rgba(0,0,0,0.04)",
    "0px 6px 7px -4px rgba(0,0,0,0.1),0px 11px 15px 1px rgba(0,0,0,0.05),0px 4px 20px 3px rgba(0,0,0,0.04)",
    "0px 7px 8px -4px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.05),0px 5px 22px 4px rgba(0,0,0,0.04)",
    "0px 7px 8px -4px rgba(0,0,0,0.1),0px 13px 19px 2px rgba(0,0,0,0.05),0px 5px 24px 4px rgba(0,0,0,0.04)",
    "0px 7px 9px -4px rgba(0,0,0,0.1),0px 14px 21px 2px rgba(0,0,0,0.05),0px 5px 26px 4px rgba(0,0,0,0.04)",
    "0px 8px 9px -5px rgba(0,0,0,0.1),0px 15px 22px 2px rgba(0,0,0,0.05),0px 6px 28px 5px rgba(0,0,0,0.04)",
    "0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.05),0px 6px 30px 5px rgba(0,0,0,0.04)",
    "0px 8px 11px -5px rgba(0,0,0,0.1),0px 17px 26px 2px rgba(0,0,0,0.05),0px 6px 32px 5px rgba(0,0,0,0.04)",
    "0px 9px 11px -5px rgba(0,0,0,0.1),0px 18px 28px 2px rgba(0,0,0,0.05),0px 7px 34px 6px rgba(0,0,0,0.04)",
    "0px 9px 12px -6px rgba(0,0,0,0.1),0px 19px 29px 2px rgba(0,0,0,0.05),0px 7px 36px 6px rgba(0,0,0,0.04)",
    "0px 10px 13px -6px rgba(0,0,0,0.1),0px 20px 31px 3px rgba(0,0,0,0.05),0px 8px 38px 7px rgba(0,0,0,0.04)",
    "0px 10px 13px -6px rgba(0,0,0,0.1),0px 21px 33px 3px rgba(0,0,0,0.05),0px 8px 40px 7px rgba(0,0,0,0.04)",
    "0px 10px 14px -6px rgba(0,0,0,0.1),0px 22px 35px 3px rgba(0,0,0,0.05),0px 8px 42px 7px rgba(0,0,0,0.04)",
    "0px 11px 14px -7px rgba(0,0,0,0.1),0px 23px 36px 3px rgba(0,0,0,0.05),0px 9px 44px 8px rgba(0,0,0,0.04)",
    "0px 11px 15px -7px rgba(0,0,0,0.1),0px 24px 38px 3px rgba(0,0,0,0.05),0px 9px 46px 8px rgba(0,0,0,0.04)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: mode === "light" ? "#4f46e5" : "#6366f1",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
          fontWeight: 600,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.938rem",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};

export const darkTheme = createAppTheme("dark");
export const lightTheme = createAppTheme("light");