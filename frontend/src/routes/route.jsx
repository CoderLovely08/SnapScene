import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginForm from "@/pages/Auth/LoginPage";
import GenericTableComp from "@/pages/Components/GenericTableComp";
import AssignPermissions from "@/pages/Dashboard/RBAC/components/AssignPermissionsDialog";
import ViewAllUsers from "@/pages/Dashboard/RBAC/ViewAllUsers";
import ErrorBoundaryLayout from "@/layout/ErrorBoundaryLayout";
import InfiniteTable from "@/pages/Components/InfiniteTable";

export const applicationRouter = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      {
        path: routes.AUTH.LOGIN,
        element: <LoginForm />,
      },

      {
        path: routes.CORE.DASHBOARD,
        element: <DashboardLayout />,
        children: [
          {
            path: routes.DASHBOARD.routes.overview.path,
            element: <DashboardOverview />,
          },
          {
            path: routes.COMPONENTS.routes.dataTable.path,
            element: <GenericTableComp />,
          },
          {
            path: routes.COMPONENTS.routes.login.path,
            element: <LoginForm />,
          },
          {
            path: routes.COMPONENTS.routes.paginatedTable.path,
            element: <InfiniteTable />,
          },
          {
            path: routes.RBAC.routes.assignPermissions.path,
            element: <AssignPermissions />,
          },
          {
            path: routes.USERS.routes.viewAllUsers.path,
            element: <ViewAllUsers />,
          },

          {
            path: routes.CORE.UNDER_CONSTRUCTION,
            element: <UnderConstruction />,
          },
        ],
      },
    ],
  },
]);
