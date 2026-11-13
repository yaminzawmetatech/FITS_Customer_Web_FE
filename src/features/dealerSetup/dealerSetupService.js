import axiosInstance from "../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}dealers`;


const getDealers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};


const getDealersWebSys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.get('admin/get-web-dealers', config);
  return response.data;
};

const createDealer = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, data, config);
  return response.data;
};

const updateDealer = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${id}`,
    data,
    config
  );
  return response.data;
};

const deleteDealer = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const dealerSetupService = {
  getDealers,
  getDealersWebSys,
  createDealer,
  updateDealer,
  deleteDealer,
};

export default dealerSetupService;
