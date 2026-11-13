import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/regions`; // Replace with your actual endpoint

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

// ✅ Create new region
const createRegion = async (regionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, regionData, config);
  return response.data;
};

// ✅ Update existing region
const updateRegion = async (regionId, regionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${regionId}`,
    regionData,
    config
  );
  return response.data;
};

// ✅ Delete region
const deleteRegion = async (regionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${regionId}`, config);
  return response.data;
};

const regionSetupService = {
  getRegions,
  getActiveRegions,
  createRegion,
  updateRegion,
  deleteRegion,
};

export default regionSetupService;
