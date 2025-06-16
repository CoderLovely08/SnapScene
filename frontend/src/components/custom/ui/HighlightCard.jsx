import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import LoadingSpinner from "../utils/LoadingSpiner";

const HighlightCard = ({
  title = "",
  Icon,
  value = 0,
  subText = "",
  isLoading = false,
}) => {
  return (
    <Card className="bg-white shadow-none flex-grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-2xl text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <LoadingSpinner /> : value}
        </div>
        <p className="text-sm text-muted-foreground">{subText}</p>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;