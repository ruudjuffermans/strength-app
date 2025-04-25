import { getColors } from './colors';

const getPalette = (mode = 'light') => {
  const colors = getColors(mode);

  return {
    mode,
    primary: {
      main: colors.primary[500],
      contrastText: colors.contrast[100],
    },
    secondary: {
      main: colors.secondary[500],
    },
    background: {
      default: mode === 'light' ? colors.base[200] : colors.base[100],
      paper: mode === 'light' ? colors.base[100] : colors.base[200],
    },
    text: {
      primary: mode === 'light' ? '#111' : '#fff',
      secondary: mode === 'light' ? '#555' : '#aaa',
    },
    // 🎯 Custom tokens attached to palette
    colors, // <-- now accessible as theme.palette.colors.base[400], etc.
  };
};

export default getPalette;
