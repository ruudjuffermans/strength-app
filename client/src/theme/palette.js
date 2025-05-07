import { colors } from './colors';


const darkPalette = {
  mode: 'dark',
  primary: {
    main: colors.primary[300],
    dark: colors.primary[400],
    light: colors.primary[200],
    contrastText: "#fff",
  },
  background: {
    default: "#111111",
    paper: "#1d1d1d",
    100: "#2e2e2e",
    200: "#3a3a3a",
    300: "#474747",
    400: "#545454",
    500: "#606060",
    600: "#6d6d6d",
    700: "#7a7a7a",
    800: "#868686",
    900: "#939393"
  },
  warning: {
    main: colors.warning[300],
    dark: colors.warning[400],
    light: colors.warning[200],
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
