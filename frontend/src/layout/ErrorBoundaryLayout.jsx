import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorFallback from "@/components/custom/utils/ErrorFallback";

const ErrorBoundaryLayout = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryLayout;
