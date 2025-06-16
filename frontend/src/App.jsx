import React from "react";
import { RouterProvider } from "react-router-dom";
import { applicationRouter } from "./routes/route";

const App = () => {
  return <RouterProvider router={applicationRouter} />;
};

export default App;
