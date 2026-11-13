import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/create-applications`;


// ✅ Create new loan step
const createApplication = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, data, config);
  return response.data;
};



const applicationService = {
    createApplication,
};

export default applicationService;
