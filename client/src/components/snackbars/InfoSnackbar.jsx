import { Alert as MuiAlert, Snackbar, useTheme } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { infoState } from '@hooks/useSnackbar';

export default function InfoSnackbar() {
    const clearSnackbar = useResetRecoilState(infoState);
    const theme = useTheme()
    const state = useRecoilValue(infoState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={3000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert severity="info" onClose={clearSnackbar} elevation={6} sx={{
                backgroundColor: theme.palette.info.dark,
                opacity: "0.98 !important",
                color: theme.palette.info.contrastText,
                '& .MuiAlert-icon': {
                    color: theme.palette.info.contrastText,
                },
            }}>
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
