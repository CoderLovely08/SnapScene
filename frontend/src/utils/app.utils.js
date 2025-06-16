import { format, formatDistance } from "date-fns";
import { CheckCircle, Clock, Truck } from "lucide-react";

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

/**
 * This function formats the date to a string in the format "dd MMM yyyy"
 * Ex: 07 Feb 2025
 *
 * @param {Date} date
 * @returns {String}
 */
export const getFormattedDate = (date) => {
  return format(date, "dd MMM yyyy");
};

/**
 * This function formats the date to a string in the format "dd MMM yyyy, hh:mm a"
 * Ex: 07 Feb 2025, 01:26 PM
 *
 * @param {Date} date
 * @returns {String}
 */
export const getFormattedDateTime = (date) => {
  return format(date, "dd MMM yyyy, hh:mm a");
};

/**
 * This function returns the time difference between the current time and the given time
 * Ex: 2 hours ago
 *
 * @param {Date} date
 * @returns {String}
 */
export const getTimedifference = (date) => {
  return formatDistance(date, new Date(), { addSuffix: true });
};

/**
 * This function returns the status info based on the status
 *
 * @param {String} status
 * @returns {Object}
 */
export const getStatusInfo = (status) => {
  switch (status) {
    case "PROCESSING":
      return {
        color: "bg-blue-500/10 text-blue-700 border-blue-200/50",
        icon: Clock,
        bgGradient: "from-blue-500/5 to-blue-600/5",
      };
    case "COMPLETED":
      return {
        color: "bg-emerald-500/10 text-emerald-700 border-emerald-200/50",
        icon: CheckCircle,
        bgGradient: "from-emerald-500/5 to-emerald-600/5",
      };
    case "SHIPPED":
      return {
        color: "bg-purple-500/10 text-purple-700 border-purple-200/50",
        icon: Truck,
        bgGradient: "from-purple-500/5 to-purple-600/5",
      };
    default:
      return {
        color: "bg-slate-500/10 text-slate-700 border-slate-200/50",
        icon: Clock,
        bgGradient: "from-slate-500/5 to-slate-600/5",
      };
  }
};

/**
 * This function formats the price to a string in the format "₹1,000"
 * Ex: ₹1,000
 *
 * @param {Number} price
 * @returns {String}
 */
export const formatPrice = (price) =>
  price ? `₹${price?.toLocaleString()}` : "₹0";

/**
 * This function returns the initials of the name
 * Ex: John Doe -> JD
 *
 * @param {String} name
 * @returns {String}
 */
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

/**
 * This function formats the system id to a string in the format "#000001"
 * Ex: #000001
 *
 * @param {Number} id
 * @returns {String}
 */
export const formatSystemId = (id) => {
  return "#" + `${id}`.padStart(6, "0");
};