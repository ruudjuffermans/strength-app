import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { Accordion } from "@mui/material";



export const lightTheme = {
  base: {
    100: "#ffffff",
    200: "#F6F8FC",
    300: "#edf0f4 ",
    400: "#e3e8ee ",
    500: "#d9e0e8 ",
    600: "#cfd8e2 ",
    700: "#c5d0dc ",
    800: "#bbc8d6 ",
    900: "#b1c0d0 ",
  },
  contrast: {
    100: "#121314",
    200: "#3a3a3b",
    300: "#4a4a4b",
    400: "#424243",
    500: "#4a4a4b",
    600: "#525253",
    700: "#525253",
    800: "#525253",
    900: "#525253",
  },
  primary: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },
  secondary: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  }
};

export const darkTheme = {
  base: {
    100: "#121314",
    200: "#1a1a1b",
    300: "#222223",
    400: "#2a2a2b",
    500: "#323233",
    600: "#3a3a3b",
    700: "#424243",
    800: "#4a4a4b",
    900: "#525253",
  },
  contrast: {
    100: "#ffffff",  // Pure white
    200: "#a6b1c1",  // Slightly off-white
    300: "#4a5361",  // Very light gray
    400: "#2c3037",  // Soft gray
    500: "#1d2025",  // Medium gray
    600: "#16181d",  // Dark gray
    700: "#0f1114",  // Darker gray
    800: "#0a0b0e",  // Very dark gray
    900: "#050506"   // Almost black
},
  primary: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
  secondary: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  }
};


// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? darkTheme
    : lightTheme),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          background: {
            default: colors.base[100],
          }, 

          colors,
          primary: {
            light: colors.primary[400],
            main: colors.primary[500],
            dark: colors.primary[600],
            contrastText: "#fff"
          },
          secondary: {
            light: colors.primary[400],
            main: colors.primary[500],
            dark: colors.primary[600],
            contrastText: "#fff"
          }
        }
        : {
          background: {
            default: colors.base[200],
          },
          colors,
          primary: {
            light: colors.primary[400],
            main: colors.primary[500],
            dark: colors.primary[600],
            contrastText: "#fff"
          },
          secondary: {
            light: colors.primary[400],
            main: colors.primary[500],
            dark: colors.primary[600],
            contrastText: "#fff"
          }
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '--scrollbar-track': colors.base[400],
            '--scrollbar-thumb': colors.base[700],
            '--scrollbar-thumb-hover': colors.base[900],
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          cell: {
            "&:focus": {
              outline: "none",
            },
          },
          MuiInputBase: {
            backgroundColor: "red"
          }

        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "2px",
            background: mode === "dark" ? colors.base[200] : colors.base[100]
          }
        }
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: `1px solid ${colors.base[500]}`,
            boxShadow: "none",
            borderRadius: "2px",
            "&:before": {
              display: "none"
            }
          }
        }
      },      
      MuiTextField: {
        styleOverrides: {
          root: {
            
            "& .MuiInputBase-root": {
              borderRadius: "0px",
              overflow: "hidden",
              padding: "0px"
            },
            "& .MuiInputBase-input": {
              padding: "20px 10px 6px"
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0px",
            padding: "10px 18px",
            textTransform: "none",
            fontSize: "16px"
          },
          contained: {
            // backgroundColor: "#3578ca",
            // color: "#ffffff",
            // "&:hover": {
            //   backgroundColor: "#285a98",
            // },
          },
          outlined: {
            // borderColor: "#3578ca",
            // color: "#3578ca",
            // "&:hover": {
            //   borderColor: "#285a98",
            //   backgroundColor: "rgba(53, 120, 202, 0.1)",
            // },
          },
        },
      },
    }
  }
}

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
