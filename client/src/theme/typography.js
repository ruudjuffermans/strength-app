const typography = {
    fontFamily: [
      'Josefin Sans',
      'Comic Relief',
      'Tuffy',
      'Noto Sans',
      'Sensation',
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16, // base = 1rem
  
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.0075em',
    },
  
    subtitle1: {
      fontSize: '1.25rem', // 16px
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '1rem', // 14px
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.00714em',
    },
  
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.03125em',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01786em',
    },
  
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#777',
      letterSpacing: '0.03333em',
    },
  
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08333em',
      lineHeight: 2,
    },
  
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'none', // or 'uppercase'
      letterSpacing: '0.02857em',
    },
  };
  
  export default typography;
  