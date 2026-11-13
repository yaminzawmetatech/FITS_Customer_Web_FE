import axiosInstance from "../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/vehicles`;
const WEB_VEHICLE_URL = `${base_url}admin/get-web-vehicles`;

const getVehicles = async (params) => {
  const response = await axiosInstance.get(API_URL, params);
  return response.data;
};

const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(API_URL + "/" + id);
  return response.data;
};

const updateVehicle = async (id, data) => {
  const response = await axiosInstance.put(API_URL + "/" + id, data);
  return response.data;
};

const createVehicle = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

// ✅ Web API calls with params
const getWebVehicle = async (params) => {
  const response = await axiosInstance.get(WEB_VEHICLE_URL, { params });
  return response.data;
};

const getWebVehicleBrand = async (params) => {
  const response = await axiosInstance.get(WEB_VEHICLE_URL, { params });
  return response.data;
};

const getVehiclesModal = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

const vehicleService = {
  createVehicle,
  getVehicles,
  deleteVehicle,
  updateVehicle,
  getWebVehicle,
  getWebVehicleBrand,
  getVehiclesModal,
};

export default vehicleService;
