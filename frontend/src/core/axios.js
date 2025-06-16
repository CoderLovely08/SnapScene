import { environmentVariables } from "@/utils/app.constants";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL:
    environmentVariables.ENV === "development"
      ? environmentVariables.BASE_DEV_API_URL
      : environmentVariables.BASE_PROD_API_URL,
  withCredentials: true, // Send cookies with requests (for cross-origin requests)
});

export default axiosInstance;
