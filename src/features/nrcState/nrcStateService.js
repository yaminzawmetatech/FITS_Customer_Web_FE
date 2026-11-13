import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}nrc-states`;
const SYNC_URL = `${base_url}admin/sync-nrc-states`;



const syncWebNrcStates = async () => {
  const response = await axiosInstance.post(SYNC_URL);
  return response.data;
}

const getNrcStates = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
}
const nrcStateService = {
  getNrcStates,
  syncWebNrcStates,
};

export default nrcStateService;
