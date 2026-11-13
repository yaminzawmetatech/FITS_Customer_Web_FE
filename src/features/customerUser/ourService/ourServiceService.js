import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/our-services`; // Replace "our-service" with your actual endpoint

// ✅ Get all items
const getOurServices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active items (if needed, e.g., with status filter)
const getActiveOurServices = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new item
const createOurService = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, itemData, config);
  return response.data;
};

// ✅ Update existing item
const updateOurService = async (itemId, itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${itemId}`,
    itemData,
    config
  );
  return response.data;
};

// ✅ Delete item
const deleteOurService = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${itemId}`, config);
  return response.data;
};

const ourService = {
  getOurServices,
  getActiveOurServices,
  createOurService,
  updateOurService,
  deleteOurService,
};

export default ourService;
