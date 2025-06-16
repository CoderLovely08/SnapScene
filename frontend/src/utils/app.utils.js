export const hasPermission = (user, permission, isBypass = false) => {
  if (isBypass) return true;

  if (permission.includes("*")) return true;

  return user?.permissions?.includes(permission);
};

export const hasRole = (user, roles, isBypass = false) => {
  if (isBypass) return true;

  if (roles.includes("*")) return true;

  return roles?.includes(user?.role);
};
