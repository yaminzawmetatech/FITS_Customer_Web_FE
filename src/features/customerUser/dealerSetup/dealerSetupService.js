import axiosInstance from "../../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/dealers`;

const getDealers = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // 👈 this allows passing query params
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

const dealerSetupService = {
  getDealers,
};

export default dealerSetupService;
