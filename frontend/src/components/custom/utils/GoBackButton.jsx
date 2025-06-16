import { Button } from "@/components/ui/button";
import React from "react";

const GoBackButton = () => {
  return (
    <Button variant="outline" onClick={() => window.history.back()}>
      Go Back
    </Button>
  );
};

export default GoBackButton;