import { Bell } from "lucide-react";
import React from "react";

const EmptyState = ({ Icon = Bell, message = "No data found", children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed border-gray-300 bg-gray-50/50 py-12 px-6">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="rounded-full bg-gray-100 p-3">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-600">{message}</p>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default EmptyState;
