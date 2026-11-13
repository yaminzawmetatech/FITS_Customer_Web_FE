import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/fast-services`; // Replace with your actual endpoint

// ✅ Get all fast services
const getFastServices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active fast services (optional)
const getActiveFastServices = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new fast service
const createFastService = async (serviceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, serviceData, config);
  return response.data;
};

// ✅ Update existing fast service
const updateFastService = async (serviceId, serviceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${serviceId}`,
    serviceData,
    config
  );
  return response.data;
};

// ✅ Delete fast service
const deleteFastService = async (serviceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${serviceId}`, config);
  return response.data;
};

const fastService = {
  getFastServices,
  getActiveFastServices,
  createFastService,
  updateFastService,
  deleteFastService,
};

export default fastService;
