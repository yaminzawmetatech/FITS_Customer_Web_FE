import axiosInstance from "../../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/vehicles`;

const getVehicles = async (params) => {
  const response = await axiosInstance.get(API_URL, { params});
  return response.data;
};

const getVehiclesModal = async (params) => {
  const response = await axiosInstance.get(API_URL, { params});
  return response.data;
};


const vehicleService = {
  getVehicles,
  getVehiclesModal,
};

export default vehicleService;
