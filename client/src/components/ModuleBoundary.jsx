import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useResetOnNavigate(reset) {
  const { pathname, search, hash } = useLocation();
  const path = `${pathname}?${search}#${hash}`;

  const [occurredOn] = useState(path);
  useEffect(() => {
    if (occurredOn !== path) {
      reset();
    }
  }, [occurredOn, reset, path]);
}

function ErrorFallback({ error, resetErrorBoundary }) {
  useResetOnNavigate(resetErrorBoundary);
  return (
    <div onClick={resetErrorBoundary}>
      <div>There was an error! {error.message ?? error.msg}</div>
    </div>
  );
}

export default function ModuleBoundary({ fullPage, innerPage, children }) {
  function handleError(error) {
    if (innerPage) console.log("inner");
    if (fullPage) console.log("full");
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          onError={handleError}
          FallbackComponent={ErrorFallback}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
