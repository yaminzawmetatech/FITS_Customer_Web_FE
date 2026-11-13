import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/nrc-townships`;

const getNrcTownships = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
}

const nrcTownshipService = {
  getNrcTownships,
};

export default nrcTownshipService;
