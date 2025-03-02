import { Alert as MuiAlert, Snackbar } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { successState } from '@hooks/useSnackbar';

export default function SuccessSnackbar() {
    const clearSnackbar = useResetRecoilState(successState);
    const state = useRecoilValue(successState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={5000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert severity="success" onClose={clearSnackbar} elevation={6} variant="filled">
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
