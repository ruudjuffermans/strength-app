import { Alert as MuiAlert, Snackbar, useTheme } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { successState } from '@hooks/useSnackbar';

export default function SuccessSnackbar() {
    const clearSnackbar = useResetRecoilState(successState);
    const theme = useTheme()
    const state = useRecoilValue(successState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={3000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <MuiAlert severity="success" onClose={clearSnackbar} elevation={6} sx={{
                backgroundColor: theme.palette.success.dark,
                opacity: "0.98 !important",
                color: theme.palette.success.contrastText,
                '& .MuiAlert-icon': {
                    color: theme.palette.success.contrastText,
                },
            }}>
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
