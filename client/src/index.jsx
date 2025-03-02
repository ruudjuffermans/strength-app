import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorSnackbar from "@components/snackbars/ErrorSnackbar";
import SuccessSnackbar from "./components/snackbars/SuccessSnackbar";
import InfoSnackbar from "./components/snackbars/InfoSnackbar";
import ModuleBoundary from "./components/ModuleBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: false,
      staleTime: 1000,
    },
    mutations: {
      useErrorBoundary: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RecoilRoot>
  <BrowserRouter>
    <ModuleBoundary fullPage>
      <App />
    </ModuleBoundary>
  </BrowserRouter>
  <RecoilNexus />
  <ErrorSnackbar />
  <SuccessSnackbar />
  <InfoSnackbar />
</RecoilRoot>

  </QueryClientProvider>
);
