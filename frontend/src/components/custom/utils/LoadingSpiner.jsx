import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingSpinner = ({ spinnerColor = "text-primary" }) => {
  return (
    <div className="flex justify-center items-start">
      <LoaderCircle className={`${spinnerColor} animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;