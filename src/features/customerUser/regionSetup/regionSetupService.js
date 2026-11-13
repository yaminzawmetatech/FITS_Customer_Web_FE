import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/regions`; // Replace with your actual endpoint

// ✅ Get all regions
const getRegions = async (params) => {

  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

// ✅ Get active regions (status = 1)
const getActiveRegions = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};




const regionSetupService = {
  getRegions,
  getActiveRegions,
};

export default regionSetupService;
