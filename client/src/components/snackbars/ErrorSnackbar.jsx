import { Alert as MuiAlert, Snackbar } from '@mui/material';
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { errorState } from "@hooks/useSnackbar";

export default function ErrorSnackbar() {
    const clearSnackbar = useResetRecoilState(errorState);
    const state = useRecoilValue(errorState);

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={5000}
            onClose={clearSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert severity="error" onClose={clearSnackbar} elevation={6} variant="filled">
                {state.message}
            </MuiAlert>
        </Snackbar>
    );
}
