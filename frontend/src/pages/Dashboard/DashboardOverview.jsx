import EmptyState from "@/components/custom/utils/EmptyState";
import { Button } from "@/components/ui/button";
import React from "react";

const DashboardOverview = () => {
  return (
    <div>
      <EmptyState message="No data found">
        <Button>Add Data</Button>
      </EmptyState>
    </div>
  );
};

export default DashboardOverview;
