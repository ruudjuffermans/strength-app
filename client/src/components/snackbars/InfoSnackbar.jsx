import { Alert as MuiAlert, Snackbar } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { infoState } from '@hooks/useSnackbar';

export default function InfoSnackbar() {
    const clearSnackbar = useResetRecoilState(infoState);
    const state = useRecoilValue(infoState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={5000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert severity="info" onClose={clearSnackbar} elevation={6} variant="filled">
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
