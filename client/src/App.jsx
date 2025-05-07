import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Router from "@router";
import { AuthProvider } from "./context/AuthContext";
import ErrorSnackbar from "./components/snackbars/ErrorSnackbar";
import SuccessSnackbar from "./components/snackbars/SuccessSnackbar";
import InfoSnackbar from "./components/snackbars/InfoSnackbar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router/>
        </AuthProvider>
          <ErrorSnackbar />
          <SuccessSnackbar />
          <InfoSnackbar />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
