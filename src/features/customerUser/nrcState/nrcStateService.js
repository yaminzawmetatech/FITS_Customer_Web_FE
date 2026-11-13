import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/nrc-states`;




const getNrcStates = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
}
const nrcStateService = {
  getNrcStates,
};

export default nrcStateService;
