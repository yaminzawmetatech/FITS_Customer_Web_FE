import axiosInstance from "../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}customer-voices`;

const getCustomerVoices = async () => {
  const response = await axiosInstance.get(API_URL);

  return response.data;
};

const deleteCustomerVoice = async (id) => {
  const response = await axiosInstance.delete(
    API_URL + "/" + id
  );

  return response.data;
};

const updateCustomerVoice = async (
  id,
  data,
) => {

  const response = await axiosInstance.put(
    API_URL + "/" + id,
    data,
  );

  return response.data;
};

const createCustomerVoice = async (data) => {
  const response = await axiosInstance.post(API_URL, data);

  return response.data;
};


const customerVoiceService = {
  createCustomerVoice,
  getCustomerVoices,
  deleteCustomerVoice,
  updateCustomerVoice,
};

export default customerVoiceService;
