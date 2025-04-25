import { useTheme, useMediaQuery } from '@mui/material';

const useResponsive = () => {
  const theme = useTheme();

  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isDesktop: useMediaQuery(theme.breakpoints.up('md')),

    // isXs: useMediaQuery(theme.breakpoints.only('xs')),
    // isSm: useMediaQuery(theme.breakpoints.only('sm')),
    // isMd: useMediaQuery(theme.breakpoints.only('md')),
    // isLg: useMediaQuery(theme.breakpoints.only('lg')),
    // isXl: useMediaQuery(theme.breakpoints.only('xl')),

    // isSmDown: useMediaQuery(theme.breakpoints.down('sm')),
    // isMdDown: useMediaQuery(theme.breakpoints.down('md')),
    // isLgDown: useMediaQuery(theme.breakpoints.down('lg')),

    // isSmUp: useMediaQuery(theme.breakpoints.up('sm')),
    // isMdUp: useMediaQuery(theme.breakpoints.up('md')),
    // isLgUp: useMediaQuery(theme.breakpoints.up('lg')),
  };
};

export default useResponsive;