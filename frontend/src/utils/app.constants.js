import {
  LayoutDashboard,
  List,
  LockKeyholeIcon,
  User,
  Users,
} from "lucide-react";

export const routes = {
  CORE: {
    path: "/", // for router paths
    DASHBOARD: "/dashboard",
    NO_MATCH: "*", // for unmatched routes
    UNDER_CONSTRUCTION: "/dashboard/under-construction",
    routeKey: "home",
    title: "Home",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  DASHBOARD: {
    title: "Dashboard",
    routeKey: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    routes: {
      home: {
        path: "/dashboard/home",
        routeKey: "home",
      },
      overview: {
        path: "/dashboard/overview",
        routeKey: "overview",
      },
    },
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
        roles: ["*"],
      },
    ],
  },
  COMPONENTS: {
    title: "Components",
    routeKey: "components",
    path: "/dashboard/components",
    icon: List,
    routes: {
      dataTable: {
        path: "/dashboard/components/data-table",
        routeKey: "dataTable",
      },
      login: {
        path: "/dashboard/components/login",
        routeKey: "login",
      },
      paginatedTable: {
        path: "/dashboard/components/paginated-table",
        routeKey: "paginatedTable",
      },
    },
    items: [
      {
        title: "Data Table",
        url: "/dashboard/components/data-table",
      },
      {
        title: "Login",
        url: "/dashboard/components/login",
      },
      {
        title: "Paginated Table",
        url: "/dashboard/components/paginated-table",
      },
    ],
  },
  RBAC: {
    title: "RBAC",
    routeKey: "rbac",
    path: "/dashboard/rbac",
    icon: LockKeyholeIcon,
    routes: {
      assignPermissions: {
        path: "/dashboard/rbac/assign-permissions",
        routeKey: "assignPermissions",
      },
    },
    items: [
      {
        title: "Assign Permissions",
        url: "/dashboard/rbac/assign-permissions",
      },
    ],
  },
  USERS: {
    title: "Users",
    routeKey: "users",
    path: "/dashboard/users",
    icon: Users,
    routes: {
      viewAllUsers: {
        path: "/dashboard/users/view-all",
        routeKey: "viewAllUsers",
      },
      viewUser: {
        path: "/dashboard/users/view-user/:id",
        getPath: (id) => `/dashboard/users/view-user/${id}`,
        routeKey: "viewUser",
      },
    },
    items: [
      {
        title: "View All Users",
        url: "/dashboard/users/view-all",
      },
    ],
  },
};

export const getMainNavigation = () => [
  routes.DASHBOARD,
  routes.COMPONENTS,
  routes.RBAC,
  routes.USERS,
];

export const environmentVariables = {
  BASE_DEV_API_URL: import.meta.env.VITE_DEV_API_URL,
  BASE_PROD_API_URL: import.meta.env.VITE_PROD_API_URL,
  ENV: import.meta.env.VITE_ENV,
};
