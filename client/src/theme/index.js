import { createContext, useState, useMemo } from "react";
import useResponsive from "../hooks/useResponsive";
import { createTheme } from '@mui/material/styles';

import getPalette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import components from './components';

const createAppTheme = (mode = 'light') => {
  const baseTheme = createTheme({
    palette: getPalette(mode),
    typography,
    breakpoints,
    spacing: 4,
  });

  return createTheme({
      ...baseTheme,
      components: components(baseTheme)
    })
};


// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,

//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },

//   }
// }

export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const { isMobile } = useResponsive();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  return [theme, colorMode, isMobile];
};
