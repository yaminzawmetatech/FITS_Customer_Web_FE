import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstanceV2 = axios.create({
    baseURL,
});

axiosInstanceV2.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axiosInstanceV2.interceptors.request.use(
  async (config) => {
    try {
      const token = Cookies.get("jwt_authorization");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      toast.error(error.message);  
    }
    return config;
  },
  (error) => {
    toast.error(error.message);
    return Promise.reject(error);
  }
);

axiosInstanceV2.interceptors.response.use(
  (response) => {
    return response;
  },
);

export default axiosInstanceV2;