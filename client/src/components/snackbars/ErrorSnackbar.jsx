import { Alert as MuiAlert, Snackbar, useTheme } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { errorState } from "@hooks/useSnackbar";

export default function ErrorSnackbar() {
    const clearSnackbar = useResetRecoilState(errorState);
    const theme = useTheme()
    const state = useRecoilValue(errorState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={3000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <MuiAlert
                severity="error"
                onClose={clearSnackbar}
                elevation={12}
                sx={{
                    backgroundColor: theme.palette.error.dark,
                    opacity: "0.8 !important",
                    p: 0,
                    color: theme.palette.error.contrastText,
                    '& .MuiAlert-icon': {
                        color: theme.palette.error.contrastText,
                    },
                }}
            >
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
