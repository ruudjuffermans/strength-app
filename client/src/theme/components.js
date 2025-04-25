
const components = (theme) => {
    const mode = theme.palette.mode;
    const colors = theme.palette.colors;
  
    return {
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
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // borderRadius: 12,
            padding: 16,
            background: mode === "dark" ? colors.base[200] : colors.base[100],
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: `1px solid ${colors.base[500]}`,
            boxShadow: "none",
            borderRadius: "2px",
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // height: "60px",
            // "& .MuiInputBase-root": {
            //   borderRadius: "0px",
            //   overflow: "hidden",
            //   padding: "0px",
            // },
            // "& .MuiInputBase-input": {
            //   // padding: "20px 10px 6px",
            // },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // // borderRadius: 8,
            // fontSize: 16,
            // textTransform: 'none',
            // height: "40px",
            // // paddingLeft: 16,
            // // paddingRight: 16,
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
  