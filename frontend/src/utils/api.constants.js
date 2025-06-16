export const apiRoutes = {
  AUTH: {
    LOGIN: "/auth/system/login",
    REGISTER: "/auth/system/register",
    LOGOUT: "/auth/system/logout",
  },
  CORE: {
    PERMISSIONS: {
      GET_ALL: "/permissions/get-all",
      CREATE: "/permissions/create",
      ASSIGN_PERMISSIONS: "/permissions/assign-permissions",
    },
  },
  USERS: {
    GET_ALL: "/users/get-all",
    GET_MOCK: (limit = 10, page = 1, search = "") =>
      `/users/get-mock?limit=${limit}&page=${page}&search=${search}`,
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: "/users/create",
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  WALLPAPERS: {
    GET_ALL: "/wallpapers/get-all",
    DOWNLOAD: "/wallpapers/download",
    UPLOAD: "/wallpapers/create",
  },
};

export const QUERY_KEYS = {
  CORE: {
    PERMISSIONS: {
      GET_ALL: "permissions",
    },
  },
  USERS: {
    GET_ALL: "users",
  },
  WALLPAPERS: {
    GET_ALL: "wallpapers",
  },
};
