import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useRouteError } from "react-router-dom";
import { environmentVariables } from "@/utils/app.constants";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  const actualError = routeError || error;

  const getErrorMessage = () => {
    if (actualError?.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    return "We apologize for the inconvenience. An unexpected error has occurred.";
  };

  return (
    <div className="min-h-[400px] bg-white flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Error icon */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-red-50 animate-ping opacity-25"></div>
            <div className="absolute inset-0 rounded-full bg-red-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {actualError?.status
            ? `Error ${actualError.status}`
            : "Something went wrong"}
        </h1>
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">{getErrorMessage()}</p>
          {environmentVariables.ENV == "development" && actualError && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
              <p className="font-mono text-sm text-red-600 mb-2">
                {actualError.message || actualError.toString()}
              </p>
              {actualError.stack && (
                <pre className="font-mono text-xs text-gray-600 overflow-auto max-h-40">
                  {actualError.stack}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            className="bg-primary hover:bg-primary/80"
            onClick={() => {
              resetErrorBoundary?.();
              window.location.reload();
            }}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              resetErrorBoundary?.();
              navigate("/");
            }}
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
