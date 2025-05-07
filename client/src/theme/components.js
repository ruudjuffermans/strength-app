
const components = (theme) => {
    const mode = theme.palette.mode;
    const colors = theme.palette;
  
    console.log(colors)
    return {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '--scrollbar-track': colors.grey[400],
            '--scrollbar-thumb': colors.grey[700],
            '--scrollbar-thumb-hover': colors.grey[900],
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
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            padding: 0,

            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
    };
  };
  
  export default components;
  