import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}nrc-townships`;
const SYNC_URL = `${base_url}admin/sync-nrc-townships`;

const syncWebNrcTownships = async () => {
  const response = await axiosInstance.post(SYNC_URL);
  return response.data;
}

const getNrcTownships = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
}

const nrcTownshipService = {
  getNrcTownships,
  syncWebNrcTownships,
};

export default nrcTownshipService;
