import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorFallback from "@/components/custom/utils/ErrorFallback";

const ErrorBoundaryLayout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Outlet />
      </ErrorBoundary>
    </main>
  );
};

export default ErrorBoundaryLayout;
