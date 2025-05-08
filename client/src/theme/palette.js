import { colors } from './colors';


const darkPalette = {
  mode: 'dark',
  primary: {
    main: colors.primary[300],
    dark: colors.primary[400],
    light: colors.primary[100],
    contrastText: "#fff",
  },
  background: {
    50: "#161616",
    100: "#1c1c1c",
    200: "#282828",
    300: "#494949",
    400: "#4c4c4c",
    500: "#606060",
    600: "#6d6d6d",
    700: "#7a7a7a",
    800: "#868686",
    900: "#939393"
  },
  warning: {
    main: colors.warning[300],
    dark: colors.warning[400],
    light: colors.warning[100],
    contrastText: "#fff",
  },
  success: {
    main: colors.success[300],
    dark: colors.success[400],
    light: colors.success[200],
    contrastText: "#fff",
  },
  info: {
    main: colors.info[300],
    dark: colors.info[400],
    light: colors.info[200],
    contrastText: "#fff",
  },
  error: {
    main: colors.error[300],
    dark: colors.error[400],
    light: colors.error[200],
    contrastText: "#fff",
  },
};

const lightPalette = {
  mode: 'light',
  primary: {
    default: colors.primary,
  },
  background: {
    default: "#fff",
  },
  colors,
};

const getPalette = (mode = 'dark') =>
  mode === 'dark' ? darkPalette : lightPalette;

export default getPalette;
